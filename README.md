# api-client-ts

A modern, lightweight HTTP client built on top of the Fetch API.

`api-client-ts` keeps the native Fetch experience while removing the repetitive code every application eventually needs—authentication, retries, request deduplication, timeouts, validation, uploads, and consistent error handling.

Unlike Axios, it doesn't replace Fetch—it enhances it.

## Why api-client-ts?

Every project starts with something like this:

```ts
const token = localStorage.getItem("token");

const response = await fetch("/users?page=1", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Accept-Language": "en",
    "Content-Type": "application/json",
  },
});

if (!response.ok) {
  throw new Error("Request failed");
}

const users = await response.json();
```

Then your project grows...

- Authentication
- CSRF
- Timeouts
- Retries
- AbortController
- Error parsing
- Toast notifications
- Query parameters
- File uploads
- Validation
- Duplicate request prevention

Soon every request looks different.

`api-client-ts` centralizes all of that into one reusable client.

```ts
const { data } = await api.get<User[]>("/users", {
    params: { page: 1 },
});
```

No repeated headers.

No repeated fetch configuration.

No repeated error handling.

Just your business logic.

---

# Features

✅ Built on the native Fetch API

✅ Fully typed with TypeScript

✅ Authentication (Bearer / CSRF)

✅ Automatic retries

✅ Request timeout

✅ Request deduplication

✅ Runtime validation

✅ File uploads

✅ Global error handling

✅ Optional toast notifications

✅ AbortController support

✅ Small bundle size

---

# Why not Axios?

| Feature | Fetch | Axios | api-client-ts |
|---------|------|-------|---------------|
| Native Fetch | ✅ | ❌ | ✅ |
| TypeScript-first | ⚠️ | ✅ | ✅ |
| Authentication helpers | ❌ | ⚠️ | ✅ |
| Retry | ❌ | Plugin | ✅ |
| Request deduplication | ❌ | ❌ | ✅ |
| Runtime validation | ❌ | ❌ | ✅ |
| Toast integration | ❌ | ❌ | ✅ |
| File uploads | ⚠️ | ✅ | ✅ |
| Zero dependencies | ✅ | ❌ | ✅ |

---

# Philosophy

Instead of replacing Fetch with another HTTP library, `api-client-ts` embraces the Web Platform.

You keep the browser's native API while gaining the developer experience expected from modern applications.

Think of it as:

> **Fetch++, not Fetch replacement.**