/**
 * Shared security utilities for form API endpoints.
 * Protects against spam, phishing, XSS, and bad words.
 */

const fetch = require('node-fetch');
const crypto = require('crypto');

const TENANT_ID = process.env.GRAPH_TENANT_ID;
const CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const SHARED_MAILBOX = 'contact@uneenergiecommune.fr';
const SECURITY_ALERT_EMAIL = 'william@haibo.fr';

// HTML-escape user input to prevent XSS/phishing in emails
function escapeHtml(str) {
  if (!str) return str;
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Sanitize all string fields in an object
function sanitizeData(data) {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = escapeHtml(value.trim());
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

// Bad words list (French insults, slurs, common spam terms)
const BAD_WORDS = [
  'connard', 'connasse', 'enculé', 'enculer', 'putain', 'pute',
  'salope', 'salaud', 'batard', 'bâtard', 'nique', 'niquer',
  'fdp', 'ntm', 'tg', 'va te faire',
  'merde', 'bordel', 'enfoiré',
  'fils de pute', 'ta gueule', 'ta mère',
  'crétin', 'abruti',
  // English
  'fuck', 'shit', 'asshole', 'bitch', 'bastard', 'dick', 'cunt',
  // Spam/scam
  'viagra', 'cialis', 'casino', 'bitcoin', 'crypto currency',
  'click here', 'free money', 'you have won', 'congratulations you',
  'nigger', 'nigga',
];

// Suspicious URL patterns (phishing indicators)
const SUSPICIOUS_URL_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /bit\.ly/i,
  /tinyurl/i,
  /\.ru\b/i,
  /\.cn\b/i,
  /\[url/i,
  /href\s*=/i,
  /<a\s/i,
  /<script/i,
  /<img/i,
  /<iframe/i,
];

// Check text fields for bad words
function containsBadWords(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return BAD_WORDS.some(word => {
    // Match whole word (with accents tolerance)
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(lower);
  });
}

// Check for suspicious URLs/HTML in text
function containsSuspiciousContent(text) {
  if (!text) return false;
  return SUSPICIOUS_URL_PATTERNS.some(pattern => pattern.test(text));
}

// Validate all text fields in form data for malicious content
function validateContent(data, textFields) {
  for (const field of textFields) {
    const value = data[field];
    if (!value) continue;

    if (containsBadWords(value)) {
      return { valid: false, error: 'Votre message contient des termes inappropriés. Merci de reformuler.' };
    }

    if (containsSuspiciousContent(value)) {
      return { valid: false, error: 'Les liens et le code HTML ne sont pas autorisés dans ce formulaire.' };
    }
  }
  return { valid: true };
}

// Honeypot check: if the hidden field is filled, it's a bot
function isHoneypotTriggered(data) {
  return !!data.website || !!data.url || !!data.fax;
}

// Timestamp check: form submitted too fast = likely a bot
// Expects data._timestamp to be set when the form was loaded (in ms)
function isSubmittedTooFast(data, minSeconds = 3) {
  if (!data._timestamp) return false; // skip if not implemented on frontend
  const elapsed = (Date.now() - Number(data._timestamp)) / 1000;
  return elapsed < minSeconds;
}

// Simple in-memory rate limiter (per IP, resets on function restart)
const submissions = new Map();

function isRateLimited(ip, maxPerWindow = 5, windowMs = 600000) {
  const now = Date.now();
  const key = ip || 'unknown';

  if (!submissions.has(key)) {
    submissions.set(key, []);
  }

  const times = submissions.get(key).filter(t => now - t < windowMs);
  times.push(now);
  submissions.set(key, times);

  return times.length > maxPerWindow;
}

// CORS: restrict to allowed origins
const ALLOWED_ORIGINS = [
  'https://uneenergiecommune.fr',
  'https://www.uneenergiecommune.fr',
  'http://localhost:3000',
  'http://localhost:4280',
];

function getCorsHeaders(reqOrigin) {
  const origin = ALLOWED_ORIGINS.includes(reqOrigin) ? reqOrigin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Get Microsoft Graph access token for sending emails
async function getSecurityAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`Token error: ${data.error_description || data.error}`);
  }
  return data.access_token;
}

