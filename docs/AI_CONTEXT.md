# AI_CONTEXT: PDP Audit Tool V1

## Product Summary

PDP Audit Tool is part of QingSu Growth Tools, a 30-day tool/content validation system for ecommerce and ads operators.

Build URL:

```text
qingsu.xyz/tools/pdp-audit
```

CTA:

```text
Comment “PDP”
```

## What This Product Is

A narrow AI workflow MVP for:

```text
Shopify founders, CRO teams, ecommerce marketers, and DTC operators
```

It solves:

```text
Product pages often fail because they do not match the customer buying reason.
```

It takes:

```text
Product page URL, or pasted page copy/screenshots/product info, target audience, product category, price point, and optional main offer.
```

It outputs:

```text
Above-the-fold audit, offer clarity audit, trust proof gaps, objection gaps, conversion risks, better headlines, and improved section structure.
```

## What This Product Is Not

Do not build:

```text
Full crawler, heatmap, GA4 integration, A/B testing.
```

Also do not build:

- Billing
- Workspace
- Saved history
- Team accounts
- Complex dashboard
- API integrations
- Full SaaS architecture

## MVP Philosophy

One clear input.
One valuable output.
One useful workflow.

The goal is validation, not perfection.

## Core Workflow

1. User opens the tool.
2. User enters manual input.
3. User clicks generate.
4. Tool creates a structured markdown report.
5. User copies/downloads the report.
6. Qing uses output as proof-of-work content.
7. Market signal is collected through comments, DMs, and submissions.

## Output Quality Rules

The report must be:

- Specific
- Practical
- Structured
- Actionable
- Written for ecommerce/ads operators
- Easy to screenshot
- Easy to copy

Avoid:

- Generic advice
- Fake certainty
- Invented data
- Claims of accessing APIs
- Unnecessary theory

## Technical Rules

- Use Next.js App Router.
- Keep API keys server-side.
- Use server action or API route.
- Keep V1 stateless unless repo already has persistence.
- Export markdown in browser.
- Do not add saved report library unless requested.

## Validation Plan

Use the 7-day sprint:

- Day 1: Define
- Day 2: Build MVP
- Day 3: Run real example
- Day 4: Post build-in-public
- Day 5: Post insight
- Day 6: Post framework
- Day 7: Collect signal

## Success Signals

Track:

- Likes
- Bookmarks
- Comments
- DMs
- Input submissions
- Pricing questions
- Agency/team interest

## Codex Start Prompt

```text
Read docs/PRD.md, docs/TECH_SPEC.md, docs/TASKS.md, and docs/AI_CONTEXT.md.

Build PDP Audit Tool V1 at app/tools/pdp-audit.

Follow the V1 scope only.
Do not add billing, workspace, saved history, full auth, API integrations, or SaaS architecture.
Start from Phase 1 in TASKS.md.
After each phase, summarize changed files.
```
