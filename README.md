# Simply Cucumber — Netlify + Next.js Starter

**Stack**: Next.js (App Router) • TypeScript • Tailwind CSS • Netlify Functions • Stripe Checkout

## Quick Start

```bash
# 1) Clone
git clone <your-repo-url> simply-cucumber && cd simply-cucumber

# 2) Install
npm i

# 3) Env
cp .env.example .env
# Put your STRIPE_SECRET_KEY and STRIPE_PRICE_ID_* values

# 4) Dev (use Netlify Dev to run the function locally)
npm run dev
# in another terminal:
npx netlify-cli dev
```

Open http://localhost:3000 and click **Buy now**. Netlify Dev will serve the Stripe function at
`/.netlify/functions/create-checkout` and the Next.js API route will proxy to it.

## Deploy to Netlify

1. Push this folder to **GitHub**.
2. In **Netlify**, create a new site from Git and connect the repo.
3. Build command: `npm run build` · Publish directory: `.next`
4. Add environment variables in Netlify UI:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID_SAMPLE`
   - (`STRIPE_PRICE_ID_TONER`, `STRIPE_PRICE_ID_MASK` as needed)
   - `SITE_URL` → your site URL
5. Redeploy. You’re live.

## Customize

- Edit colors/fonts in `tailwind.config.js` and `/styles/globals.css`.
- Update products in `app/page.tsx` and `app/products/page.tsx`.
- Replace `public/logo.svg` with your brand mark.
- Add CMS later (e.g., Netlify CMS / Contentful) if needed.

## Notes

- Cart is single‑item instant checkout for speed. We can add a full cart later.
- If you prefer to **avoid Stripe**, swap the function to link to another checkout.
- SEO: add Open Graph and metadata in `app/layout.tsx`.
```

**Built for LXP — “Dark Harlem Knight” → “Simply Cucumber”.**
