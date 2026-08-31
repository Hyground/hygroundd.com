import { projects } from "@/data/projects";
import { PanelTitle } from "@/components/ui/PanelTitle";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid(){return <section className="panel projectsPanel" id="projects" aria-labelledby="projects-title"><PanelTitle number="01" title="CORE PROJECTS" detail={`${String(projects.length).padStart(2,"0")} SLOTS`}/><div className="projectGrid">{projects.map((project,index)=><ProjectCard project={project} index={index} key={project.name}/>)}</div></section>}
