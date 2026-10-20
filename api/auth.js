import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
const githubTokenUrl = 'https://github.com/login/oauth/access_token';
const githubUserUrl = 'https://api.github.com/user';
const callbackPath = '/api/auth';
const appOrigin = 'https://queensbeauty.vercel.app';

function getConfig() {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, OAUTH_STATE_SECRET } = process.env;
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !OAUTH_STATE_SECRET) {
    throw new Error('OAuth server is not configured');
  }
  return { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, OAUTH_STATE_SECRET };
}

function signState(value, secret) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function createState(secret) {
  const value = randomBytes(32).toString('base64url');
  return `${value}.${signState(value, secret)}`;
}

function isValidState(state, secret) {
  if (!state) return false;
  const [value, signature] = state.split('.');
  if (!value || !signature) return false;
  const expected = signState(value, secret);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

function getCookie(request, name) {
  const cookies = request.headers.get('cookie')?.split(';') ?? [];
  const cookie = cookies.find((value) => value.trim().startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.trim().slice(name.length + 1)) : '';
}

function htmlResponse(body, status = 200) {
  return new Response(`<!doctype html><html><body><script>${body}</script></body></html>`, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'content-security-policy': "default-src 'none'; script-src 'unsafe-inline'",
    },
  });
}

function errorResponse(message, status = 400) {
  return htmlResponse(`document.body.textContent=${JSON.stringify(message)};`, status);
}

async function exchangeCode(code, config, redirectUri) {
  const response = await fetch(githubTokenUrl, {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!response.ok) throw new Error('GitHub token exchange failed');
  const payload = await response.json();
  if (!payload.access_token) throw new Error('GitHub did not return an access token');
  return payload.access_token;
}

async function isAllowedGitHubUser(token) {
  const allowedUser = process.env.GITHUB_ALLOWED_USER?.trim().toLowerCase();
  if (!allowedUser) return true;
  const response = await fetch(githubUserUrl, {
    headers: { accept: 'application/vnd.github+json', authorization: `Bearer ${token}`, 'user-agent': 'queens-beauty-cms' },
  });
  if (!response.ok) return false;
  const user = await response.json();
  return typeof user.login === 'string' && user.login.toLowerCase() === allowedUser;
}

export default async function handler(request) {
  try {
    const config = getConfig();
    const requestUrl = new URL(request.url);
    const redirectUri = `${requestUrl.origin}${callbackPath}`;
    const code = requestUrl.searchParams.get('code');
    const state = requestUrl.searchParams.get('state');
    const oauthError = requestUrl.searchParams.get('error');

    if (request.method !== 'GET') return errorResponse('Method not allowed', 405);
    if (oauthError) return errorResponse(`GitHub authorization failed: ${oauthError}`);

    if (!code) {
      const nextState = createState(config.OAUTH_STATE_SECRET);
      const authorizeUrl = new URL(githubAuthorizeUrl);
      authorizeUrl.searchParams.set('client_id', config.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set('redirect_uri', redirectUri);
      authorizeUrl.searchParams.set('scope', 'repo');
      authorizeUrl.searchParams.set('state', nextState);
      return new Response(null, {
        status: 302,
        headers: {
          location: authorizeUrl.toString(),
          'cache-control': 'no-store',
          'set-cookie': `decap_oauth_state=${encodeURIComponent(nextState)}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,
        },
      });
    }

    const cookieState = getCookie(request, 'decap_oauth_state');
    if (!isValidState(state, config.OAUTH_STATE_SECRET) || !state || state !== cookieState) {
      return errorResponse('Invalid or expired OAuth state', 400);
    }

    const token = await exchangeCode(code, config, redirectUri);
    if (!(await isAllowedGitHubUser(token))) return errorResponse('This GitHub account is not authorized for the CMS', 403);

    const message = JSON.stringify({
      token,
      provider: 'github',
    }).replace(/</g, '\\u003c');
    return htmlResponse(`window.opener.postMessage("authorization:github:success:${message}",${JSON.stringify(appOrigin)});window.close();`);
  } catch (error) {
    console.error('Decap OAuth error', error);
    return errorResponse('OAuth authentication is unavailable. Check the server configuration.', 503);
  }
}