// Send security alert email to admin (fire-and-forget, never blocks the response)
async function sendSecurityAlert(context, reason, details) {
  try {
    const accessToken = await getSecurityAccessToken();

    const emailContent = {
      message: {
        subject: `[SECURITE] ${reason}`,
        body: {
          contentType: 'HTML',
          content: `
            <h2 style="color:#c0392b;">Alerte sécurité - Soumission bloquée</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>Raison</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(reason)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>Date</strong></td><td style="padding:8px;border:1px solid #ddd;">${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>IP</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(details.ip)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>User-Agent</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(details.userAgent)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>Origin</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(details.origin)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>Referer</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(details.referer)}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;background:#fdecea;"><strong>Formulaire</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(details.formName || 'inconnu')}</td></tr>
            </table>
            ${details.email ? `<p><strong>Email soumis :</strong> ${escapeHtml(details.email)}</p>` : ''}
            ${details.nom ? `<p><strong>Nom soumis :</strong> ${escapeHtml(details.nom)}</p>` : ''}
            ${details.prenom ? `<p><strong>Prénom soumis :</strong> ${escapeHtml(details.prenom)}</p>` : ''}
            ${details.fingerprint && details.fingerprint.screenResolution ? `
            <h3>Empreinte navigateur / appareil</h3>
            <table style="border-collapse:collapse;width:100%;max-width:600px;font-size:13px;">
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Écran</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.screenResolution)} (x${details.fingerprint.devicePixelRatio || 1}, ${details.fingerprint.screenColorDepth || '?'}bit)</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Langue</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.language)} [${escapeHtml((details.fingerprint.languages || []).join(', '))}]</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Plateforme</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.platform)}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Fuseau horaire</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.timezone)} (UTC${details.fingerprint.timezoneOffset > 0 ? '-' : '+'}${Math.abs(details.fingerprint.timezoneOffset / 60)})</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>CPU cores</strong></td><td style="padding:6px;border:1px solid #ddd;">${details.fingerprint.hardwareConcurrency || '?'}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>RAM (Go)</strong></td><td style="padding:6px;border:1px solid #ddd;">${details.fingerprint.deviceMemory || 'non disponible'}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Écran tactile</strong></td><td style="padding:6px;border:1px solid #ddd;">${details.fingerprint.maxTouchPoints > 0 ? 'Oui (' + details.fingerprint.maxTouchPoints + ' points)' : 'Non'}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Connexion</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.connectionType || 'non disponible')}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>GPU</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.webglVendor)} — ${escapeHtml(details.fingerprint.webglRenderer)}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Canvas hash</strong></td><td style="padding:6px;border:1px solid #ddd;font-family:monospace;">${escapeHtml(details.fingerprint.canvasHash)}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Cookies</strong></td><td style="padding:6px;border:1px solid #ddd;">${details.fingerprint.cookiesEnabled ? 'Oui' : 'Non'}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Do Not Track</strong></td><td style="padding:6px;border:1px solid #ddd;">${escapeHtml(details.fingerprint.doNotTrack || 'non défini')}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>Plugins</strong></td><td style="padding:6px;border:1px solid #ddd;">${details.fingerprint.pluginsCount || 0} installé(s)</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;background:#fff3e0;"><strong>User-Agent complet</strong></td><td style="padding:6px;border:1px solid #ddd;font-size:11px;word-break:break-all;">${escapeHtml(details.fingerprint.userAgent)}</td></tr>
            </table>
            ` : '<p><em>Empreinte navigateur non disponible (soumission via script/bot)</em></p>'}
            <h3>Données brutes soumises</h3>
            <pre style="padding:15px;background:#f5f5f5;border:1px solid #ddd;overflow-x:auto;font-size:12px;max-height:300px;">${escapeHtml(details.rawPayload)}</pre>
            <hr style="margin-top:30px;border:none;border-top:1px solid #ddd;">
            <p style="color:#666;font-size:12px;">Alerte automatique du système de sécurité - uneenergiecommune.fr</p>
          `
        },
        toRecipients: [{ emailAddress: { address: SECURITY_ALERT_EMAIL } }],
        importance: 'high'
      },
      saveToSentItems: 'false'
    };

    await fetch(
      `https://graph.microsoft.com/v1.0/users/${SHARED_MAILBOX}/sendMail`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailContent)
      }
    );

    context.log('Security alert email sent to admin');
  } catch (err) {
    // Never let alert failure break the main flow
    context.log(`Failed to send security alert email: ${err.message}`);
  }
}

