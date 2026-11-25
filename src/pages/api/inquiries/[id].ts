import type { APIRoute } from 'astro';
import { deleteLead, setStatus } from '../../../lib/store';
import { isLoggedIn } from '../../../lib/auth';
import { STATUSES, type Status } from '../../../data/site';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  if (!isLoggedIn(cookies)) return json({ error: 'Not logged in' }, 401);
  const body = await request.json().catch(() => ({}));
  if (!STATUSES.includes(body.status)) return json({ error: 'Unknown status' }, 400);
  const lead = await setStatus(String(params.id), body.status as Status);
  return lead ? json({ ok: true, lead }) : json({ error: 'Not found' }, 404);
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  if (!isLoggedIn(cookies)) return json({ error: 'Not logged in' }, 401);
  return (await deleteLead(String(params.id))) ? json({ ok: true }) : json({ error: 'Not found' }, 404);
};
