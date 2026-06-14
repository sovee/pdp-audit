"use server";

import { generatePdpAuditReport } from "@/lib/tools/pdp-audit/generate-report";
import { validatePdpAuditInput } from "@/lib/tools/pdp-audit/schema";

export type GeneratePdpAuditState =
  | {
      ok: true;
      report: Awaited<ReturnType<typeof generatePdpAuditReport>>;
    }
  | {
      ok: false;
      errors?: Record<string, string>;
      message: string;
    };

export async function generatePdpAuditAction(
  input: unknown,
): Promise<GeneratePdpAuditState> {
  const validation = validatePdpAuditInput(input);

  if (!validation.success) {
    return {
      ok: false,
      errors: validation.errors,
      message: "Fix the highlighted fields before generating the audit.",
    };
  }

  try {
    const report = await generatePdpAuditReport(validation.data);
    return { ok: true, report };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not generate the PDP audit report.",
    };
  }
}
