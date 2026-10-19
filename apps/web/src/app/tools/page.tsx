import { Header } from "@/components/layout/Header";
import { ToolExplorer } from "@/components/tools/ToolExplorer";
import { tools } from "@/data/tools";

export default function ToolsPage() {
  return <main className="toolsShell"><Header /><ToolExplorer tools={tools} mode="catalog" /></main>;
}
