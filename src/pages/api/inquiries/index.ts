import type { APIRoute } from 'astro';
import { addLead, listLeads } from '../../../lib/store';
import { parseInquiry } from '../../../lib/inquiry';
import { isLoggedIn, rateLimited } from '../../../lib/auth';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export const GET: APIRoute = async ({ cookies }) => {
  if (!isLoggedIn(cookies)) return json({ error: 'Not logged in' }, 401);
  return json(await listLeads());
};

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const isJson = (request.headers.get('content-type') || '').includes('application/json');
  let src: FormData | Record<string, unknown>;
  try {
    src = isJson ? await request.json() : await request.formData();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
  const lang = String(src instanceof FormData ? src.get('lang') : (src as any).lang || 'en');
  const home = lang === 'gu' ? '/gu/' : lang === 'hi' ? '/hi/' : '/';

  if (rateLimited('inq:' + clientAddress, 8, 10 * 60_000)) {
    return isJson ? json({ error: 'rate' }, 429) : redirect(`${home}?error=rate#plan`, 303);
  }

  const result = parseInquiry(src);
  if (!result.ok) {
    if (isJson) return json({ errors: result.errors }, 422);
    return redirect(`${home}?error=${Object.keys(result.errors).join(',')}#plan`, 303);
  }

  // Bots that fill the hidden field get a normal-looking reply but nothing is saved.
  const ref = result.spam ? 'KES-000000' : (await addLead(result.lead)).id;
  if (!result.spam) {
    console.log(`[inquiry] ${ref} ${result.lead.eventType ?? ''} ${result.lead.guestCount ?? ''} guests`);
  }
  return isJson ? json({ ok: true, ref }, 201) : redirect(`${home}?sent=${ref}#plan`, 303);
};
