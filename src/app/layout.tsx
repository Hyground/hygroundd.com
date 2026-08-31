import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hygroundd.com"),
  title: "Hygroundd — Project Hub",
  description: "Personal project hub, experiments and software by Hygroundd.",
  openGraph: {
    title: "Hygroundd — Project Hub",
    description: "Personal project hub, experiments and software by Hygroundd.",
    url: "https://hygroundd.com",
    siteName: "Hygroundd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hygroundd — Project Hub",
    description: "Personal project hub, experiments and software by Hygroundd.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05040a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
