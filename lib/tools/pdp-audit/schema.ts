export type PdpAuditInput = {
  productUrl?: string;
  productContext: string;
  targetAudience: string;
  productCategory: string;
  pricePoint: string;
  mainOffer?: string;
};

export type PdpAuditReport = {
  title: string;
  summary: string;
  markdown: string;
  generatedAt: string;
};

export type ValidationResult =
  | { success: true; data: PdpAuditInput }
  | { success: false; errors: Partial<Record<keyof PdpAuditInput, string>> };

const MIN_CONTEXT_LENGTH = 80;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validatePdpAuditInput(input: unknown): ValidationResult {
  const source = input as Partial<Record<keyof PdpAuditInput, unknown>>;
  const productUrl = cleanText(source.productUrl);
  const productContext = cleanText(source.productContext);
  const targetAudience = cleanText(source.targetAudience);
  const productCategory = cleanText(source.productCategory);
  const pricePoint = cleanText(source.pricePoint);
  const mainOffer = cleanText(source.mainOffer);
  const errors: Partial<Record<keyof PdpAuditInput, string>> = {};

  if (productUrl && !isValidHttpUrl(productUrl)) {
    errors.productUrl = "Enter a valid http or https product page URL.";
  }

  if (!productContext) {
    errors.productContext =
      "Paste the product page copy, screenshot notes, or product details to audit.";
  } else if (productContext.length < MIN_CONTEXT_LENGTH) {
    errors.productContext =
      "Add more product detail so the audit can be specific. Aim for at least 80 characters.";
  }

  if (!targetAudience) {
    errors.targetAudience = "Describe who this product is for.";
  }

  if (!productCategory) {
    errors.productCategory = "Enter the ecommerce product category.";
  }

  if (!pricePoint) {
    errors.pricePoint = "Enter the price point or price range.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      productUrl: productUrl || undefined,
      productContext,
      targetAudience,
      productCategory,
      pricePoint,
      mainOffer: mainOffer || undefined,
    },
  };
}
