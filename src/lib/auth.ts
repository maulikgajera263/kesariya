// Owner portal login: one password from the ADMIN_PASSWORD environment variable,
// and a signed, http-only session cookie.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';

const COOKIE = 'kes_session';
const SESSION_HOURS = 24 * 7;

const password = () => process.env.ADMIN_PASSWORD || '';
const secret = () => process.env.SESSION_SECRET || 'kes:' + password();

export const portalConfigured = () => password().length >= 8;

const sha = (s: string) => createHash('sha256').update(s).digest();

export function checkPassword(attempt: string): boolean {
  if (!portalConfigured()) return false;
  return timingSafeEqual(sha(attempt), sha(password()));
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

export function startSession(cookies: AstroCookies, secure: boolean) {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const value = `${expires}.${sign(String(expires))}`;
  cookies.set(COOKIE, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure,
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
}

export function endSession(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: '/' });
}

export function isLoggedIn(cookies: AstroCookies): boolean {
  if (!portalConfigured()) return false;
  const raw = cookies.get(COOKIE)?.value;
  if (!raw) return false;
  const [exp, sig] = raw.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

// Simple in-memory rate limiter (per process), used for login and inquiries.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}
