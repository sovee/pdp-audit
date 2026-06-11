# PRD: PDP Audit Tool V1

## 1. Background

QingSu Growth Tools is a 30-day validation system for small AI tools for ecommerce marketers, media buyers, DTC founders, agencies, and Shopify store owners.

The goal is not to build a perfect SaaS immediately. The goal is to build narrow MVP tools that create real utility and generate market signal through X content, comments, DMs, and user submissions.

Build URL:

```text
qingsu.xyz/tools/pdp-audit
```

Primary CTA:

```text
Comment “PDP”
```

## 2. Problem

Product pages often fail because they do not match the customer buying reason.

The target user needs a simple workflow that converts messy inputs into a clear output and next action.

## 3. Product Goal

Build a lightweight MVP that takes:

```text
Product page URL, or pasted page copy/screenshots/product info, target audience, product category, price point, and optional main offer.
```

and generates:

```text
Above-the-fold audit, offer clarity audit, trust proof gaps, objection gaps, conversion risks, better headlines, and improved section structure.
```

Product framing:

```text
This product is a narrow AI workflow tool for Shopify founders, CRO teams, ecommerce marketers, and DTC operators to solve: Product pages often fail because they do not match the customer buying reason.
```

## 4. Target User

Primary user:

```text
Shopify founders, CRO teams, ecommerce marketers, and DTC operators
```

User pain:

```text
Product pages often fail because they do not match the customer buying reason.
```

User goal:

```text
Input messy ecommerce/ads/product information and receive a clear, structured report they can act on immediately.
```

## 5. Core Use Cases

### Use Case 1: Generate a Report

The user opens the tool, fills in the required inputs, clicks generate, and receives a structured markdown report.

### Use Case 2: Run a Real Demo

Qing runs the tool on a real product/page/campaign case, screenshots the output, and turns the result into proof-of-work content.

### Use Case 3: Run Tool for X Replies/DMs

When someone comments “PDP”, Qing asks for their input, runs the tool, and sends back the report.

### Use Case 4: Export Output

The user copies or downloads the report for internal review, marketing planning, or team discussion.

## 6. Non-Goals

V1 must not include:

```text
Full crawler, heatmap, GA4 integration, A/B testing.
```

Also do not build:

- Billing
- Workspace
- Team accounts
- Complex dashboard
- Saved history
- Full auth
- API integrations unless explicitly required
- Public beta system
- SaaS infrastructure

## 7. MVP Scope

### MVP Must Include

```text
URL/content input, target audience input, score by section, export report.
```

Core modules:

- Tool landing section
- Manual input form
- Input validation
- Prompt builder
- AI generation function
- Markdown report renderer
- Copy markdown
- Download markdown
- Demo-friendly UI

### MVP Should Not Include

- Full database
- Saved reports
- User management
- Billing
- Advanced analytics
- Complex charts
- External API connection
- Multi-step onboarding

### Later Versions May Include

- Public beta auth
- Saved reports
- CSV import/export
- API integrations
- Benchmarking
- Team collaboration
- Billing
- Independent subdomain
- Independent SaaS domain

## 8. User Workflow

1. User opens `qingsu.xyz/tools/pdp-audit`.
2. User reads short tool positioning.
3. User enters required inputs.
4. User optionally enters extra context.
5. User clicks `Generate`.
6. System validates input.
7. System calls the AI generation function.
8. System renders a structured markdown report.
9. User copies or downloads the report.
10. Qing uses examples as build-in-public content.

## 9. Feature Requirements

### 9.1 Input Form

Requirements:

- Clear labels
- Required/optional fields
- Helpful placeholders
- Basic validation
- Generate button
- Loading state

Acceptance criteria:

- User can submit complete input.
- Missing fields show useful errors.
- Valid input reaches the generation function.

### 9.2 Generation Engine

Requirements:

- Tool-specific prompt
- Structured report schema
- Markdown output
- No fabricated metrics
- No fake platform/API access
- Useful recommendations

Acceptance criteria:

- Output is specific to the input.
- Output solves the stated problem.
- Output is actionable and readable.

### 9.3 Report Renderer

Requirements:

- Summary first
- Clear section headings
- Diagnosis/generation details
- Recommended actions
- Copy markdown
- Download markdown

Acceptance criteria:

- Report is easy to read.
- Report is easy to screenshot.
- Report can be copied/exported.

### 9.4 Validation Support

Requirements:

- Clean screenshot-friendly page
- Clear CTA
- Output can become X content
- No unnecessary UI complexity

Acceptance criteria:

- Qing can use the tool for the 7-day validation sprint.
- Qing can run the tool manually for people who comment/DM.

## 10. Data Requirements

V1 can be stateless.

Optional future entities:

- ToolRun
- InputData
- GeneratedReport
- ExportRecord
- UserFeedback

If saved later, store:

- id
- toolName
- inputJson
- outputMarkdown
- createdAt
- validationSource

## 11. Permission / Policy / Risk Requirements

The tool must not pretend to access data it does not have.

Rules:

- Do not invent metrics.
- Do not claim real-time API access.
- Use “likely,” “possible,” and “confidence level” when diagnosing.
- Ask for missing information if input is incomplete.
- Give practical guidance, not guaranteed truth.

## 12. Error Handling

Error types:

- missing_required_input
- invalid_number
- invalid_url
- generation_failed
- empty_output
- export_failed
- unknown_error

Each error should include:

- What happened
- What the user should do next
- Whether to retry or edit input

## 13. Acceptance Criteria

V1 is complete when:

- Tool exists at `qingsu.xyz/tools/pdp-audit`.
- User can enter required inputs.
- User can generate a structured report.
- Report addresses the problem: Product pages often fail because they do not match the customer buying reason.
- User can copy report markdown.
- User can download report markdown.
- UI is screenshot-friendly.
- No out-of-scope features are included.
- Tool is ready for X validation using CTA: `Comment “PDP”`.

## 14. Validation Plan

Use the 7-day validation sprint:

- Day 1: Define tool brief.
- Day 2: Build MVP.
- Day 3: Run real example.
- Day 4: Post build-in-public.
- Day 5: Post insight.
- Day 6: Post framework.
- Day 7: Collect signal and decide next action.

Validation score should track:

- Likes
- Bookmarks
- Meaningful comments
- DMs
- People submitting input
- Pricing questions
- Agency/team interest
