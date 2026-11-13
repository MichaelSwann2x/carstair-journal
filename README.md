# CARSTAIR Pro — Trading Journal

Clean, dark trading journal inspired by LiquidJournal with **Carstair Pro** branding and a toggleable **Liquid Glass** (glassmorphism) design system.

## Features

- **Dashboard** — Hero trade card matching Carstair style, Liquid Score ring, weekly stats, recent trades
- **Journal** — Full trade list with grades, setups, emotions, R-multiples
- **Analytics** — Overview + setup win-rate breakdown
- **Prop Firm** — Multi-account tracker (Apex, Topstep, Lucid Daily style cards)
- **Study Room** — Placeholder for future YouTube notes / boards
- **Liquid Glass toggle** — Frosted glass effect that can be turned on/off (persists in localStorage)
- Dark-first UI matching the uploaded Carstair PnL card aesthetic

## Design System

- Pure black background
- Inter typography
- Blue accent (`#3b82f6`) for primary actions and PnL bars
- Green / red for positive / negative
- Signal-bars logo mark
- Glassmorphism via CSS variables + `backdrop-filter`

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://dash.cloudflare.com) → Create project → Connect Git
3. Select the repository
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/` (or leave default)
5. Deploy

The site is static HTML/CSS/JS — no build step required.

## Local

Just open `index.html` in a browser or serve with any static server:

```bash
npx serve .
```

## Liquid Glass

Click the **Liquid Glass** button in the top bar. The state is saved to `localStorage` under the key `carstair-liquid-glass`.

## Next Steps (easy extensions)

- Connect real trade data (CSV import / Tradovate / TopstepX)
- Persist trades to Cloudflare D1 or localStorage
- Add real candle charts (lightweight-charts)
- Expand Prop Firm rules engine
- Study Room with timestamped YouTube notes

---

Built with Carstair cores · Ready for Cloudflare
