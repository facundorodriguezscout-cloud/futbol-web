import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GolData — Estadísticas del fútbol argentino",
  description: "Tablas de posiciones y resultados actualizados del fútbol del ascenso argentino, empezando por el Torneo Federal A.",
  verification: {
    google: "3gbqQGbbDJBhhWpXV3H7F20YfRj69FYVxn9ptL_Xw1g",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-slate-950">{children}</body>
    </html>
  );
}
