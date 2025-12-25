import type { Metadata } from "next";
import { Inter, Satisfy } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Une Énergie Commune",
  description: "Ensemble, construisons l'avenir de notre village",
  keywords: ["élections municipales", "liste citoyenne", "village"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${satisfy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
