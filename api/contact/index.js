const fetch = require('node-fetch');

const TENANT_ID = process.env.GRAPH_TENANT_ID;
const CLIENT_ID = process.env.GRAPH_CLIENT_ID;
const CLIENT_SECRET = process.env.GRAPH_CLIENT_SECRET;
const SHARED_MAILBOX = 'contact@uneenergiecommune.fr';

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

async function sendEmail(accessToken, { prenom, nom, email, sujet, message }) {
  const sujetLabels = {
    'question': 'Question generale',
    'programme': 'Question sur le programme',
    'benevolat': 'Devenir benevole',
    'presse': 'Contact presse',
    'autre': 'Autre'
  };

  const emailContent = {
    message: {
      subject: `[Une Energie Commune] ${nom} ${prenom} - ${sujetLabels[sujet] || sujet}`,
      body: {
        contentType: 'HTML',
        content: `
          <h2>Nouveau message du formulaire de contact</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd;">${nom}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Prenom</strong></td><td style="padding:8px;border:1px solid #ddd;">${prenom}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;background:#f9f9f9;"><strong>Sujet</strong></td><td style="padding:8px;border:1px solid #ddd;">${sujetLabels[sujet] || sujet}</td></tr>
          </table>
          <h3>Message</h3>
          <div style="padding:15px;background:#f5f5f5;border-left:4px solid #9bc73e;white-space:pre-wrap;">${message}</div>
          <hr style="margin-top:30px;border:none;border-top:1px solid #ddd;">
          <p style="color:#666;font-size:12px;">Ce message a ete envoye depuis le formulaire de contact du site Une Energie Commune.</p>
        `
      },
      toRecipients: [{ emailAddress: { address: SHARED_MAILBOX } }],
      replyTo: [{ emailAddress: { address: email, name: `${prenom} ${nom}` } }]
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
    throw new Error(`Graph API error: ${response.status} - ${errorText}`);
  }

  return true;
}

module.exports = async function (context, req) {
  context.log('=== CONTACT FORM SUBMISSION ===');

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

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
    const { prenom, nom, email, sujet, message, rgpd } = req.body || {};

    // Validation
    if (!prenom || !nom || !email || !message) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Champs requis manquants' })
      };
      return;
    }

    if (!rgpd) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Vous devez accepter les conditions RGPD' })
      };
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      context.res = {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email invalide' })
      };
      return;
    }

    context.log(`Contact from: ${prenom} ${nom} <${email}>`);

    // Get token and send email
    const accessToken = await getAccessToken();
    await sendEmail(accessToken, { prenom, nom, email, sujet, message });

    context.log('Email sent successfully');

    context.res = {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Message envoye avec succes' })
    };
  } catch (error) {
    context.log('ERROR:', error.message);
    context.res = {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur lors de l\'envoi. Veuillez reessayer.' })
    };
  }
};
