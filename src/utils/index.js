/* eslint-disable */
const CLIENT_ID = '9435aabf393cb270054b';
const CLIENT_SECRET = 'cb03a6f0222cf6b49389b99d48c9881ecec61d70';

export function queryStringify(query = {}) {
  return Object
    .entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value || '')}`)
    .join('&');
}

export function signIn() {
  const oauthUrl = 'http://github.com/login/oauth/authorize';
  const current = location.href;
  const query = {
    client_id: CLIENT_ID,
    redirect_uri: current,
    scope: 'public_repo',
  }
  return `${oauthUrl}?${queryStringify(query)}`
}

export async function getAccessToken(code) {
  const accessTokenUrl = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token';
  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  };
  return fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function getUser(token) {
  const url = 'https://api.github.com/user';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${token}`
    },
  });
}