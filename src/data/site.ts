export const SITE = {
  brand: 'Kesariya Catering',
  owner: 'Bharatbhai Gajera',
  phoneDisplay: '+91 87585 38259',
  phoneTel: '+918758538259',
  whatsapp: '918758538259',
  email: 'kesariyacateringsurat@gmail.com',
  address: '263, Momai Residency, Umragam, Surat 394130',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Momai Residency, Umragam, Surat 394130'),
};

export const OCCASIONS = ['wedding', 'engagement', 'birthday', 'anniversary', 'corporate', 'other'] as const;
export type Occasion = (typeof OCCASIONS)[number];

export const AREAS = [
  'Umragam', 'Vesu', 'Adajan', 'VIP Road', 'Piplod', 'City Light', 'Katargam', 'Hazira', 'Vapi', 'Other',
] as const;

export const SERVICES = ['all', 'food', 'drinks', 'decor'] as const;
export type Service = (typeof SERVICES)[number];

export const STATUSES = ['New', 'Contacted', 'Confirmed', 'Closed'] as const;
export type Status = (typeof STATUSES)[number];

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
