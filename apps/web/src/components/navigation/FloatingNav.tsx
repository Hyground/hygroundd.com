"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

const items: { label: string; href: string; icon: IconName }[] = [
  { label: "HOME", href: "#home", icon: "home" }, { label: "PROJECTS", href: "#projects", icon: "grid" }, { label: "GITHUB", href: "#github", icon: "github" }, { label: "ABOUT", href: "#about", icon: "user" }, { label: "CONTACT", href: "#contact", icon: "mail" },
];

export function FloatingNav() {
  const [open,setOpen] = useState(false);
  return <aside className={`navRail ${open?"navOpen":""}`} aria-label="Primary navigation"><div className="railControls"><button type="button" aria-expanded={open} aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(v=>!v)}><span className="menuGlyph">{open?"×":"↗"}</span></button><span/><small>MENU</small></div><nav>{items.map((item,i)=><a href={item.href} key={item.label} onClick={()=>setOpen(false)}><span className="navIndex">0{i+1}</span><Icon name={item.icon}/><b>{item.label}</b><i>↗</i></a>)}</nav><div className="railBottom"><span className="liveDot"/><b>v1.0</b><small>LIVE</small><i>©26</i></div></aside>;
}
