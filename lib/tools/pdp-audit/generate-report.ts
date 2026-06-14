import { generateText } from "@/lib/ai/client";
import {
  PDP_AUDIT_SYSTEM_PROMPT,
  buildPdpAuditUserPrompt,
} from "@/lib/ai/prompts/pdp-audit";
import {
  type PdpAuditReport,
  validatePdpAuditInput,
} from "@/lib/tools/pdp-audit/schema";

export async function generatePdpAuditReport(input: unknown): Promise<PdpAuditReport> {
  const validation = validatePdpAuditInput(input);

  if (!validation.success) {
    throw new Error(
      Object.values(validation.errors).filter(Boolean).join(" ") ||
        "The PDP audit input is incomplete.",
    );
  }

  const markdown = await generateText({
    messages: [
      { role: "system", content: PDP_AUDIT_SYSTEM_PROMPT },
      { role: "user", content: buildPdpAuditUserPrompt(validation.data) },
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
