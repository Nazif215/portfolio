import type { Metadata } from "next";
import { Archivo, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Nav } from "@/components/layout/Nav";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nasif Muhammed Safeer — Technical Artist & XR Creator",
  description:
    "I create immersive digital worlds where art, technology and storytelling meet. Technical Artist, Environment Artist and XR Creator portfolio.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Nasif Muhammed Safeer — Technical Artist & XR Creator",
    description:
      "I create immersive digital worlds where art, technology and storytelling meet.",
    type: "website",
    url: SITE_URL,
    siteName: "Nasif Muhammed Safeer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasif Muhammed Safeer — Technical Artist & XR Creator",
    description:
      "I create immersive digital worlds where art, technology and storytelling meet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-paper">
        <AppShell>
          <Nav />
          <div id="top">{children}</div>
        </AppShell>
      </body>
    </html>
  );
}
