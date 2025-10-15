// src/api/client.js
const DEFAULT_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Simple fetch wrapper for JSON APIs.
 * - path: string (e.g. "/blogs" or "blogs")
 * - options: { method, body, signal, headers }
 */
export async function apiFetch(path = "/", { method = "GET", body = null, signal = undefined, headers = {} } = {}) {
  const base = DEFAULT_BASE.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${p}`;

  const opts = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    signal,
  };

  if (body != null) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);

  // try to parse JSON if possible
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text().catch(() => "");

  if (!res.ok) {
    const err = new Error(`API error ${res.status}: ${res.statusText}`);
    err.status = res.status;
    // attempt parse JSON body if applicable
    try {
      err.body = JSON.parse(text);
    } catch {
      err.body = text;
    }
    throw err;
  }

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  return text;
}
export default apiFetch;
