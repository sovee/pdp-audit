# PDP Audit Tool

Lightweight V1 AI workflow for auditing ecommerce product detail pages.

Route:

```text
/tools/pdp-audit
```

## Local Setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/tools/pdp-audit
```

If port 3000 is busy, Next.js will print the alternate local URL.

## Environment

Required for generation:

```bash
OPENAI_API_KEY=...
```

Optional:

```bash
OPENAI_MODEL=gpt-4o-mini
```

Without `OPENAI_API_KEY`, the page still loads and validates input, but report generation returns a missing-key error.

## Validation

```bash
npm run lint
npm run build
```

There is no persistence, auth, billing, dashboard, or external ecommerce platform integration in V1.
