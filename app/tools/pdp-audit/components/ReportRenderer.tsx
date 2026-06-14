"use client";

import type { PdpAuditReport } from "@/lib/tools/pdp-audit/schema";

type ReportRendererProps = {
  report: PdpAuditReport | null;
};

function markdownToBlocks(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <span key={index}>{part}</span>;
  });
}

function renderBlock(block: string, index: number) {
  if (block.startsWith("# ")) {
    return (
      <h1 key={index} className="text-3xl font-semibold tracking-normal text-stone-950">
        {block.replace(/^# /, "")}
      </h1>
    );
  }

  if (block.startsWith("## ")) {
    return (
      <h2
        key={index}
        className="border-t border-stone-200 pt-6 text-xl font-semibold tracking-normal text-stone-950"
      >
        {block.replace(/^## /, "")}
      </h2>
    );
  }

  if (block.includes("\n|") || block.startsWith("|")) {
    const rows = block
      .split("\n")
      .filter((row) => row.trim().startsWith("|"))
      .filter((row) => !/^\|\s*:?-+/.test(row.trim()));

    return (
      <div key={index} className="overflow-x-auto rounded-md border border-stone-200">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <tbody>
            {rows.map((row, rowIndex) => {
              const cells = row
                .split("|")
                .slice(1, -1)
                .map((cell) => cell.trim());
              const Cell = rowIndex === 0 ? "th" : "td";

              return (
                <tr key={row} className="border-b border-stone-200 last:border-b-0">
                  {cells.map((cell) => (
                    <Cell
                      key={cell}
                      className="align-top px-4 py-3 first:font-medium"
                    >
                      {renderInline(cell)}
                    </Cell>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.match(/^[-*] /m) || block.match(/^\d+\. /m)) {
    const lines = block.split("\n").filter(Boolean);
    const ordered = lines.every((line) => /^\d+\. /.test(line));
    const List = ordered ? "ol" : "ul";

    return (
      <List
        key={index}
        className={`space-y-2 pl-5 text-sm leading-6 text-stone-700 ${
          ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {lines.map((line) => (
          <li key={line}>{renderInline(line.replace(/^[-*] |\d+\. /, ""))}</li>
        ))}
      </List>
    );
  }

  return (
    <p key={index} className="text-sm leading-6 text-stone-700">
      {block.split("\n").map((line, lineIndex) => (
        <span key={line}>
          {lineIndex > 0 ? <br /> : null}
          {renderInline(line)}
        </span>
      ))}
    </p>
  );
}

function reportFilename() {
  return `pdp-audit-report-${new Date().toISOString().slice(0, 10)}.md`;
}

export function ReportRenderer({ report }: ReportRendererProps) {
  if (!report) {
    return (
      <section className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-6">
        <p className="text-sm font-medium text-stone-900">Report output</p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Your markdown audit will appear here with scores, conversion risks,
          headline options, and a revised PDP section structure.
        </p>
      </section>
    );
  }

  async function copyMarkdown() {
    if (!report) return;
    await navigator.clipboard.writeText(report.markdown);
  }

  function downloadMarkdown() {
    if (!report) return;
    const blob = new Blob([report.markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = reportFilename();
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone-950">{report.title}</p>
          <p className="mt-1 font-mono text-xs text-stone-500">
            Generated {new Date(report.generatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyMarkdown}
            className="rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
          >
            Copy markdown
          </button>
          <button
            type="button"
            onClick={downloadMarkdown}
            className="rounded-md bg-stone-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Download .md
          </button>
        </div>
      </div>

      <article className="mt-6 space-y-5">
        {markdownToBlocks(report.markdown).map(renderBlock)}
      </article>
    </section>
  );
}
