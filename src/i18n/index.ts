import en from './en';
import gu from './gu';
import hi from './hi';
import type { Lang } from '../data/menu';

export const DICTS = { en, gu, hi };
export const LANGS: { id: Lang; label: string; href: string }[] = [
  { id: 'en', label: 'English', href: '/' },
  { id: 'gu', label: 'ગુજરાતી', href: '/gu/' },
  { id: 'hi', label: 'हिन्दी', href: '/hi/' },
];
export const t = (lang: Lang) => DICTS[lang];
