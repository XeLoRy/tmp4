import type { Metadata } from "next";
import { Montserrat, Satisfy } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = "https://www.uneenergiecommune.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Une Énergie Commune | Élections municipales 2026 Glières-Val-de-Borne",
    template: "%s | Une Énergie Commune",
  },
  description: "Liste citoyenne pour les élections municipales 2026 à Glières-Val-de-Borne (74). 25 candidats engagés pour un village dynamique, solidaire et tourné vers l'avenir.",
  keywords: [
    "élections municipales 2026",
    "Glières-Val-de-Borne",
    "liste citoyenne",
    "Petit-Bornand",
    "Entremont",
    "Haute-Savoie",
    "74",
    "Une Énergie Commune",
    "Mickaël Maistre",
  ],
  authors: [{ name: "Une Énergie Commune" }],
  creator: "Une Énergie Commune",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Une Énergie Commune",
    title: "Une Énergie Commune | Élections municipales 2026 Glières-Val-de-Borne",
    description: "Liste citoyenne pour les élections municipales 2026 à Glières-Val-de-Borne. 25 candidats engagés pour un village dynamique et solidaire.",
    images: [
      {
        url: "/images/equipe.jpg",
        width: 1200,
        height: 630,
        alt: "L'équipe Une Énergie Commune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Une Énergie Commune | Élections municipales 2026",
    description: "Liste citoyenne pour les élections municipales 2026 à Glières-Val-de-Borne (74).",
    images: ["/images/equipe.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${satisfy.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
