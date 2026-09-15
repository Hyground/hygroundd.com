import { NextResponse } from "next/server";
import { createSession, credentialsMatch, sessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const data = await request.formData();
  const username = data.get("username"), password = data.get("password");
  if (typeof username !== "string" || typeof password !== "string" || !credentialsMatch(username, password)) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie.name, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: sessionCookie.maxAge });
  return response;
}
