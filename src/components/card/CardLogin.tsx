"use client";
import { useState } from "react";

export function CardLogin() {
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function login(form: FormData) { setLoading(true); setError(""); const response = await fetch("/api/card/login", { method: "POST", body: form }); if (response.ok) window.location.reload(); else { setError("Invalid credentials"); setLoading(false); } }
  return <main className="cardShell"><section className="cardLogin panel"><p className="cardKicker">01 / PRIVATE TOOL</p><h1>CARD <span>MANAGER</span></h1><p className="cardMuted">Credit &amp; payment calculator</p><form action={login}><label>USERNAME<input name="username" autoComplete="username" required /></label><label>PASSWORD<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="cardError" role="alert">{error}</p>}<button className="cardButton" disabled={loading}>{loading ? "VERIFYING..." : "ACCESS TERMINAL"}</button></form><a className="cardBack" href="/">← RETURN TO PROJECT HUB</a></section></main>;
}
