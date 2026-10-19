export function PanelTitle({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <header className="panelTitle"><span>{number}</span><h2>{title}</h2><i/><small>{detail}</small></header>;
}
