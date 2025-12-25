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
<pre id="debug"></pre>
<script>
(function() {
  var debug = document.getElementById('debug');
  var status = document.getElementById('status');

  function log(msg) {
    console.log(msg);
    debug.textContent += msg + '\\n';
  }

  log('=== OAUTH CALLBACK ===');
  log('URL: ' + window.location.href.substring(0, 80) + '...');
  log('window.opener: ' + (window.opener ? 'PRESENT' : 'NULL'));
  log('window.opener type: ' + typeof window.opener);

  var token = "${token}";
  log('Token length: ' + token.length);

  var message = 'authorization:github:success:' + JSON.stringify({token: token, access_token: token, provider: 'github'});
  log('Message: ' + message.substring(0, 60) + '...');

  if (window.opener) {
    try {
      // Handshake d'abord
      window.opener.postMessage('authorizing:github', '*');
      log('Handshake sent');

      // Puis le token apres un court delai
      setTimeout(function() {
        window.opener.postMessage(message, '*');
        log('postMessage sent OK');
        status.textContent = 'OK! Fermeture dans 3s...';
        setTimeout(function() { window.close(); }, 3000);
      }, 100);
    } catch(e) {
      log('postMessage ERROR: ' + e.message);
      status.textContent = 'Erreur postMessage: ' + e.message;
    }
  } else {
    log('No opener - trying alternatives...');

    // Essayer localStorage
    try {
      localStorage.setItem('decap-cms-auth', JSON.stringify({token: token, provider: 'github'}));
      log('Saved to localStorage');
    } catch(e) {
      log('localStorage error: ' + e.message);
    }

    status.textContent = 'Pas de fenetre parente. Fermez et rafraichissez /admin/';
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
