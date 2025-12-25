module.exports = async function (context, req) {
  const code = req.query.code;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = 'https://uec-oauth.azurewebsites.net/api/auth';

  if (!code) {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

    context.res = {
      status: 302,
      headers: { 'Location': authUrl },
      body: ''
    };
    return;
  }

  try {
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

    if (data.error) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: `Error: ${data.error_description || data.error}`
      };
      return;
    }

    const token = data.access_token;
    const html = `<!DOCTYPE html>
<html>
<head><title>OAuth</title></head>
<body>
<script>
(function() {
  const token = "${token}";
  const message = "authorization:github:success:" + JSON.stringify({token: token, provider: "github"});
  window.opener.postMessage(message, "*");
  window.close();
})();
</script>
</body>
</html>`;

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html
    };
  } catch (error) {
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: `Error: ${error.message}`
    };
  }
};
