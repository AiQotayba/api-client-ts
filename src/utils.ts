const PROTECTED_HEADER_NAMES = new Set(["authorization", "cookie"]);

/** Strip HTML tags and trim — safe for toast / UI display */
export function sanitizeDisplayMessage(message: string): string {
  return message
    .replace(/<[^>]*>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .trim();
}

export function mergeSafeHeaders(
  target: Record<string, string>,
  source?: Record<string, string>
): void {
  if (!source) return;

  for (const [key, value] of Object.entries(source)) {
    if (!PROTECTED_HEADER_NAMES.has(key.toLowerCase())) {
      target[key] = value;
    }
  }
}

export function serializeSearchParams(
  input: string | URLSearchParams | Record<string, unknown>
): string {
  if (typeof input === "string") {
    return input.startsWith("?") ? input.slice(1) : input;
  }

  if (input instanceof URLSearchParams) {
    return input.toString();
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }
  return params.toString();
}

export async function parseBodyFromResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text) as unknown;
  }

  const text = await response.text();
  if (!text) return null;
  return text;
}

export function isRetryableStatus(status: number): boolean {
  return status === 502 || status === 503 || status === 504 || status === 429;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function linkAbortSignal(
  controller: AbortController,
  external?: AbortSignal | null
): void {
  if (!external) return;
  if (external.aborted) {
    controller.abort();
    return;
  }
  external.addEventListener("abort", () => controller.abort(), { once: true });
}
