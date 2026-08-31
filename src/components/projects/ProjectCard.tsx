import Image from "next/image";
import type { Project } from "@/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const external = project.url?.startsWith("http") ?? false;
  const content = <><div className={`projectVisual ${project.tone}`}>
    {project.image ? <Image src={project.image} alt={`${project.name} preview`} fill sizes="(max-width: 480px) calc(100vw - 40px), (max-width: 760px) 50vw, 25vw"/> : <><span className="browserBar" aria-hidden="true"><i/><i/><i/></span><strong>{project.visualLabel}</strong><small>{project.subdomain ?? "HYGROUNDD"}</small><div className="scanlines" aria-hidden="true"/></>}
  </div><div className="projectInfo"><div><small>0{index + 1} / {project.placeholder ? "PLACEHOLDER" : project.status.replace("-", " ")}</small><h3>{project.name}</h3><p>{project.description}</p><ul aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div><i aria-hidden="true">{project.url ? "↗" : "—"}</i></div></>;

  return project.url
    ? <a className="projectCard" href={project.url} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`${project.name}: ${project.description}`}>{content}</a>
    : <article className="projectCard projectCardDisabled" aria-label={`${project.name}: not configured`}>{content}</article>;
}
