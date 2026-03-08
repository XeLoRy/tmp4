const fetch = require('node-fetch');
const { sanitizeData, getCorsHeaders, runSecurityChecks, sendSecurityAlert, getAttackerDetails, verifyOtpToken } = require('../shared/security');

const TENANT_ID = process.env.GRAPH_TENANT_ID;
const CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const SHARED_MAILBOX = 'contact@uneenergiecommune.fr';
const TEAM_EMAIL = 'glieresvaldeborne@gmail.com';

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

async function sendEmailToTeam(accessToken, data) {
  const emailContent = {
    message: {
      subject: `[Une Énergie Commune] Enquête - ${data.nom || data.email}`,
      body: {
        contentType: 'HTML',
        content: `
          <h2>Nouvelle réponse à l'enquête citoyenne</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.nom || 'Non renseigné'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Téléphone</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.telephone || 'Non renseigné'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Quartier</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.quartier || 'Non renseigné'}</td></tr>
          </table>
          <h3>Priorités</h3>
          <ol>
            <li style="padding:5px 0;">${data.priorite1 || '-'}</li>
            <li style="padding:5px 0;">${data.priorite2 || '-'}</li>
            <li style="padding:5px 0;">${data.priorite3 || '-'}</li>
          </ol>
          ${data.commentaire ? `<h3>Commentaire</h3><div style="padding:15px;background:#f5f5f5;border-left:4px solid #9bc73e;white-space:pre-wrap;">${data.commentaire}</div>` : ''}
          <p><strong>Newsletter:</strong> ${data.newsletter ? 'Oui' : 'Non'}</p>
          <p><strong>Bénévolat:</strong> ${data.benevolat ? 'Oui' : 'Non'}</p>
          <hr style="margin-top:30px;border:none;border-top:1px solid #ddd;">
          <p style="color:#666;font-size:12px;">Ce message a été envoyé depuis le formulaire d'enquête du site Une Énergie Commune.</p>
        `
      },
      toRecipients: [{ emailAddress: { address: TEAM_EMAIL } }],
      replyTo: [{ emailAddress: { address: data.email, name: data.nom || data.email } }]
    },
    saveToSentItems: 'true'
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
    throw new Error(`Graph API error (team): ${response.status} - ${errorText}`);
  }

  return true;
}

async function sendCopyToArchive(accessToken, data) {
  const emailContent = {
    message: {
      subject: `[Archive] Enquête - ${data.nom || data.email}`,
      body: {
        contentType: 'HTML',
        content: `
          <h2>Copie d'archivage - Enquête citoyenne</h2>
          <p style="color:#666;font-size:12px;"><em>Cet email a également été envoyé à l'équipe sur Gmail.</em></p>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.nom || 'Non renseigné'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Téléphone</strong></td><td style="padding:8px;border:1px solid #ddd;">${data.telephone || 'Non renseigné'}</td></tr>
          </table>
          <h3>Priorités</h3>
          <ol>
            <li style="padding:5px 0;">${data.priorite1 || '-'}</li>
            <li style="padding:5px 0;">${data.priorite2 || '-'}</li>
            <li style="padding:5px 0;">${data.priorite3 || '-'}</li>
          </ol>
          ${data.commentaire ? `<h3>Commentaire</h3><div style="padding:15px;background:#f5f5f5;border-left:4px solid #9bc73e;white-space:pre-wrap;">${data.commentaire}</div>` : ''}
          <p><strong>Newsletter:</strong> ${data.newsletter ? 'Oui' : 'Non'}</p>
          <p><strong>Bénévolat:</strong> ${data.benevolat ? 'Oui' : 'Non'}</p>
        `
      },
      toRecipients: [{ emailAddress: { address: SHARED_MAILBOX } }],
      replyTo: [{ emailAddress: { address: data.email, name: data.nom || data.email } }]
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
    throw new Error(`Graph API error (archive): ${response.status} - ${errorText}`);
  }

  return true;
}

module.exports = async function (context, req) {
  context.log('=== ENQUETE FORM SUBMISSION ===');

  const origin = req.headers['origin'] || '';
  const corsHeaders = getCorsHeaders(origin);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: corsHeaders };
    return;
  }

  // Only POST
  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
    return;
  }

  try {
    const rawData = req.body || {};

    // Security checks (rate limit, honeypot, speed, content)
    const blocked = runSecurityChecks(context, req, rawData, ['nom', 'commentaire', 'telephone', 'quartier'], 'Enquête citoyenne');
    if (blocked) {
      context.res = blocked;
      return;
    }

    // Sanitize all string inputs (HTML-escape)
    const data = sanitizeData(rawData);

    // Validation
    if (!data.email) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email requis' })
      };
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email invalide' })
      };
      return;
    }

    // OTP verification
    if (!verifyOtpToken(data.email, rawData._otpCode, rawData._otpToken)) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Code de vérification invalide ou expiré. Veuillez vérifier votre email à nouveau.' })
      };
      return;
    }

    context.log(`Enquête from: ${data.nom || 'Anonyme'} <${data.email}>`);

    // Get token and send emails
    const accessToken = await getAccessToken();

    // 1. Send to team (Gmail)
    await sendEmailToTeam(accessToken, data);
    context.log('Email sent to team (Gmail)');

    // 2. Send archive copy to shared mailbox
    await sendCopyToArchive(accessToken, data);
    context.log('Archive copy sent to shared mailbox');

    // 3. Send fingerprint alert to admin (fire-and-forget)
    const details = getAttackerDetails(req, rawData, 'Enquête citoyenne');
    sendSecurityAlert(context, `SOUMISSION - ${data.nom || data.email}`, details);

    context.res = {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Merci pour votre participation!' })
    };
  } catch (error) {
    context.log('ERROR:', error.message);
    context.res = {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur lors de l\'envoi. Veuillez réessayer.' })
    };
  }
};
