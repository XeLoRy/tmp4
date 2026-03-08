const fetch = require('node-fetch');
const crypto = require('crypto');
const { getCorsHeaders, escapeHtml, isRateLimited } = require('../shared/security');

const TENANT_ID = process.env.GRAPH_TENANT_ID;
const CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const SHARED_MAILBOX = 'contact@uneenergiecommune.fr';

// Use CLIENT_SECRET as HMAC key for signing OTP tokens
const HMAC_SECRET = CLIENT_SECRET;

async function getAccessToken() {
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

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

function signOtp(email, otp, expiresAt) {
  const payload = `${email.toLowerCase()}:${otp}:${expiresAt}`;
  return crypto.createHmac('sha256', HMAC_SECRET).update(payload).digest('hex');
}

function verifyOtp(email, otp, expiresAt, signature) {
  if (Date.now() > expiresAt) return false;
  const expected = signOtp(email, otp, expiresAt);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

async function sendOtpEmail(accessToken, email, otp) {
  const emailContent = {
    message: {
      subject: `${otp} — Votre code de vérification | Une Énergie Commune`,
      body: {
        contentType: 'HTML',
        content: `
          <div style="max-width:500px;margin:0 auto;font-family:Arial,sans-serif;">
            <h2 style="color:#2d5016;">Vérification de votre adresse email</h2>
            <p>Vous avez demandé à soumettre un formulaire sur le site <strong>Une Énergie Commune</strong>.</p>
            <p>Voici votre code de vérification :</p>
            <div style="text-align:center;margin:30px 0;">
              <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#2d5016;background:#f0f7e6;padding:15px 30px;border-radius:10px;border:2px solid #9bc73e;">${otp}</span>
            </div>
            <p>Ce code est valable <strong>10 minutes</strong>.</p>
            <p style="color:#666;font-size:13px;">Si vous n'avez pas fait cette demande, ignorez simplement ce message.</p>
            <hr style="border:none;border-top:1px solid #ddd;margin-top:30px;">
            <p style="color:#999;font-size:11px;">Une Énergie Commune — Glières-Val-de-Borne</p>
          </div>
        `
      },
      toRecipients: [{ emailAddress: { address: email } }],
    },
    saveToSentItems: 'false'
  };

  const response = await fetch(
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Graph API error: ${response.status} - ${errorText}`);
  }
}

module.exports = async function (context, req) {
  context.log('=== VERIFY EMAIL REQUEST ===');

  const origin = req.headers['origin'] || '';
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: corsHeaders };
    return;
  }

  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
    return;
  }

  try {
    const data = req.body || {};
    const email = (data.email || '').trim().toLowerCase();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email invalide' })
      };
      return;
    }

    // Rate limit OTP requests (3 per 10 min per IP)
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-client-ip'] || 'unknown';
    if (isRateLimited(`otp:${clientIp}`, 3, 600000)) {
      context.res = {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Trop de demandes. Réessayez dans quelques minutes.' })
      };
      return;
    }

    // Generate OTP + signed token (valid 10 minutes)
    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    const signature = signOtp(email, otp, expiresAt);

    context.log(`OTP generated for: ${email}`);

    // Send OTP email
    const accessToken = await getAccessToken();
    await sendOtpEmail(accessToken, email, otp);

    context.log('OTP email sent');

    context.res = {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Code envoyé par email',
        token: `${signature}:${expiresAt}`
      })
    };
  } catch (error) {
    context.log('ERROR:', error.message);
    context.res = {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur lors de l\'envoi du code. Réessayez.' })
    };
  }
};

// Export verify function for use by other endpoints
module.exports.verifyOtp = verifyOtp;
