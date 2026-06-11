# TECH_SPEC: PDP Audit Tool V1

## 1. System Overview

PDP Audit Tool V1 is a lightweight AI workflow tool under:

```text
qingsu.xyz/tools/pdp-audit
```

It accepts manual input, validates it, sends it to a tool-specific AI prompt, and returns a structured markdown report.

## 2. Recommended Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui optional
- Server Actions or API routes
- OpenAI or compatible LLM provider
- Markdown rendering
- Browser-side copy/download export
- Password gate or no auth for MVP

## 3. Architecture

```text
Tool page
→ Input form
→ Validation
→ Server action/API route
→ Prompt builder
→ LLM call
→ Markdown report
→ Report renderer
→ Copy/download export
```

## 4. Folder Structure

Recommended inside `qingsu.xyz`:

```text
app/tools/pdp-audit/page.tsx
app/tools/pdp-audit/actions.ts
app/tools/pdp-audit/components/
lib/ai/client.ts
lib/ai/prompts/pdp-audit.ts
lib/tools/pdp-audit/schema.ts
lib/tools/pdp-audit/generate-report.ts
docs/tools/pdp-audit/PRD.md
docs/tools/pdp-audit/TECH_SPEC.md
docs/tools/pdp-audit/TASKS.md
docs/tools/pdp-audit/AI_CONTEXT.md
```

## 5. Input Schema

V1 input:

```text
Product page URL, or pasted page copy/screenshots/product info, target audience, product category, price point, and optional main offer.
```

Use TypeScript types and optional Zod validation if available.

Minimum type:

```ts
export type ToolInput = {
  context?: string;
};
```

Add tool-specific fields based on the V1 input list.

## 6. Output Schema

Return markdown first.

```ts
export type ToolReport = {
  title: string;
  summary: string;
  markdown: string;
  generatedAt: string;
};
```

## 7. Prompt Design

Prompt must include:

- Tool role
- Target user
- User problem
- Input data
- Required report structure
- No-fabrication rule
- Actionable next-step requirement

Output should generate:

```text
Above-the-fold audit, offer clarity audit, trust proof gaps, objection gaps, conversion risks, better headlines, and improved section structure.
```

## 8. UI Design

Page sections:

1. Tool title
2. Short promise
3. Input form
4. Generate button
5. Loading state
6. Markdown report
7. Copy markdown button
8. Download markdown button
9. CTA: Comment “PDP”

## 9. Export Design

V1 exports:

- Copy markdown
- Download `.md`

Optional for this tool if relevant:

- Download `.csv`

Filename pattern:

```text
pdp-audit-report-YYYY-MM-DD.md
```

## 10. Error Handling

Handle:

- Missing required input
- Invalid number
- Invalid URL
- AI generation failure
- Empty output
- Export failure

Do not crash the page.

## 11. Security and Cost Control

- Keep API keys server-side.
- Do not expose provider keys in client code.
- Add password gate if public.
- Add basic rate limiting later if needed.
- Do not save user input in V1 unless explicitly requested.
- Use reasonable token limits.

## 12. Implementation Rules

Build only:

```text
URL/content input, target audience input, score by section, export report.
```

Do not build:

```text
Full crawler, heatmap, GA4 integration, A/B testing.
```

Do not add billing, workspace, saved history, external API integrations, or full SaaS architecture.
