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

## Release

Uses [bumpp](https://github.com/antfu-collective/bumpp) for semver bumps:

```bash
pnpm bump                 # interactive (patch / minor / major)
pnpm version:patch        # 1.1.1 → 1.1.2 + git commit & tag
pnpm release:patch        # bump + publish to npm
```

With 2FA: `pnpm publish --access public --no-git-checks --otp=XXXXXX`

If bumpp fails with `tag 'vX.Y.Z' already exists` (after a partial run):

```bash
git tag -d vX.Y.Z
git tag vX.Y.Z HEAD
```

## License

MIT
