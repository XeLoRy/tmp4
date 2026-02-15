// GitHub auth proxy - bypasses OAuth and uses server-side token
module.exports = async function (context, req) {
  context.log('=== AUTH FUNCTION (PROXY MODE) ===');

  // Get admin token from query param
  const adminToken = req.query.admin_token;
  context.log('Admin token present:', adminToken ? 'YES' : 'NO');

  // Validate admin session
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!ADMIN_PASSWORD || !GITHUB_TOKEN) {
    context.log('ERROR: Missing environment variables');
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: errorHtml('Configuration serveur manquante')
    };
    return;
  }

  // Verify admin token
  let isValid = false;
  if (adminToken) {
    try {
      const decoded = Buffer.from(adminToken, 'base64').toString();
      const parts = decoded.split(':');
      if (parts.length >= 3 && parts[0] === 'admin' && parts.slice(2).join(':') === ADMIN_PASSWORD) {
        const timestamp = parseInt(parts[1]);
        const now = Date.now();
        // Token valid for 24 hours
        if (now - timestamp < 86400000) {
          isValid = true;
        }
      }
    } catch (e) {
      context.log('Token decode error:', e.message);
    }
  }

  if (!isValid) {
    context.log('Invalid admin session - returning error');
    context.res = {
      status: 200, // Return 200 with error page so popup can show message
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: errorHtml('Session expirée. Veuillez vous reconnecter.')
    };
    return;
  }

  context.log('Admin session valid - returning GitHub token');

  // Return success HTML that sends the token to parent window
  const callbackHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Authentification</title></head>
<body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#f5f5f5;">
<div style="text-align:center;padding:20px;">
  <p id="status" style="color:#333;font-size:16px;">Authentification en cours...</p>
</div>
<script>
(function() {
  var status = document.getElementById('status');
  var token = "${GITHUB_TOKEN}";
  var message = 'authorization:github:success:' + JSON.stringify({token: token, provider: 'github'});

  if (window.opener) {
    window.opener.postMessage('authorizing:github', '*');
    setTimeout(function() {
      window.opener.postMessage(message, '*');
      status.textContent = 'Connecté ! Fermeture...';
      status.style.color = '#22c55e';
      setTimeout(function() { window.close(); }, 500);
    }, 100);
  } else {
    status.textContent = 'Erreur: fenêtre parent non trouvée. Fermez et réessayez.';
    status.style.color = '#ef4444';
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
};

function errorHtml(message) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Erreur d'authentification</title></head>
<body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#fef2f2;">
<div style="text-align:center;padding:20px;">
  <p style="color:#ef4444;font-size:16px;">${message}</p>
  <button onclick="window.close()" style="margin-top:10px;padding:8px 16px;background:#ef4444;color:white;border:none;border-radius:4px;cursor:pointer;">Fermer</button>
</div>
<script>
if (window.opener) {
  window.opener.postMessage('authorization:github:error:' + JSON.stringify({error: '${message}'}), '*');
}
</script>
</body>
</html>`;
}
