import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda - Nos prochains rendez-vous",
  description: "Retrouvez les dates des cafés rencontre et réunions publiques de la liste Une Énergie Commune à Glières-Val-de-Borne.",
};

// JSON-LD for events
const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Event",
      name: "Café rencontre - Marché de Petit-Bornand",
      startDate: "2026-01-25T09:00:00+01:00",
      endDate: "2026-01-25T12:00:00+01:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Marché",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Petit-Bornand-les-Glières",
          postalCode: "74130",
          addressCountry: "FR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Une Énergie Commune",
        url: "https://www.uneenergiecommune.fr",
      },
      description: "Venez échanger avec nous autour d'un café sur le marché.",
    },
    {
      "@type": "Event",
      name: "Réunion publique - Petit-Bornand",
      startDate: "2026-03-11T20:30:00+01:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Foyer rural",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Petit-Bornand-les-Glières",
          postalCode: "74130",
          addressCountry: "FR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Une Énergie Commune",
        url: "https://www.uneenergiecommune.fr",
      },
      description: "Venez découvrir notre programme et échanger avec l'équipe.",
    },
    {
      "@type": "Event",
      name: "Réunion publique - Entremont",
      startDate: "2026-03-13T20:30:00+01:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Salle d'animation",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Entremont",
          postalCode: "74130",
          addressCountry: "FR",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Une Énergie Commune",
        url: "https://www.uneenergiecommune.fr",
      },
      description: "Venez découvrir notre programme et échanger avec l'équipe.",
    },
  ],
};

export default function AgendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      {children}
    </>
  );
}
