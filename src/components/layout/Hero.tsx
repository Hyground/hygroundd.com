import Image from "next/image";
import logo from "@/app/logo/logoHygroundd.png";
import { FloatingNav } from "@/components/navigation/FloatingNav";

export function Hero(){return <section className="hero" id="home"><div className="identity"><div className="logoAura"><span className="orbit orbitOne"/><span className="orbit orbitTwo"/><span className="flare flareOne"/><span className="flare flareTwo"/><Image className="heroLogo" src={logo} alt="Hygroundd character logo" priority sizes="(max-width: 760px) 270px, 28vw"/></div><div className="online"><span/><b>ONLINE</b><em>PROJECT HUB · VERSION 1</em></div></div><div className="heroCopy"><p className="eyebrow"><span>01</span> PERSONAL PROJECT HUB</p><h1>HYGROUNDD.<br/>BUILDING BEYOND<br/><span>BOUNDARIES.</span></h1><a className="projectHub" href="#projects"><span>/</span> PROJECT HUB <i>↗</i></a></div><FloatingNav/></section>}
