import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

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
