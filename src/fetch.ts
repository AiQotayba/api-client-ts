import { mergeSafeHeaders, parseBodyFromResponse } from "./utils.js";

export type FetchApiOptions = RequestInit & { token?: string };

export type FetchApiResult<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/** Simple fetch helper for BeePlay `{ success, data, message }` responses */
export function createFetchApi(baseUrl: string, fetchImpl?: typeof fetch) {
  return async function api<T>(
    path: string,
    options?: FetchApiOptions
  ): Promise<FetchApiResult<T>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options?.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    mergeSafeHeaders(headers, options?.headers as Record<string, string> | undefined);

    const fetchFn =
      fetchImpl ?? (typeof fetch !== "undefined" ? fetch : undefined);
    if (!fetchFn) {
      throw new Error(
        "Fetch implementation missing. Pass fetchImpl as the second argument."
      );
    }

    const res = await fetchFn(`${baseUrl}${path}`, {
      ...options,
      headers,
      credentials: options?.credentials ?? "include",
    });

    const body = await parseBodyFromResponse(res);
    if (body === null) {
      return {
        success: res.ok,
        message: res.ok ? "" : "Empty response",
      };
    }

    return body as FetchApiResult<T>;
  };
}
