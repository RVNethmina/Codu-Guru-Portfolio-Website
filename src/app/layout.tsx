import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are bundled from @fontsource-variable packages so builds never depend on Google Fonts being reachable.
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
});
const grotesk = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-grotesk",
  weight: "300 700",
});
const jetbrains = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "Code Guru | Research Portfolio — R26-SE-036",
  description:
    "Code Guru — an integrated real-time learning support platform for novice Java programmers. A final-year research project at the Sri Lanka Institute of Information Technology.",
  keywords: ["Code Guru", "Code Coach", "SLIIT", "R26-SE-036", "programming education", "VS Code extension", "Java"],
  openGraph: {
    title: "Code Guru | Research Portfolio",
    description: "Scaffolded hints, adaptive micro-lessons, behaviour-aware pair programming and adaptive games for novice Java programmers.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
