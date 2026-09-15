import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "hygroundd_session";
const duration = 60 * 60 * 8;

function secret() { return process.env.AUTH_SECRET ?? ""; }
function encode(value: string) { return Buffer.from(value).toString("base64url"); }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }

export function credentialsMatch(username: string, password: string) {
  const configuredUsername = process.env.CARD_ADMIN_USERNAME;
  const stored = process.env.CARD_ADMIN_PASSWORD_HASH;
  if (!configuredUsername || !stored || !secret()) return false;
  const [algorithm, salt, expected] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !expected) return false;
  const actual = scryptSync(password, salt, 64).toString("base64url");
  const a = Buffer.from(username), b = Buffer.from(configuredUsername), c = Buffer.from(actual), d = Buffer.from(expected);
  return a.length === b.length && c.length === d.length && timingSafeEqual(a, b) && timingSafeEqual(c, d);
}

export function createSession() {
  const payload = encode(JSON.stringify({ role: "admin", exp: Math.floor(Date.now() / 1000) + duration }));
  return `${payload}.${sign(payload)}`;
}

export function hasValidSession(value?: string) {
  if (!value || !secret()) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const a = Buffer.from(signature), b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as { role?: string; exp?: number }; return session.role === "admin" && typeof session.exp === "number" && session.exp > Math.floor(Date.now() / 1000); } catch { return false; }
}

export const sessionCookie = { name: cookieName, maxAge: duration };
export async function getSession() { return hasValidSession((await cookies()).get(cookieName)?.value) ? { role: "admin" as const } : null; }
export async function requireAdmin() { if (!(await getSession())) redirect("/login"); }
