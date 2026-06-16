import type { Metadata } from "next";
import { PdpAuditTool } from "@/app/tools/pdp-audit/components/PdpAuditTool";

export const metadata: Metadata = {
  title: "PDP Audit Tool | QingSu Growth Tools",
  description:
    "Generate a practical PDP audit for ecommerce product pages from manual page inputs.",
};

export default function PdpAuditPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
              qingsu.xyz/tools/pdp-audit
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-stone-950 sm:text-5xl">
              PDP Audit Tool
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              Turn messy product page notes into a clear conversion audit:
              above-the-fold clarity, offer strength, trust proof, objections,
              conversion risks, headline options, and section structure.
            </p>
          </div>
        </section>

        <PdpAuditTool />
      </div>
    </main>
  );
}
