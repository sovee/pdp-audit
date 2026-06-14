type ChatMessage = {
  role: "system" | "user";
  content: string;
};

type GenerateTextOptions = {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export async function generateText({
  messages,
  temperature = 0.35,
  maxTokens = 2400,
}: GenerateTextOptions) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY server environment variable.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  const payload = (await response.json()) as ChatCompletionResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || "AI generation request failed.");
  }

  const text = payload.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("AI generation returned an empty report.");
  }

  return text;
}
