import { AREAS, OCCASIONS, SERVICES } from '../data/site';
import { ALL_ITEMS, ITEM_IDS } from '../data/menu';
import type { Lead } from './store';

export type InquiryErrors = Partial<Record<'name' | 'phone' | 'date' | 'guests', string>>;

const OCCASION_LABEL: Record<string, string> = {
  wedding: 'Wedding / Reception',
  engagement: 'Engagement / Sangeet',
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  corporate: 'Corporate event',
  other: 'Other celebration',
};
const SERVICE_LABEL: Record<string, string> = {
  all: 'Food + drinks + décor',
  food: 'Food catering',
  drinks: 'Drinks bar',
  decor: 'Décor only',
};

const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

/** Reads either FormData or a JSON object into a clean lead, or returns field errors. */
export function parseInquiry(src: FormData | Record<string, unknown>):
  | { ok: true; lead: Omit<Lead, 'id' | 'timestamp' | 'status'>; spam: boolean }
  | { ok: false; errors: InquiryErrors } {
  const get = (k: string) => (src instanceof FormData ? src.get(k) : (src as any)[k]);
  const getAll = (k: string): unknown[] => {
    if (src instanceof FormData) return src.getAll(k);
    const v = (src as any)[k];
    return Array.isArray(v) ? v : v ? [v] : [];
  };

  const errors: InquiryErrors = {};
  const fullName = str(get('name'), 80);
  const phoneRaw = str(get('phone'), 30);
  const digits = phoneRaw.replace(/\D/g, '');
  const date = str(get('date'), 10);
  const guestsRaw = str(get('guests'), 6);
  const guests = guestsRaw ? parseInt(guestsRaw, 10) : undefined;

  if (fullName.length < 2) errors.name = 'name';
  if (digits.length < 10 || digits.length > 15) errors.phone = 'phone';
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.date = 'date';
  if (guestsRaw && (!guests || guests < 10 || guests > 5000)) errors.guests = 'guests';
  if (Object.keys(errors).length) return { ok: false, errors };

  const occasion = str(get('occasion'), 20);
  const area = str(get('area'), 30);
  const service = str(get('service'), 10);
  const thali = getAll('thali').map((v) => String(v)).filter((id) => ITEM_IDS.has(id)).slice(0, 40);
  const decor = ALL_ITEMS.find((i) => i.group === 'decor' && thali.includes(i.id));

  return {
    ok: true,
    spam: str(get('website'), 100) !== '',
    lead: {
      fullName,
      phone: phoneRaw,
      whatsapp: phoneRaw,
      city: (AREAS as readonly string[]).includes(area) ? `Surat - ${area}` : undefined,
      eventType: (OCCASIONS as readonly string[]).includes(occasion) ? OCCASION_LABEL[occasion] : undefined,
      eventDate: date || undefined,
      guestCount: guests,
      services: (SERVICES as readonly string[]).includes(service) ? [SERVICE_LABEL[service]] : undefined,
      decorTheme: decor?.name.en,
      specialNotes: str(get('notes'), 1000) || undefined,
      thali: thali.length ? thali : undefined,
      lang: ['en', 'gu', 'hi'].includes(String(get('lang'))) ? String(get('lang')) : 'en',
      dietary: '100% pure vegetarian',
    },
  };
}
