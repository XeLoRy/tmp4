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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Une Énergie Commune",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
      description:
        "Liste citoyenne pour les élections municipales 2026 à Glières-Val-de-Borne",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Glières-Val-de-Borne",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Glières-Val-de-Borne",
          addressRegion: "Haute-Savoie",
          postalCode: "74130",
          addressCountry: "FR",
        },
      },
      sameAs: [
        "https://www.instagram.com/une_energie_commune/",
        "https://www.facebook.com/profile.php?id=61585981854300",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Une Énergie Commune",
      description:
        "Site officiel de la liste Une Énergie Commune pour les élections municipales 2026 à Glières-Val-de-Borne",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Une Énergie Commune | Élections municipales 2026 Glières-Val-de-Borne",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      description:
        "Liste citoyenne pour les élections municipales 2026 à Glières-Val-de-Borne. 25 candidats engagés pour un village dynamique et solidaire.",
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${satisfy.variable} antialiased`}
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
