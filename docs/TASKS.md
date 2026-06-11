# TASKS: PDP Audit Tool V1

## Phase 1: Create Route

- [ ] Create `app/tools/pdp-audit/page.tsx`.
- [ ] Add tool title: `PDP Audit Tool`.
- [ ] Add build URL positioning: `qingsu.xyz/tools/pdp-audit`.
- [ ] Add CTA: `Comment “PDP”`.
- [ ] Match qingsu.xyz design style.

## Phase 2: Input Schema

- [ ] Create `lib/tools/pdp-audit/schema.ts`.
- [ ] Define input type.
- [ ] Add fields for: Product page URL, or pasted page copy/screenshots/product info, target audience, product category, price point, and optional main offer.
- [ ] Add validation.
- [ ] Add useful error messages.

## Phase 3: Input Form

- [ ] Create form component.
- [ ] Add required fields.
- [ ] Add optional context field.
- [ ] Add placeholders.
- [ ] Add loading state.
- [ ] Add submit button.
- [ ] Show validation errors.

## Phase 4: AI Prompt

- [ ] Create `lib/ai/prompts/pdp-audit.ts`.
- [ ] Add system prompt.
- [ ] Include target user: Shopify founders, CRO teams, ecommerce marketers, and DTC operators.
- [ ] Include problem: Product pages often fail because they do not match the customer buying reason..
- [ ] Include required output: Above-the-fold audit, offer clarity audit, trust proof gaps, objection gaps, conversion risks, better headlines, and improved section structure..
- [ ] Add no-fabrication rule.
- [ ] Add markdown structure.

## Phase 5: Generate Function

- [ ] Create `lib/tools/pdp-audit/generate-report.ts`.
- [ ] Validate input.
- [ ] Build prompt.
- [ ] Call LLM server-side.
- [ ] Return markdown report.
- [ ] Handle generation errors.
- [ ] Prevent empty output.

## Phase 6: Server Action/API

- [ ] Create server action or route.
- [ ] Receive input.
- [ ] Call generate function.
- [ ] Return report.
- [ ] Keep API key server-side.

## Phase 7: Report Renderer

- [ ] Create report component.
- [ ] Render markdown sections.
- [ ] Add copy markdown button.
- [ ] Add download markdown button.
- [ ] Show generated timestamp.
- [ ] Make it screenshot-friendly.

## Phase 8: Export

- [ ] Implement copy to clipboard.
- [ ] Implement download `.md`.
- [ ] Use filename `pdp-audit-report-YYYY-MM-DD.md`.
- [ ] Preserve markdown format.

## Phase 9: Demo and Validation

- [ ] Add one demo input.
- [ ] Run one real example.
- [ ] Improve prompt quality.
- [ ] Take screenshot.
- [ ] Prepare X post with CTA `Comment “PDP”`.

## Phase 10: QA

- [ ] Page loads.
- [ ] Form validates.
- [ ] Generate works.
- [ ] Output is specific and useful.
- [ ] Copy works.
- [ ] Download works.
- [ ] No out-of-scope features added.
- [ ] Tool is ready for 7-day validation.
