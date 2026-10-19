import { CardDashboard, type ManagedCard } from "@/components/card/CardDashboard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSession } from "@/lib/auth";

const privateCard: ManagedCard = { id: "primary", name: "Banrural Clásica Sueña", limit: 3400, cutoffDay: 5, dueDay: "last", currency: "GTQ", movements: [], payments: [] };
const demoCard: ManagedCard = { id: "demo", name: "Tarjeta de demostración", limit: 5000, cutoffDay: 12, dueDay: "last", currency: "GTQ", movements: [{ id: "demo-purchase", description: "Compra de ejemplo", amount: 425, currency: "GTQ", date: "2026-09-09", category: "Ejemplo", status: "PENDING" }], payments: [] };

export const dynamic = "force-dynamic";

export default async function CardPage() {
  const isPrivate = Boolean(await getSession());
  return <main className="toolsShell"><Header /><CardDashboard initialCard={isPrivate ? privateCard : demoCard} isPrivate={isPrivate} /><Footer /></main>;
}
