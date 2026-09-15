import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ToolExplorer } from "@/components/tools/ToolExplorer";
import { tools } from "@/data/tools";

export default function Home() {
  return <main className="toolsShell"><Header /><ToolExplorer tools={tools} /><section className="toolsCta"><div><p>HYGROUNDD TOOLS</p><h2>Herramientas útiles.<br />Para tu día a día.</h2><span>Todo en un lugar, sin complicaciones.</span><a href="#todas-las-herramientas">Explorar herramientas <b>→</b></a></div><div className="ctaArtwork" aria-hidden="true"><i /><i /><i /></div></section><Footer /></main>;
}
