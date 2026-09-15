import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

const cookieName = "hygroundd_card_session";
const duration = 60 * 60 * 8;

function secret() { return process.env.AUTH_SECRET ?? ""; }
function encode(value: string) { return Buffer.from(value).toString("base64url"); }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }

export function passwordMatches(password: string) {
  const stored = process.env.CARD_ADMIN_PASSWORD_HASH;
  if (!stored) return false;
  const [algorithm, salt, expected] = stored.split("$");
  if (algorithm !== "scrypt" || !salt || !expected) return false;
  const actual = scryptSync(password, salt, 64).toString("base64url");
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function credentialsMatch(username: string, password: string) {
  const configuredUsername = process.env.CARD_ADMIN_USERNAME;
  if (!configuredUsername || !secret()) return false;
  const a = Buffer.from(username);
  const b = Buffer.from(configuredUsername);
  return a.length === b.length && timingSafeEqual(a, b) && passwordMatches(password);
}

export function createSession() {
  const payload = encode(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + duration }));
  return `${payload}.${sign(payload)}`;
}

export function hasValidSession(value?: string) {
  if (!value || !secret()) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Math.floor(Date.now() / 1000); } catch { return false; }
}

export const cardSession = { name: cookieName, maxAge: duration };
