export const toolCategories = [
  { id: "pdf", label: "PDF", color: "red" },
  { id: "images", label: "Imágenes", color: "green" },
  { id: "documents", label: "Documentos", color: "blue" },
  { id: "students", label: "Estudiantes", color: "yellow" },
  { id: "office", label: "Oficina", color: "sky" },
  { id: "utilities", label: "Utilidades", color: "violet" },
  { id: "finance", label: "Finanzas", color: "emerald" },
  { id: "development", label: "Desarrollo", color: "purple" },
] as const;

export type ToolCategory = (typeof toolCategories)[number]["id"];
export type ToolStatus = "available" | "beta" | "coming-soon";
export type Tool = { id: string; slug: string; name: string; shortDescription: string; description: string; category: ToolCategory; icon: string; route: string | null; status: ToolStatus; featured: boolean; popularityRank?: number; keywords: string[] };

const make = (category: ToolCategory, name: string, icon: string, options: Partial<Omit<Tool, "id" | "slug" | "name" | "category" | "icon">> = {}): Tool => ({ id: category+"-"+name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), name, shortDescription: options.shortDescription ?? "Herramienta online gratuita.", description: options.description ?? "Herramienta online gratuita para tareas diarias.", category, icon, route: options.route ?? null, status: options.status ?? "coming-soon", featured: options.featured ?? false, popularityRank: options.popularityRank, keywords: options.keywords ?? [name, category] });

export const tools: Tool[] = [
  make("pdf", "PDF → Word", "PDF", { shortDescription: "Convierte documentos PDF a Word.", featured: true, popularityRank: 1, keywords: ["pdf", "word", "documento", "convertir"] }),
  make("pdf", "Word → PDF", "PDF"), make("pdf", "Imágenes → PDF", "PDF"), make("pdf", "PDF → Imágenes", "PDF"), make("pdf", "Comprimir PDF", "PDF"), make("pdf", "Unir PDF", "PDF"), make("pdf", "Separar PDF", "PDF"), make("pdf", "Reordenar PDF", "PDF"),
  make("images", "Comprimir imágenes", "IMG", { shortDescription: "Reduce el peso de tus imágenes.", featured: true, popularityRank: 2, keywords: ["imagen", "foto", "comprimir", "jpg", "png"] }),
  make("images", "Cambiar tamaño de imagen", "IMG"), make("images", "PNG → JPG", "IMG"), make("images", "JPG → PNG", "IMG", { featured: true, popularityRank: 3, keywords: ["jpg", "png", "imagen", "convertir"] }), make("images", "WebP Converter", "IMG"), make("images", "Recortar imagen", "IMG"), make("images", "Preparar foto para imprimir", "IMG"), make("images", "Crear hoja con varias fotos", "IMG"), make("images", "Foto para documento/carnet", "IMG"), make("images", "Quitar metadata", "IMG"),
  make("documents", "Crear carta formal", "DOC"), make("documents", "Crear solicitud", "DOC"), make("documents", "Crear constancia", "DOC"), make("documents", "Crear hoja membretada", "DOC"), make("documents", "Crear portada", "DOC"), make("documents", "Generador de documentos", "DOC"), make("documents", "Plantillas Word", "DOC"), make("documents", "Contador de palabras", "TXT", { featured: true, popularityRank: 4, keywords: ["contar", "palabras", "texto", "documento"] }), make("documents", "Formateador de texto", "TXT"),
  make("students", "Portada universitaria", "EDU"), make("students", "Portada escolar", "EDU"), make("students", "Generador de bibliografía", "EDU"), make("students", "Calculadora de notas", "EDU"), make("students", "Calculadora de promedio", "EDU"), make("students", "Regla de tres", "EDU"), make("students", "Calculadora de porcentajes", "EDU"), make("students", "Contador de palabras", "TXT"), make("students", "Formateador de texto", "TXT"),
  make("office", "Formato de carta", "OFF"), make("office", "Formato de solicitud", "OFF"), make("office", "Currículum sencillo", "OFF"), make("office", "Hoja de vida", "OFF"), make("office", "Recibo simple", "OFF"), make("office", "Cotización", "OFF"), make("office", "Formato de factura", "OFF"), make("office", "Control de gastos", "OFF"), make("office", "Preparar fotografías para impresión", "OFF"), make("office", "Crear hoja de fotografías", "OFF"), make("office", "Escalar documento para impresión", "OFF"),
  make("utilities", "QR Generator", "QR"), make("utilities", "Password Generator", "KEY", { shortDescription: "Genera contraseñas seguras.", featured: true, popularityRank: 5, keywords: ["contraseña", "password", "segura", "generar"] }), make("utilities", "Conversor de unidades", "UTL"), make("utilities", "Calculadora de edad", "UTL"), make("utilities", "Calculadora de fechas", "UTL"), make("utilities", "Texto → QR", "QR"),
  make("finance", "Card Manager", "FIN", { shortDescription: "Gestor y calculadora de tarjeta de crédito.", route: "/card", status: "available", featured: true, keywords: ["tarjeta", "crédito", "finanzas", "pagos"] }), make("finance", "Calculadora de cuotas", "FIN"), make("finance", "Calculadora de intereses", "FIN"), make("finance", "Presupuesto mensual", "FIN"),
  make("development", "JSON Formatter", "DEV"), make("development", "JSON Validator", "DEV"), make("development", "Base64 Encoder/Decoder", "DEV"), make("development", "UUID Generator", "DEV"), make("development", "Hash Generator", "DEV"), make("development", "Regex Tester", "DEV"), make("development", "Timestamp Converter", "DEV"),
];
