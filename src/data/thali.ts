// Geometry of the drawn thali (viewBox 640x640), shared by the SVG and its labels.
export const KATORI_ORDER = ['sabzi', 'dal', 'chaat', 'global', 'mithai', 'drinks', 'decor'] as const;
export type RimKatori = (typeof KATORI_ORDER)[number];
export const KATORIS = KATORI_ORDER.map((id, i) => {
  const a = ((-90 + (i * 360) / KATORI_ORDER.length) * Math.PI) / 180;
  return { id, x: +(320 + 192 * Math.cos(a)).toFixed(1), y: +(320 + 192 * Math.sin(a)).toFixed(1) };
});
