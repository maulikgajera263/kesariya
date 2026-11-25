import type { APIRoute } from 'astro';
import { listLeads } from '../../lib/store';
import { isLoggedIn } from '../../lib/auth';
import { itemName } from '../../data/menu';

// Quote every cell, and neutralise values a spreadsheet would run as a formula.
const cell = (v: unknown) => {
  let s = String(v ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
};

export const GET: APIRoute = async ({ cookies, redirect }) => {
  if (!isLoggedIn(cookies)) return redirect('/admin/login', 303);
  const leads = await listLeads();
  const head = ['Ref', 'Received', 'Name', 'Phone', 'Area', 'Occasion', 'Date', 'Guests',
    'Services', 'Thali', 'Décor', 'Notes', 'Status'];
  const rows = leads.map((l) => [
    l.id, l.timestamp, l.fullName, l.phone, l.city, l.eventType, l.eventDate, l.guestCount,
    (l.services || []).join('; '), (l.thali || []).map((id) => itemName(id)).join('; '),
    l.decorTheme, l.specialNotes, l.status,
  ]);
  const csv = '﻿' + [head, ...rows].map((r) => r.map(cell).join(',')).join('\r\n');
  const day = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="kesariya-leads-${day}.csv"`,
    },
  });
};
