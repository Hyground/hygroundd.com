import { resourceLinks } from "@/data/resources";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PanelTitle } from "@/components/ui/PanelTitle";

function ResourceContent({ icon, title, description, available }: { icon: IconName; title: string; description: string; available: boolean }) {
  return <><span className="resourceIcon"><Icon name={icon} size={21}/></span><span><b>{title.toUpperCase()}</b><small>{available ? description : `${description} · NOT CONFIGURED`}</small></span><i aria-hidden="true"><Icon name="arrow" size={16}/></i></>;
}

export function Resources() {
  return <section className="panel resourcesPanel" id="github"><PanelTitle number="02" title="RESOURCES & LINKS" detail="CONNECT"/><div className="resourceList">{resourceLinks.map((link) => link.href
    ? <a className="resourceItem" href={link.href} key={link.title} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}><ResourceContent icon={link.icon as IconName} title={link.title} description={link.description} available/></a>
    : <div className="resourceItem resourceDisabled" aria-disabled="true" key={link.title}><ResourceContent icon={link.icon as IconName} title={link.title} description={link.description} available={false}/></div>)}</div><div className="resourceFoot" id="contact"><Icon name="spark" size={14}/><span>CONTACT DETAILS COMING SOON</span></div></section>;
}
