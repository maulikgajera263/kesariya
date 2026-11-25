# Kesariya Catering website

Pure-veg catering and event décor, Surat. Owner: Bharatbhai Gajera, +91 87585 38259.

The site is built around a Gujarati thali: the menu is a brass plate that visitors fill ("Build your thali"), and the filled plate goes to Bharatbhai with their inquiry or WhatsApp message. It is available in English (`/`), Gujarati (`/gu/`) and Hindi (`/hi/`).

## Run it

Needs Node.js 22.23 or newer.

```bash
npm install
cp .env.example .env        # then set ADMIN_PASSWORD and SESSION_SECRET
npm run dev                 # development: http://localhost:4321
```

Production:

```bash
npm run build
ADMIN_PASSWORD=... SESSION_SECRET=... npm start    # serves on PORT (default 4321)
```

- **Website:** `/`, `/gu/`, `/hi/`
- **Owner portal:** `/admin` (log in with `ADMIN_PASSWORD`)

## Environment variables

| Name | Needed | What it does |
|---|---|---|
| `ADMIN_PASSWORD` | yes, for the portal | Password for `/admin`. At least 8 characters. Without it, the portal stays locked. |
| `SESSION_SECRET` | recommended | Long random string used to sign login sessions. |
| `DATA_DIR` | no | Folder for `leads.json`. Default: `./data`. |
| `PORT`, `HOST` | no | Where the production server listens. |

## Where things live

| Path | What |
|---|---|
| `src/components/Home.astro` | The home page: all sections, the thali builder and the inquiry form |
| `src/components/Thali.astro` | The drawn brass thali (SVG) |
| `src/data/menu.ts` | Dishes, counters and décor themes, in all three languages |
| `src/data/site.ts` | Phone, WhatsApp, address, occasions, areas |
| `src/data/reviews.ts` | Client reviews (real, kept in the clients' own words) |
| `src/i18n/` | Page text in English, Gujarati and Hindi |
| `src/lib/store.ts` | Lead storage. The only file to change when moving to a hosted database |
| `src/pages/api/inquiries/` | Inquiry API (posting is public; reading and changing need login) |
| `src/pages/admin/` | Owner portal: login, inquiries list, CSV export |
| `PRODUCT.md`, `DESIGN.md` | Product facts and the design system |

## Before launch

- **Photos:** the décor section has marked slots ("Photo of a real Kesariya setup coming soon"). Replace them with real event photos. A real overhead photo of a Kesariya thali can also replace or sit beside the drawn one.
- **Translations:** the Gujarati and Hindi text was drafted by Claude and needs checking by a native speaker (`src/i18n/gu.ts`, `src/i18n/hi.ts`, and the `gu`/`hi` names in `src/data/menu.ts`).
- **Hosting:** inquiries are saved to `data/leads.json`. That works on any server with a disk (VPS, Render, Railway). Serverless hosts such as Vercel or Netlify need `src/lib/store.ts` moved to a database first.
- `data/leads.json` holds customer details and is not committed to git. Back it up on the server.
