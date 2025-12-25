const fetch = require('node-fetch');

module.exports = async function (context, req) {
  context.log('=== AUTH FUNCTION START ===');
  context.log('Query params:', JSON.stringify(req.query));

  const code = req.query.code;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = 'https://wonderful-coast-0605c9403.4.azurestaticapps.net/api/auth';

  context.log('ClientID:', clientId ? 'SET' : 'NOT SET');
  context.log('ClientSecret:', clientSecret ? 'SET' : 'NOT SET');
  context.log('Code:', code ? 'PRESENT' : 'NOT PRESENT');

  if (!code) {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
    context.log('Redirecting to GitHub:', authUrl);

    context.res = {
      status: 302,
      headers: { 'Location': authUrl },
      body: ''
    };
    return;
  }

  try {
    context.log('Exchanging code for token...');
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const data = await response.json();
    context.log('GitHub response:', JSON.stringify(data));

    if (data.error) {
      context.log('ERROR from GitHub:', data.error);
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: `Error: ${data.error_description || data.error}`
      };
      return;
    }

    const token = data.access_token;
    context.log('Token received:', token ? 'YES (length: ' + token.length + ')' : 'NO');

    // Retourner le HTML directement pour preserver window.opener
    const callbackHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>OAuth</title></head>
<body>
<p id="status">Authentification...</p>
<script>
(function() {
  var token = "${token}";
  var message = 'authorization:github:success:' + JSON.stringify({token: token, provider: 'github'});

  console.log('window.opener:', window.opener ? 'present' : 'null');

  if (window.opener) {
    window.opener.postMessage(message, '*');
    document.getElementById('status').textContent = 'OK! Fermeture...';
    setTimeout(function() { window.close(); }, 1000);
  } else {
    document.getElementById('status').textContent = 'Erreur: pas de fenetre parente. Fermez et reessayez.';
  }
})();
</script>
</body>
</html>`;

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: callbackHtml
    };
  } catch (error) {
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: `Error: ${error.message}`
    };
  }
};
