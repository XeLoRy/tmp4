// GitHub Token proxy for admin CMS
// Returns the server-side GitHub token after validating admin session
module.exports = async function (context, req) {
  context.log('github-token function invoked');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: corsHeaders };
    return;
  }

  try {
    // Get admin token from Authorization header
    const authHeader = req.headers['authorization'] || '';
    const adminToken = authHeader.replace('Bearer ', '');

    if (!adminToken) {
      context.res = {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Authorization required' })
      };
      return;
    }

    // Validate admin token
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (!ADMIN_PASSWORD) {
      context.res = {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server configuration error' })
      };
      return;
    }

    // Decode and verify token (format: base64(admin:timestamp:password))
    let isValid = false;
    try {
      const decoded = Buffer.from(adminToken, 'base64').toString();
      const parts = decoded.split(':');
      if (parts.length >= 3 && parts[0] === 'admin' && parts[2] === ADMIN_PASSWORD) {
        const timestamp = parseInt(parts[1]);
        const now = Date.now();
        // Token valid for 24 hours
        if (now - timestamp < 86400000) {
          isValid = true;
        }
      }
    } catch (e) {
      isValid = false;
    }

    if (!isValid) {
      context.res = {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid or expired session' })
      };
      return;
    }

    // Return the GitHub token
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
      context.res = {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'GitHub token not configured' })
      };
      return;
    }

    context.res = {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: GITHUB_TOKEN,
        provider: 'github'
      })
    };

  } catch (error) {
    context.log('ERROR:', error.message);
    context.res = {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
