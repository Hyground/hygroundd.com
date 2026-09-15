import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hygroundd.com"),
  title: "Hygroundd — Herramientas Online Gratis",
  description: "Herramientas online gratuitas para PDF, imágenes, documentos, estudiantes, oficina, utilidades y desarrollo.",
  openGraph: { title: "Hygroundd — Herramientas Online Gratis", description: "Herramientas online gratuitas para PDF, imágenes, documentos, estudiantes, oficina, utilidades y desarrollo.", url: "https://hygroundd.com", siteName: "Hygroundd", type: "website" },
  twitter: { card: "summary_large_image", title: "Hygroundd — Herramientas Online Gratis", description: "Herramientas online gratuitas para PDF, imágenes, documentos, estudiantes, oficina, utilidades y desarrollo." },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#070910", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="es" className="h-full antialiased"><body className="min-h-full flex flex-col">{children}</body></html>;
}
