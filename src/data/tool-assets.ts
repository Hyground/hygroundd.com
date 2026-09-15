export type ToolAssetKey = "pdf" | "word" | "image" | "jpg" | "png" | "qr" | "password" | "calculator" | "text" | "card";

// Optional user-supplied SVGs. The UI uses its fallback until a file is added.
export const toolAssets: Record<ToolAssetKey, { src: string; fallback: string; tone: string }> = {
  pdf: { src: "/assets/tools/pdf.svg", fallback: "PDF", tone: "red" }, word: { src: "/assets/tools/word.svg", fallback: "DOC", tone: "blue" }, image: { src: "/assets/tools/image.svg", fallback: "IMG", tone: "green" }, jpg: { src: "/assets/tools/jpg.svg", fallback: "JPG", tone: "orange" }, png: { src: "/assets/tools/png.svg", fallback: "PNG", tone: "violet" }, qr: { src: "/assets/tools/qr.svg", fallback: "QR", tone: "violet" }, password: { src: "/assets/tools/password.svg", fallback: "KEY", tone: "violet" }, calculator: { src: "/assets/tools/calculator.svg", fallback: "%", tone: "yellow" }, text: { src: "/assets/tools/text.svg", fallback: "TXT", tone: "blue" }, card: { src: "/assets/tools/card.svg", fallback: "CARD", tone: "green" },
};