// Collect attacker details from request
function getAttackerDetails(req, data, formName) {
  const fingerprint = data._fingerprint || {};
  return {
    ip: req.headers['x-forwarded-for'] || req.headers['x-client-ip'] || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
    referer: req.headers['referer'] || 'none',
    origin: req.headers['origin'] || 'none',
    email: data.email || '',
    nom: data.nom || '',
    prenom: data.prenom || '',
    formName: formName || 'unknown',
    rawPayload: JSON.stringify(data).substring(0, 1000),
    fingerprint,
  };
}

// Log detailed attacker info for investigation
function logAttackerDetails(context, details, reason) {
  context.log('=== SECURITY BLOCK ===');
  context.log(`Reason: ${reason}`);
  context.log(`IP: ${details.ip}`);
  context.log(`User-Agent: ${details.userAgent}`);
  context.log(`Origin: ${details.origin}`);
  context.log(`Referer: ${details.referer}`);
  context.log(`Timestamp: ${new Date().toISOString()}`);
  if (details.email) context.log(`Email: ${details.email}`);
  if (details.nom) context.log(`Nom: ${details.nom}`);
  if (details.prenom) context.log(`Prenom: ${details.prenom}`);
  context.log(`Payload: ${details.rawPayload}`);
  context.log('======================');
}

// Run all security checks, return error response or null if OK
function runSecurityChecks(context, req, data, textFields, formName) {
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-client-ip'] || 'unknown';
  const origin = req.headers['origin'] || '';
  const corsHeaders = getCorsHeaders(origin);
  const details = getAttackerDetails(req, data, formName);

  // Rate limiting
  if (isRateLimited(clientIp)) {
    const reason = 'BLOQUÉ - Trop de soumissions (rate limit)';
    logAttackerDetails(context, details, reason);
    sendSecurityAlert(context, reason, details);
    return {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Trop de soumissions. Veuillez réessayer dans quelques minutes.' })
    };
  }

  // Honeypot
  if (isHoneypotTriggered(data)) {
    const reason = 'BLOQUÉ - Bot détecté (honeypot)';
    logAttackerDetails(context, details, reason);
    sendSecurityAlert(context, reason, details);
    // Return 200 to not alert the bot
    return {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Merci !' })
    };
  }

  // Timestamp (too fast)
  if (isSubmittedTooFast(data)) {
    const reason = 'BLOQUÉ - Soumission trop rapide (bot)';
    logAttackerDetails(context, details, reason);
    sendSecurityAlert(context, reason, details);
    return {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Merci !' })
    };
  }

  // Content validation (bad words, URLs, HTML)
  const contentCheck = validateContent(data, textFields);
  if (!contentCheck.valid) {
    const reason = `BLOQUÉ - Contenu interdit`;
    logAttackerDetails(context, details, reason);
    sendSecurityAlert(context, reason, details);
    return {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: contentCheck.error })
    };
  }

  return null; // All checks passed
}

// Verify OTP token from verify-email endpoint
function verifyOtpToken(email, otpCode, otpToken) {
  if (!email || !otpCode || !otpToken) return false;
  const parts = otpToken.split(':');
  if (parts.length !== 2) return false;
  const [signature, expiresAt] = parts;
  if (Date.now() > Number(expiresAt)) return false;
  const expected = crypto.createHmac('sha256', CLIENT_SECRET)
    .update(`${email.toLowerCase()}:${otpCode}:${expiresAt}`)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

module.exports = {
  escapeHtml,
  sanitizeData,
  containsBadWords,
  containsSuspiciousContent,
  validateContent,
  isHoneypotTriggered,
  isSubmittedTooFast,
  isRateLimited,
  getCorsHeaders,
  runSecurityChecks,
  sendSecurityAlert,
  getAttackerDetails,
  verifyOtpToken,
};
