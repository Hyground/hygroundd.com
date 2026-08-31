import { ActivityTimeline } from "@/components/activity/ActivityTimeline";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Resources } from "@/components/layout/Resources";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PointerEffect } from "@/components/ui/PointerEffect";

export default function Home() {
  return <div className="dashboard">
    <div className="ambient ambientOne" aria-hidden="true"/><div className="ambient ambientTwo" aria-hidden="true"/>
    <a className="skipLink" href="#main-content">SKIP TO CONTENT</a>
    <Header/><main id="main-content"><Hero/>
    <div className="contentGrid"><ProjectGrid/><Resources/><ActivityTimeline/></div></main>
    <Footer/><PointerEffect/>
  </div>;
}
