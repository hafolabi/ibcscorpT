
/**
 * It takes a JWT token, splits it into three parts, takes the second part, replaces some characters,
 * decodes it, and parses it into a JSON object
 * @param {string} token - The JWT token you want to parse.
 * @returns The payload of the JWT token.
 */

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  if (base64Url) {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        // @ts-ignore
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    ); 
    return JSON.parse(jsonPayload);
  }
  return null;
}

/**
 * If the token is valid, return the header, otherwise return false
 * @param {string} token - The JWT token to parse
 * @returns The header of the token.
 */

export function getSession(token) {
  if (!token) return false;
  const header = parseJwt(token);
  if (!header) return false;
  const now = Math.floor(Date.now() / 1000);
  if (header.exp <= now) return false;

  return header;
}
