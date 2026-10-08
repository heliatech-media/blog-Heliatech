import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "HELIA TECH | L'Intelligence Artificielle et l'Automatisation",
  description: "Découvrez nos workflows et stratégies pour booster votre productivité grâce à l'IA.",
};

import RealTrafficTracker from "@/components/RealTrafficTracker";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark bg-[#030303] text-zinc-100 antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-zinc-100 selection:bg-cyan-500/30 overflow-x-hidden">
        <RealTrafficTracker />
        <Analytics>{children}</Analytics>
      </body>
    </html>
  );
}
