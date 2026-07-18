// Central API client for the HomeySpace partner backend.
// Same-origin: nginx proxies /api/v1 -> backend :3071, so no CORS.
// Handles JWT bearer auth + transparent access-token refresh.

const BASE = import.meta.env.VITE_API_BASE || "/api/v1";
const ACCESS_KEY = "hs_partner_access";
const REFRESH_KEY = "hs_partner_refresh";

export const getAccess = () => localStorage.getItem(ACCESS_KEY);
export const getRefresh = () => localStorage.getItem(REFRESH_KEY);

export function setTokens(access, refresh) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}
export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
export const isAuthed = () => !!getAccess();

async function tryRefresh() {
  const refresh = getRefresh();
  if (!refresh) return false;
  try {
    const res = await fetch(BASE + "/auth/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) { clearTokens(); return false; }
    const d = await res.json();
    if (d.access) { setTokens(d.access, null); return true; }
    return false;
  } catch {
    return false;
  }
}

async function request(path, { method = "GET", body, headers = {}, isForm = false, auth = true, _retry = false } = {}) {
  const h = { ...headers };
  if (auth && getAccess()) h["Authorization"] = `Bearer ${getAccess()}`;

  let payload = body;
  if (body != null && !isForm) {
    h["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  const res = await fetch(BASE + path, { method, headers: h, body: payload });

  if (res.status === 401 && auth && !_retry && getRefresh()) {
    const ok = await tryRefresh();
    if (ok) return request(path, { method, body, headers, isForm, auth, _retry: true });
  }

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const msg =
      (data && (data.error?.message || data.detail || (typeof data.error === "string" && data.error) || data.message)) ||
      `Request failed (${res.status})`;
    const err = new Error(typeof msg === "string" ? msg : "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (p, opts) => request(p, { ...opts, method: "GET" }),
  post: (p, body, opts) => request(p, { ...opts, method: "POST", body }),
  put: (p, body, opts) => request(p, { ...opts, method: "PUT", body }),
  patch: (p, body, opts) => request(p, { ...opts, method: "PATCH", body }),
  del: (p, opts) => request(p, { ...opts, method: "DELETE" }),
  // multipart: pass a FormData; default POST, pass {method:'PUT'} for step uploads
  upload: (p, formData, opts = {}) => request(p, { ...opts, method: opts.method || "POST", body: formData, isForm: true }),
};

// Resolve a backend media path to a same-origin URL the browser can load.
export function mediaUrl(u) {
  if (!u) return null;
  if (/^https?:\/\//.test(u)) return u;
  return u.startsWith("/") ? u : "/" + u;
}
