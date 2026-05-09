# Replyr

**AI lead-response agent for US home services contractors.**
Replyr replies to website leads in 30 seconds — qualifies them, answers FAQs, and books appointments straight to Google Calendar. Built for HVAC, plumbing, roofing, electrical, and more.

> See [MARKETING.md](./MARKETING.md) for the go-to-market playbook.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (new-york) |
| Database / Auth | Supabase (Postgres + RLS + Realtime) |
| AI / LLM | Provider-agnostic layer — Google Gemini default, Anthropic Claude swappable |
| Payments | Stripe (subscription + customer portal + webhooks) |
| Calendar | Google Calendar API (OAuth + event creation) |
| Email | Resend (inbound webhook + outbound API) |
| Hosting | Vercel |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  Customer (homeowner)                                               │
│   └─ Visits acme-plumbing.com                                       │
│       └─ Clicks chat bubble (loaded via widget.js)                  │
│           └─ Sends message via /widget/[apiKey]                     │
│               └─ POST /api/widget/submit                            │
│                   └─ Service-role Supabase: create lead/conv/msg    │
│                   └─ generateAgentReply() → LLM provider            │
│                   └─ extractBookingIntent() (post-reply)            │
│                   └─ bookAppointment() → Google Calendar API        │
│                   └─ Customer sees AI reply in chat                 │
│                                                                     │
│  Contractor (paying customer)                                       │
│   └─ /signup → /onboarding → /(dashboard)/leads                     │
│       └─ Sees lead live (Supabase Realtime channel)                 │
│       └─ Reads conversation in side drawer                          │
│       └─ Manages subscription via Stripe Customer Portal            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Local dev

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
#          SUPABASE_SERVICE_ROLE_KEY, GOOGLE_API_KEY (Gemini), LLM_PROVIDER=google,
#          NEXT_PUBLIC_APP_URL=http://localhost:3000

# 3. Apply database migrations
# Open Supabase Studio → SQL Editor → run in order:
#   - supabase/migrations/0001_initial_schema.sql
#   - supabase/migrations/0002_realtime.sql

# 4. Run
npm run dev
```

Open http://localhost:3000.

---

## Project structure

```
app/
  (marketing)/        public landing, pricing, legal pages
  (auth)/             login, signup, logout
  (dashboard)/        leads, appointments, settings (proxy-protected)
  onboarding/         post-signup business setup
  widget/[key]/       customer-facing chat widget (iframed)
  api/
    widget/           submit + message endpoints (CORS open)
    auth/             Google Calendar OAuth flow
    billing/          Stripe checkout + portal
    webhooks/         Stripe + email inbound

components/
  ui/                 shadcn primitives + custom (gradient-blur, stat-card, …)
  dashboard/          dashboard-specific (top-nav)

lib/
  supabase/           server, client, service-role, middleware factory
  llm/                provider abstraction (anthropic + google)
  agent/              respond, extract-booking, book-appointment
  stripe.ts           Stripe SDK singleton
  google-calendar.ts  OAuth + Calendar API (no SDK, raw fetch)
  email.ts            Resend outbound + inbound address builder

supabase/migrations/  SQL migrations (apply via Studio)
public/widget.js      embeddable launcher script (the "chat bubble")
types/database.ts     hand-written DB types

proxy.ts              Next.js 16 proxy (was middleware) — auth gates
```

---

## Environment variables

See [.env.example](./.env.example) for the full list. Required for the core flow:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LLM_PROVIDER` (`google` or `anthropic`)
- `GOOGLE_API_KEY` (or `ANTHROPIC_API_KEY`)
- `NEXT_PUBLIC_APP_URL`

Optional (enable additional features):

- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`
- Google Calendar OAuth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- Email ingestion: `RESEND_API_KEY`, `NEXT_PUBLIC_INBOUND_EMAIL_DOMAIN`, `INBOUND_EMAIL_WEBHOOK_SECRET`

---

## Useful commands

```bash
npm run dev            # local dev server
npm run build          # production build (verifies TypeScript)
npm run lint           # ESLint
npm run format         # Prettier
npm run test:llm       # smoke test for LLM provider abstraction
```

---

## Deploying

1. Push this repo to GitHub
2. Import in Vercel → framework auto-detected as Next.js
3. Set all required env vars (above)
4. Deploy
5. After first deploy, update `NEXT_PUBLIC_APP_URL` to your Vercel URL → redeploy
6. Supabase Studio → Authentication → URL Configuration → add your Vercel URL to **Site URL** and **Redirect URLs**

For full integration setup (Stripe, Google Calendar, Resend), see [MARKETING.md](./MARKETING.md) and the inline comments in [.env.example](./.env.example).

---

## License

Proprietary. Don't redistribute.
