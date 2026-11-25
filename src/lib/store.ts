// Lead storage. Everything that touches persistence lives here, so moving to a
// hosted database later (e.g. Supabase) means rewriting only this file.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomInt } from 'node:crypto';
import type { Status } from '../data/site';

export interface Lead {
  id: string;
  timestamp: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  eventType?: string;
  eventDate?: string;
  timeSlot?: string;
  guestCount?: number;
  venueStatus?: string;
  dietary?: string;
  services?: string[];
  decorTheme?: string;
  budgetTier?: string;
  specialNotes?: string;
  thali?: string[];
  lang?: string;
  status: Status | string;
  estimatedQuote?: string;
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'leads.json');

// All writes go through one queue, so two inquiries arriving together
// can never overwrite each other.
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    const data = JSON.parse(raw || '[]');
    return Array.isArray(data) ? data : [];
  } catch (err: any) {
    if (err?.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeAll(leads: Lead[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + '.' + process.pid + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), 'utf8');
  await fs.rename(tmp, FILE);
}

export const listLeads = () => serial(readAll);

export function addLead(input: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> {
  return serial(async () => {
    const leads = await readAll();
    const ids = new Set(leads.map((l) => l.id));
    let id: string;
    do {
      id = 'KES-' + randomInt(100000, 1000000);
    } while (ids.has(id));
    const lead: Lead = { ...input, id, timestamp: new Date().toISOString(), status: 'New' };
    leads.unshift(lead);
    await writeAll(leads);
    return lead;
  });
}

export function setStatus(id: string, status: Status): Promise<Lead | null> {
  return serial(async () => {
    const leads = await readAll();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    await writeAll(leads);
    return lead;
  });
}

export function deleteLead(id: string): Promise<boolean> {
  return serial(async () => {
    const leads = await readAll();
    const next = leads.filter((l) => l.id !== id);
    if (next.length === leads.length) return false;
    await writeAll(next);
    return true;
  });
}
