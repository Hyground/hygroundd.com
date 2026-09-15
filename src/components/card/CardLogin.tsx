"use client";
import { useState } from "react";

export function CardLogin() {
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function login(form: FormData) { setLoading(true); setError(""); const response = await fetch("/api/card/login", { method: "POST", body: form }); if (response.ok) window.location.reload(); else { setError("Invalid credentials"); setLoading(false); } }
  return <main className="cardShell"><section className="cardLogin panel"><p className="cardKicker">01 / HERRAMIENTA PRIVADA</p><h1>GESTOR DE <span>TARJETAS</span></h1><p className="cardMuted">Calculadora de crédito y pagos</p><form action={login}><label>USUARIO<input name="username" autoComplete="username" required /></label><label>CONTRASEÑA<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="cardError" role="alert">Credenciales inválidas</p>}<button className="cardButton" disabled={loading}>{loading ? "VERIFICANDO..." : "INGRESAR"}</button></form><a className="cardBack" href="/">← VOLVER AL PROJECT HUB</a></section></main>;
}
