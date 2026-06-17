import { generateText } from "@/lib/ai/client";
import {
  PDP_AUDIT_SYSTEM_PROMPT,
  buildPdpAuditUserPrompt,
} from "@/lib/ai/prompts/pdp-audit";
import {
  type PdpAuditPageContext,
  type PdpAuditReport,
  validatePdpAuditInput,
} from "@/lib/tools/pdp-audit/schema";

const MAX_HTML_CHARS = 350_000;
const MAX_PAGE_TEXT_CHARS = 12_000;
const MIN_PAGE_TEXT_CHARS = 300;

export async function generatePdpAuditReport(input: unknown): Promise<PdpAuditReport> {
  const validation = validatePdpAuditInput(input);

  if (!validation.success) {
    throw new Error(
      Object.values(validation.errors).filter(Boolean).join(" ") ||
        "The PDP audit input is incomplete.",
    );
  }

  const pageContext = await fetchPdpPageContext(validation.data.productUrl);
  const markdown = await generateText({
    messages: [
      { role: "system", content: PDP_AUDIT_SYSTEM_PROMPT },
      { role: "user", content: buildPdpAuditUserPrompt(pageContext) },
    ],
  });

  if (!markdown.trim()) {
    throw new Error("The generated PDP audit report was empty.");
  }

  return {
    title: "PDP Audit Report",
    summary:
      "AI-generated audit covering above-the-fold clarity, offer strength, trust proof, objections, conversion risks, headlines, and PDP structure.",
    markdown,
    generatedAt: new Date().toISOString(),
  };
}

async function fetchPdpPageContext(productUrl: string): Promise<PdpAuditPageContext> {
  let response: Response;

  try {
    response = await fetch(productUrl, {
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent":
          "Mozilla/5.0 (compatible; PDPAuditTool/1.0; +https://qingsu.xyz/tools/pdp-audit)",
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new Error(
      "Could not read that product page. Check the URL or try a publicly accessible PDP.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `Could not read that product page. The page returned HTTP ${response.status}.`,
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    throw new Error("That URL did not return an HTML product page.");
  }

  const html = (await response.text()).slice(0, MAX_HTML_CHARS);
  const pageContext = extractPageContext(productUrl, html);

  if (pageContext.pageText.length < MIN_PAGE_TEXT_CHARS) {
    throw new Error(
      "The page did not expose enough readable product content to audit. Try another public product page URL.",
    );
  }

  return pageContext;
}

function extractPageContext(productUrl: string, html: string): PdpAuditPageContext {
  const pageTitle = extractFirstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription = extractFirstMatch(
    html,
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
  );
  const jsonLdText = extractJsonLdText(html);
  const visibleText = htmlToVisibleText(html);
  const pageText = normalizeWhitespace(`${jsonLdText} ${visibleText}`).slice(
    0,
    MAX_PAGE_TEXT_CHARS,
  );

  return {
    productUrl,
    pageTitle: pageTitle ? decodeHtmlEntities(pageTitle) : undefined,
    metaDescription: metaDescription
      ? decodeHtmlEntities(metaDescription)
      : undefined,
    pageText,
  };
}

function extractFirstMatch(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim();
}

function extractJsonLdText(html: string) {
  const matches = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );

  return Array.from(matches)
    .map((match) => match[1])
    .join(" ");
}

function htmlToVisibleText(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
