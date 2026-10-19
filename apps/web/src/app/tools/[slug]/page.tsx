import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ToolPage } from "@/components/tools/ToolPage";
import { getToolUi, toolUi } from "@/data/tool-ui";

export function generateStaticParams() { return toolUi.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const tool = getToolUi((await params).slug); return tool ? { title: `${tool.name} | Próximamente en Hygroundd`, description: `${tool.description} Próximamente en Hygroundd.` } : {}; }
export default async function ToolRoute({ params }: { params: Promise<{ slug: string }> }) { const tool = getToolUi((await params).slug); if (!tool) notFound(); return <main className="toolsShell"><Header /><ToolPage tool={tool} /><Footer /></main>; }
