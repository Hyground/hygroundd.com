import { ImageResponse } from "next/og";

export const alt = "Hygroundd — Project Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px",color:"white",background:"radial-gradient(circle at 70% 35%, #482076 0%, #0a0711 42%, #030307 80%)",fontFamily:"Arial",border:"2px solid #6f35a8"}}><div style={{display:"flex",fontSize:22,letterSpacing:7,color:"#b26aff",marginBottom:42}}>HYGROUNDD · PROJECT HUB</div><div style={{display:"flex",fontSize:82,fontWeight:800,letterSpacing:-5,lineHeight:1}}>BUILDING BEYOND<br/>BOUNDARIES.</div><div style={{display:"flex",fontSize:18,letterSpacing:4,color:"#81758d",marginTop:42}}>PERSONAL PROJECTS · EXPERIMENTS · SOFTWARE</div></div>, size);
}
