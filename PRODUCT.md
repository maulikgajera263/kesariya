# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated (owner chose "modern framework", hosting not yet decided): Astro with the Node server adapter, so the site runs anywhere Node runs and can move to Vercel/Netlify later. Lead storage sits behind a single storage module (local file/SQLite for now) so it can be swapped for a hosted database (e.g. Supabase) without touching pages. Replaces the current hand-written `server.js` + static HTML.

## Users

1. **Families planning weddings**: parents and couples booking weddings, receptions, sangeet and haldi, often for several hundred guests. They compare caterers, call or WhatsApp the owner directly, and decide as a family.
2. **Jain and Swaminarayan families**: they choose a caterer mainly on whether it can strictly follow their dietary rules (no root vegetables, separate utensils, zero non-veg).
3. **Hosts of birthdays and anniversaries**: smaller home, lawn or banquet events, where decor matters as much as food.
4. **Corporate clients** in Surat, Hazira and Vapi: luncheons, high-teas, launches and annual functions.

Secondary user: **Bharatbhai Gajera (owner)** uses the owner portal to review inquiries, call or WhatsApp leads back, track their status, and export leads to a spreadsheet.

## Product Purpose

Kesariya Catering's website turns event planners in and around Surat into inquiries for the owner. Success means a visitor understands what Kesariya offers, trusts it, and sends an inquiry (form, WhatsApp or call) with enough event detail for Bharatbhai to follow up. The owner portal exists so no inquiry is missed and each one is followed up.

## Positioning

Taken from the current site copy; the owner has not separately confirmed it:
- One house handles both **100% pure-vegetarian food** and **in-house event decor**, so the host deals with one team, not separate caterers and decorators.
- **Strict dietary rules are a core service**, not an add-on: zero non-veg, zero alcohol (soft drinks and mocktails only), with Jain and Swaminarayan kitchen protocols.
- **Founder-led**: Bharatbhai Gajera personally oversees events and is the direct contact.

## Operating Context

- Most inquiries move to **WhatsApp or a phone call** with the owner. The website hands off to WhatsApp with a pre-filled message.
- Events: weddings and receptions, birthdays, anniversaries, corporate functions, across Surat areas (Vesu, VIP Road, Umragam, etc.) plus Hazira and Vapi.
- Visitors mostly browse on phones, often sent a link over WhatsApp.

## Capabilities and Constraints

- Public site: services, food and beverage offering, decor themes, gallery, client reviews, FAQ, inquiry form, WhatsApp/call buttons.
- Inquiry fields used today: name, phone/WhatsApp, email, city/area, event type, date, time slot, guest count, venue status, dietary preference, services, decor theme, budget tier, special notes.
- Owner portal: list, search and filter inquiries; status New / Contacted / Confirmed; call/WhatsApp actions; lead detail; CSV export. **Must require a login**; today it has none.
- Languages: **English, Gujarati, Hindi**, with a language switch. The Gujarati and Hindi text is drafted by Claude and **must be reviewed by a native speaker before launch**.
- **No prices on the site.** Bharatbhai quotes after the inquiry. The old per-guest rates in `app.js` must not be published.
- Owner portal login: **one owner password**, set on the server (environment variable), not in the code.
- Undecided: hosting/deploy target.

## Brand Commitments

- Name: **Kesariya Catering** (from *kesar*, saffron). Founder: **Bharatbhai Gajera**.
- Address: 263, Momai Residency, Umragam, Surat 394130. Phone/WhatsApp: +91 87585 38259.
- Fixed commitments: 100% pure vegetarian (Shuddh Shakahari), zero alcohol.
- The site must read as a **caterer first**: food and feasts lead. Owner rejected stationery/ledger metaphors ("this web page is for caterers").
- Cultural vocabulary already used: *Atithi Devo Bhava*, Shuddh Shakahari, mandap, Rajwada.

## Evidence on Hand

- **Client reviews on the current site are real** (owner confirmed), e.g. Mansukhbhai Patel (25th anniversary, Umragam). Keep the wording and names as given.
- **Photos: the owner will provide real event and food photos.** The current images are Unsplash stock and must be replaced. Until the real ones arrive, use clearly marked placeholders, never stock photos passed off as Kesariya's own events.
- Do not invent: event counts, years in business, awards, client names, prices or certifications. None of these have been supplied.

## Product Principles

1. **Every page leads to a conversation with Bharatbhai.** WhatsApp and call are first-class, never buried.
2. **Dietary trust before luxury.** Pure-veg and Jain/Swaminarayan strictness are stated plainly and early. They are a reason to choose Kesariya, not decoration.
3. **Show real work, not borrowed imagery.** Real photos and real reviews only.
4. **Readable in the visitor's own language.**
5. **The owner never loses a lead.** The portal is fast on a phone, private, and clear about who needs a call back.

## Accessibility & Inclusion

- Mobile-first; must work well on mid-range Android phones over mobile data.
- Gujarati (Gujarati script) and Hindi (Devanagari) need fonts that render those scripts well.
- Many visitors are older family members: readable text sizes, clear contrast, large tap targets.
