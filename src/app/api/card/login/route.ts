import { NextResponse } from "next/server";
import { cardSession, createSession, credentialsMatch } from "@/lib/card-auth";

export async function POST(request: Request) {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");
  if (typeof username !== "string" || typeof password !== "string" || !credentialsMatch(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cardSession.name, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: cardSession.maxAge });
  return response;
}
