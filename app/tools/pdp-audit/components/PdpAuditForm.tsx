"use client";

import { useState, useTransition } from "react";
import { generatePdpAuditAction } from "@/app/tools/pdp-audit/actions";
import type {
  PdpAuditInput,
  PdpAuditReport,
} from "@/lib/tools/pdp-audit/schema";

type PdpAuditFormProps = {
  onReport: (report: PdpAuditReport) => void;
};

const initialInput: PdpAuditInput = {
  productUrl: "",
};

export function PdpAuditForm({ onReport }: PdpAuditFormProps) {
  const [input, setInput] = useState<PdpAuditInput>(initialInput);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField(field: keyof PdpAuditInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");

    startTransition(async () => {
      const result = await generatePdpAuditAction(input);

      if (result.ok) {
        setErrors({});
        setFormMessage("");
        onReport(result.report);
        return;
      }

      setErrors(result.errors || {});
      setFormMessage(result.message);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="border-b border-stone-200 pb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-normal text-stone-950">
            Product page link
          </h2>
          <p className="mt-1 text-sm leading-6 text-stone-600">
            Paste a public PDP URL. The tool reads the page and generates the audit.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Product page URL" error={errors.productUrl}>
          <input
            type="url"
            value={input.productUrl}
            onChange={(event) => updateField("productUrl", event.target.value)}
            placeholder="https://yourstore.com/products/example"
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white"
          />
        </Field>
      </div>

      {formMessage ? (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {formMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-md bg-stone-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isPending ? "Reading page and generating audit..." : "Generate PDP audit"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-sm font-medium text-stone-900">
        {label}
        <span className="font-normal text-stone-500">
          {optional ? "Optional" : "Required"}
        </span>
      </span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-2 block text-sm text-red-700">{error}</span> : null}
    </label>
  );
}
