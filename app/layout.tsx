import type { Metadata } from "next";
import { Anton, Instrument_Serif, Inter, Great_Vibes } from "next/font/google";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Motion from "../components/Motion";
import KontenSync from "../components/KontenSync";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const serif = Instrument_Serif({
  preload: false,
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-serif",
});

const script = Great_Vibes({
  preload: false,
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
  title: "Rempah — Dapur Nusantara, Jakarta",
  description:
    "Dapur kecil di Kebayoran Baru. Menu berubah tiap Senin, empat puluh kursi, buka Selasa sampai Minggu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <KontenSync />
        <Motion />
      </body>
    </html>
  );
}
