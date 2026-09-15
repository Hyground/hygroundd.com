export type Currency = "GTQ" | "USD";
export type CardMovement = { id: string; description: string; amount: number; currency: Currency; date: string; category: string; status: "PENDING" | "PAID" };

const localDate = (value: string) => { const [year, month, day] = value.split("-").map(Number); return new Date(year, month - 1, day); };
const formatDate = (date: Date) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
const lastDay = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const cutoffDate = (year: number, month: number, cutoffDay: number) => new Date(year, month, Math.min(cutoffDay, lastDay(year, month)));
const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, 1);

export function cycleFor(dateValue: string, cutoffDay: number) {
  const purchase = localDate(dateValue);
  const sameMonthCutoff = cutoffDate(purchase.getFullYear(), purchase.getMonth(), cutoffDay);
  const cutoff = purchase <= sameMonthCutoff ? sameMonthCutoff : cutoffDate(purchase.getFullYear(), purchase.getMonth() + 1, cutoffDay);
  const payment = new Date(cutoff.getFullYear(), cutoff.getMonth() + 1, 0);
  const days = Math.max(0, Math.ceil((payment.getTime() - purchase.getTime()) / 86400000));
  return { cutoff, payment, days };
}

export function currentCycle(cutoffDay: number) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const thisCutoff = cutoffDate(today.getFullYear(), today.getMonth(), cutoffDay);
  const cutoff = today > thisCutoff ? thisCutoff : cutoffDate(today.getFullYear(), today.getMonth() - 1, cutoffDay);
  return { start: new Date(cutoff.getFullYear(), cutoff.getMonth() - 1, Math.min(cutoffDay + 1, lastDay(cutoff.getFullYear(), cutoff.getMonth() - 1))), cutoff, payment: new Date(cutoff.getFullYear(), cutoff.getMonth() + 1, 0) };
}
export function money(value: number, currency: Currency) { return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 2 }).format(value).replace("GTQ", "Q"); }
export function dateLabel(date: Date) { return formatDate(date); }
export function todayInput() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
