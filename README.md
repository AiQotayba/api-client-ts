# api-client-ts

TypeScript HTTP client for browser apps: configurable `fetch` wrapper with auth headers, timeouts, uploads, and optional toasts.

## Install

```bash
npm install api-client-ts
```

## Usage

```ts
import { createApi, createFetchApi } from "api-client-ts";

const api = createApi({
  baseUrl: "https://api.example.com/v1",
  getToken: () => localStorage.getItem("token"),
  getCsrfToken: () =>
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
  getLang: () => "ar",
  credentials: "include",
  retry: 2,
});

const { data, isError } = await api.get<User[]>("/users", {
  dedupe: true,
  signal: abortController.signal,
  validate: (raw) => {
    if (!Array.isArray(raw)) throw new Error("Invalid shape");
    return raw;
  },
});

const fetchApi = createFetchApi("https://api.example.com/v1");
const res = await fetchApi<User[]>("/users", { token: "..." });
```

## License

MIT
