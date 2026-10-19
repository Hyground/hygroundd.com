"use client";
import { FormEvent, useMemo, useState } from "react";
import { CardMovement, Currency, DueDay, currentCycle, cycleFor, dateLabel, money, todayInput } from "@/lib/card-calculator";

export type ManagedCard = { id: string; name: string; limit: number; cutoffDay: number; dueDay: DueDay; currency: Currency; movements: CardMovement[]; payments: { amount: number; date: string }[] };
type Props = { initialCard: ManagedCard; isPrivate: boolean };
const makeId = () => crypto.randomUUID();

export function CardDashboard({ initialCard, isPrivate }: Props) {
  const [cards, setCards] = useState<ManagedCard[]>([initialCard]);
  const [activeId, setActiveId] = useState(initialCard.id);
  const [showNew, setShowNew] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [simulator, setSimulator] = useState({ amount: 0, date: todayInput() });
  const card = cards.find((item) => item.id === activeId) ?? cards[0];
  const cycle = currentCycle(card.cutoffDay, card.dueDay);
  const simulation = useMemo(() => cycleFor(simulator.date, card.cutoffDay, card.dueDay), [simulator.date, card.cutoffDay, card.dueDay]);
  const pending = card.movements.filter((item) => item.currency === card.currency && item.status === "PENDING").reduce((total, item) => total + item.amount, 0);
  const paid = card.payments.reduce((total, item) => total + item.amount, 0);
  const used = Math.max(0, pending - paid);
  const update = (change: (value: ManagedCard) => ManagedCard) => setCards((items) => items.map((item) => item.id === card.id ? change(item) : item));

  function saveCard(event: FormEvent<HTMLFormElement>, target: "new" | "edit") {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const limit = Number(form.get("limit"));
    if (!name || limit <= 0) return;
    const values = { name, limit, cutoffDay: Number(form.get("cutoff")), dueDay: form.get("due") === "last" ? "last" as const : Number(form.get("due")), currency: form.get("currency") as Currency };
    if (target === "new") { const next: ManagedCard = { id: makeId(), ...values, movements: [], payments: [] }; setCards((items) => [...items, next]); setActiveId(next.id); setShowNew(false); }
    else { update((item) => ({ ...item, ...values })); setShowConfig(false); }
  }

  function addPurchase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const amount = Number(form.get("amount")); const date = String(form.get("date"));
    if (amount <= 0 || !date) return;
    const movement: CardMovement = { id: makeId(), description: String(form.get("description")).trim(), amount, date, currency: form.get("currency") as Currency, category: String(form.get("category")).trim() || "Sin categoría", status: "PENDING" };
    update((item) => ({ ...item, movements: [movement, ...item.movements] })); event.currentTarget.reset();
  }

  function addPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const amount = Number(form.get("amount"));
    if (amount > 0) update((item) => ({ ...item, payments: [{ amount, date: String(form.get("date")) }, ...item.payments] }));
    event.currentTarget.reset();
  }

  const metrics = [["LÍMITE", money(card.limit, card.currency)], ["SALDO USADO", money(used, card.currency)], ["DISPONIBLE", money(Math.max(0, card.limit - used), card.currency)], ["USO", `${((used / card.limit) * 100).toFixed(1)}%`], ["PRÓXIMO CORTE", dateLabel(cycle.cutoff)], ["PRÓXIMO PAGO", dateLabel(cycle.payment)]];

  return <section className="cardShell">
    {!isPrivate && <p className="demoNotice">MODO DEMO · DATOS FICTICIOS. INICIA SESIÓN PARA TU ESPACIO PRIVADO.</p>}
    <section className="cardIntro"><div><p className="cardKicker">01 / MIS TARJETAS</p><h1>GESTOR DE <span>TARJETAS</span></h1><p className="cardMuted">Elige una tarjeta para ver su saldo, compras y fechas de pago.</p></div><button className="cardButton" onClick={() => setShowNew(true)}>+ AGREGAR TARJETA</button></section>
    <section className="cardCards">{cards.map((item) => <button key={item.id} className={`creditCard ${item.id === card.id ? "selected" : ""}`} onClick={() => setActiveId(item.id)}><small>{item.currency} · CORTE DÍA {item.cutoffDay}</small><b>{item.name}</b><span>{money(Math.max(0, item.limit), item.currency)} límite</span><i>••••</i></button>)}</section>
    {showNew && <section className="cardPanel panel cardModal"><p className="cardKicker">NUEVA TARJETA</p><CardFields submit="GUARDAR TARJETA" onSubmit={(event) => saveCard(event, "new")} /><button className="cardTextButton" onClick={() => setShowNew(false)}>CANCELAR</button></section>}
    <section className="cardFocus"><div><p className="cardKicker">02 / TARJETA SELECCIONADA</p><h2>{card.name}</h2><p className="cardMuted">Límite {money(card.limit, card.currency)} · Corte día {card.cutoffDay} · Pago {card.dueDay === "last" ? "último día del mes" : `día ${card.dueDay}`}</p></div><button className="cardTextButton" onClick={() => setShowConfig((value) => !value)}>CONFIGURAR</button></section>
    {showConfig && <section className="cardPanel panel cardModal"><p className="cardKicker">CONFIGURACIÓN</p><CardFields card={card} submit="GUARDAR CAMBIOS" onSubmit={(event) => saveCard(event, "edit")} /><button className="cardTextButton" onClick={() => setShowConfig(false)}>CANCELAR</button></section>}
    <section className="cardStats">{metrics.map(([label, value], index) => <article className="cardMetric panel" key={label}><small>0{index + 1} / {label}</small><strong>{value}</strong></article>)}</section>
    <section className="cardGrid">
      <div className="cardPanel panel"><p className="cardKicker">03 / NUEVA COMPRA</p><form className="cardForm" onSubmit={addPurchase}><input name="description" placeholder="Descripción" required /><div><input name="amount" type="number" step="0.01" min="0.01" placeholder="Monto" required /><select name="currency" defaultValue={card.currency}><option>GTQ</option><option>USD</option></select></div><input name="date" type="date" defaultValue={todayInput()} required /><input name="category" placeholder="Categoría (opcional)" /><button className="cardButton">REGISTRAR COMPRA</button></form></div>
      <div className="cardPanel panel"><p className="cardKicker">04 / SIMULADOR</p><div className="cardForm"><input type="number" step="0.01" min="0" placeholder={`Monto en ${card.currency}`} onChange={(event) => setSimulator((value) => ({ ...value, amount: Number(event.target.value) }))} /><input type="date" value={simulator.date} onChange={(event) => setSimulator((value) => ({ ...value, date: event.target.value }))} /></div><div className="cardResult"><b>Entra al corte del {dateLabel(simulation.cutoff)}</b><span>Fecha límite: {dateLabel(simulation.payment)}</span><span>Días aproximados: {simulation.days}</span><span>Representa {((simulator.amount / card.limit) * 100).toFixed(1)}% del límite</span></div></div>
      <div className="cardPanel panel"><p className="cardKicker">05 / REGISTRAR PAGO</p><form className="cardForm" onSubmit={addPayment}><input name="amount" type="number" step="0.01" min="0.01" placeholder={`Monto en ${card.currency}`} required /><input name="date" type="date" defaultValue={todayInput()} required /><button className="cardButton">REGISTRAR PAGO</button></form><p className="cardMuted">Pagos registrados: {money(paid, card.currency)}</p></div>
    </section>
    <section className="cardPanel panel cardMovementPanel"><div className="cardTitle"><p className="cardKicker">06 / MOVIMIENTOS</p><small>CICLO · {dateLabel(cycle.start)} — {dateLabel(cycle.cutoff)}<br />Pago: {dateLabel(cycle.payment)}</small></div>{card.movements.length ? <div className="cardTable">{card.movements.map((movement) => { const dates = cycleFor(movement.date, card.cutoffDay, card.dueDay); return <article key={movement.id}><time>{movement.date}</time><b>{movement.description}</b><span>{movement.category}</span><strong>{money(movement.amount, movement.currency)}</strong><small>Corte {dateLabel(dates.cutoff)}<br />Pago {dateLabel(dates.payment)}</small><button onClick={() => update((item) => ({ ...item, movements: item.movements.map((value) => value.id === movement.id ? { ...value, status: value.status === "PENDING" ? "PAID" : "PENDING" } : value) }))}>{movement.status === "PENDING" ? "PENDIENTE" : "PAGADA"}</button><button className="cardDelete" aria-label="Eliminar movimiento" onClick={() => { if (confirm("¿Eliminar este movimiento?")) update((item) => ({ ...item, movements: item.movements.filter((value) => value.id !== movement.id) })); }}>×</button></article>; })}</div> : <p className="cardEmpty">AÚN NO HAY MOVIMIENTOS. REGISTRA UNA COMPRA PARA COMENZAR.</p>}</section>
  </section>;
}

function CardFields({ card, onSubmit, submit }: { card?: ManagedCard; onSubmit: (event: FormEvent<HTMLFormElement>) => void; submit: string }) {
  return <form className="cardForm cardConfig" onSubmit={onSubmit}><input name="name" defaultValue={card?.name} placeholder="Nombre de la tarjeta" required /><input name="limit" type="number" step="0.01" min="0.01" defaultValue={card?.limit} placeholder="Límite de crédito" required /><div><input name="cutoff" type="number" min="1" max="31" defaultValue={card?.cutoffDay ?? 5} aria-label="Día de corte" required /><select name="due" defaultValue={card?.dueDay ?? "last"}><option value="last">Pago: último día</option>{[1, 5, 10, 15, 20, 25].map((day) => <option value={day} key={day}>Pago: día {day}</option>)}</select></div><select name="currency" defaultValue={card?.currency ?? "GTQ"}><option>GTQ</option><option>USD</option></select><button className="cardButton">{submit}</button></form>;
}
