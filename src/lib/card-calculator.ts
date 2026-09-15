export type Currency = "GTQ" | "USD";
export type DueDay = number | "last";
export type CardMovement = { id: string; description: string; amount: number; currency: Currency; date: string; category: string; status: "PENDING" | "PAID" };
const localDate = (value: string) => { const [year, month, day] = value.split("-").map(Number); return new Date(year, month - 1, day); };
const lastDay = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const atDay = (year: number, month: number, day: DueDay) => new Date(year, month, day === "last" ? lastDay(year, month) : Math.min(day, lastDay(year, month)));
const formatDate = (date: Date) => new Intl.DateTimeFormat("es-GT", { day: "2-digit", month: "short", year: "numeric" }).format(date).replace(".", "").toUpperCase();
const paymentFor = (cutoff: Date, dueDay: DueDay) => atDay(cutoff.getFullYear(), cutoff.getMonth() + (typeof dueDay === "number" && dueDay < cutoff.getDate() ? 1 : 0), dueDay);
export function cycleFor(dateValue: string, cutoffDay: number, dueDay: DueDay) { const purchase = localDate(dateValue), thisCutoff = atDay(purchase.getFullYear(), purchase.getMonth(), cutoffDay); const cutoff = purchase <= thisCutoff ? thisCutoff : atDay(purchase.getFullYear(), purchase.getMonth() + 1, cutoffDay); const payment = paymentFor(cutoff, dueDay); return { cutoff, payment, days: Math.max(0, Math.ceil((payment.getTime() - purchase.getTime()) / 86400000)) }; }
export function currentCycle(cutoffDay: number, dueDay: DueDay) { const today = new Date(); today.setHours(0, 0, 0, 0); const thisCutoff = atDay(today.getFullYear(), today.getMonth(), cutoffDay); const cutoff = today > thisCutoff ? thisCutoff : atDay(today.getFullYear(), today.getMonth() - 1, cutoffDay); return { start: new Date(cutoff.getFullYear(), cutoff.getMonth() - 1, Math.min(cutoffDay + 1, lastDay(cutoff.getFullYear(), cutoff.getMonth() - 1))), cutoff, payment: paymentFor(cutoff, dueDay) }; }
export function money(value: number, currency: Currency) { return new Intl.NumberFormat("es-GT", { style: "currency", currency, minimumFractionDigits: 2 }).format(value).replace("GTQ", "Q"); }
export function dateLabel(date: Date) { return formatDate(date); }
export function todayInput() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
