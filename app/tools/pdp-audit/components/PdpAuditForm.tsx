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

const demoInput: PdpAuditInput = {
  productUrl: "https://example.com/products/hydration-serum",
  productContext:
    "Hero headline: Hydration Serum for Daily Glow. Subhead says lightweight formula with hyaluronic acid, niacinamide, and aloe for dry and dull skin. Product page shows product photo, $38 price, 15% off subscribe and save, ingredient list, 4.8 star reviews, free shipping over $50, and a 30-day return policy. Main sections include benefits, how to use, ingredients, reviews, and FAQ. Current page does not clearly explain who should buy it, when results should be expected, or why this serum is different from cheaper drugstore alternatives.",
  targetAudience:
    "Women 25-40 with dry or dull skin who buy skincare from Instagram ads and want a simple morning routine.",
  productCategory: "Skincare serum",
  pricePoint: "$38",
  mainOffer: "15% off subscribe and save, free shipping over $50",
};

const initialInput: PdpAuditInput = {
  productUrl: "",
  productContext: "",
  targetAudience: "",
  productCategory: "",
  pricePoint: "",
  mainOffer: "",
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

  function fillDemo() {
    setInput(demoInput);
    setErrors({});
    setFormMessage("");
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
      <div className="flex flex-col gap-3 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-normal text-stone-950">
            PDP inputs
          </h2>
          <p className="mt-1 text-sm leading-6 text-stone-600">
            Paste what you know. The tool audits only the information provided.
          </p>
        </div>
        <button
          type="button"
          onClick={fillDemo}
          className="w-fit rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100"
        >
          Fill demo input
        </button>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Product page URL" error={errors.productUrl} optional>
          <input
            value={input.productUrl}
            onChange={(event) => updateField("productUrl", event.target.value)}
            placeholder="https://yourstore.com/products/example"
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white"
          />
        </Field>

        <Field
          label="Page copy, screenshot notes, or product info"
          error={errors.productContext}
        >
          <textarea
            value={input.productContext}
            onChange={(event) =>
              updateField("productContext", event.target.value)
            }
            rows={8}
            placeholder="Paste hero copy, product description, offer, reviews, sections, screenshot notes, FAQs, guarantees, shipping, or anything visible on the PDP."
            className="w-full resize-y rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm leading-6 text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white"
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Target audience" error={errors.targetAudience}>
            <input
              value={input.targetAudience}
              onChange={(event) =>
                updateField("targetAudience", event.target.value)
              }
              placeholder="Busy moms buying from Meta ads"
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white"
            />
          </Field>

          <Field label="Product category" error={errors.productCategory}>
            <input
              value={input.productCategory}
              onChange={(event) =>
                updateField("productCategory", event.target.value)
              }
              placeholder="Skincare, supplements, apparel"
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white"
            />
          </Field>

          <Field label="Price point" error={errors.pricePoint}>
            <input
              value={input.pricePoint}
              onChange={(event) => updateField("pricePoint", event.target.value)}
              placeholder="$49, $80-$120, premium"
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:bg-white"
            />
          </Field>
        </div>

        <Field label="Main offer" error={errors.mainOffer} optional>
          <input
            value={input.mainOffer}
            onChange={(event) => updateField("mainOffer", event.target.value)}
            placeholder="Bundle discount, subscribe and save, free shipping, guarantee"
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
        {isPending ? "Generating audit..." : "Generate PDP audit"}
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
