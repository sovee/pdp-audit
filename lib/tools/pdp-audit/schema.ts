export type PdpAuditInput = {
  productUrl: string;
};

export type PdpAuditPageContext = {
  productUrl: string;
  pageTitle?: string;
  metaDescription?: string;
  pageText: string;
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

function isPublicHostname(hostname: string) {
  const normalized = hostname.toLowerCase();

  if (
    normalized === "localhost" ||
    normalized.endsWith(".localhost") ||
    normalized === "0.0.0.0" ||
    normalized === "::1"
  ) {
    return false;
  }

  const ipv4Parts = normalized.split(".").map(Number);
  if (
    ipv4Parts.length === 4 &&
    ipv4Parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255)
  ) {
    const [first, second] = ipv4Parts;

    if (
      first === 0 ||
      first === 10 ||
      first === 127 ||
      (first === 169 && second === 254) ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168)
    ) {
      return false;
    }
  }

  return true;
}

export function validatePdpAuditInput(input: unknown): ValidationResult {
  const source = input as Partial<Record<keyof PdpAuditInput, unknown>>;
  const productUrl = cleanText(source.productUrl);
  const errors: Partial<Record<keyof PdpAuditInput, string>> = {};

  if (!productUrl) {
    errors.productUrl = "Paste a product page URL to audit.";
  } else if (!isValidHttpUrl(productUrl)) {
    errors.productUrl = "Enter a valid http or https product page URL.";
  } else if (!isPublicHostname(new URL(productUrl).hostname)) {
    errors.productUrl = "Enter a public product page URL.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      productUrl,
    },
  };
}
