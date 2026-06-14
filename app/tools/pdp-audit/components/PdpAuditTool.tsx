"use client";

import { useState } from "react";
import { PdpAuditForm } from "@/app/tools/pdp-audit/components/PdpAuditForm";
import { ReportRenderer } from "@/app/tools/pdp-audit/components/ReportRenderer";
import type { PdpAuditReport } from "@/lib/tools/pdp-audit/schema";

export function PdpAuditTool() {
  const [report, setReport] = useState<PdpAuditReport | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <PdpAuditForm onReport={setReport} />
      <ReportRenderer report={report} />
    </div>
  );
}
