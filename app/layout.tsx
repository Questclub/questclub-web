import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import DottedBg from "@/components/dotted-bg";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://questclub.app"),
  title: {
    default: "Quest Club — Tu grupo de amigos contra el mundo",
    template: "%s · Quest Club",
  },
  description:
    "App de retos por temporadas para grupos de amigos. Cada finde, viaje o fiesta se convierte en un juego real. Misiones, pruebas, votaciones, ranking. Verano 2026.",
  openGraph: {
    title: "Quest Club — Tu grupo de amigos contra el mundo",
    description:
      "App de retos por temporadas para grupos de amigos. Verano 2026.",
    url: "https://questclub.app",
    siteName: "Quest Club",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quest Club",
    description: "Tu grupo de amigos contra el mundo. Cada temporada, un reto nuevo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DottedBg />
        <div className="relative z-10 flex flex-col flex-1">{children}</div>
        <Toaster position="top-center" theme="dark" richColors />
        <Analytics />
      </body>
    </html>
  );
}
