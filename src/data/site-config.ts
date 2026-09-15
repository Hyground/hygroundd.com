export const siteConfig = {
  name: "Hygroundd",
  tagline: "Herramientas online para todos.",
  description: "Herramientas online gratuitas para PDF, imágenes, documentos, estudiantes, oficina, utilidades y desarrollo.",
  logo: null as string | null,
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Herramientas", href: "/tools" },
    { label: "Categorías", href: "/#categorias" },
    { label: "Acerca de", href: "/about" },
  ],
} as const;
