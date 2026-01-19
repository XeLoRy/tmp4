"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Données des événements
const evenementsData = [
  {
    slug: "cafe-petit-bornand",
    titre: "Café rencontre - Marché de Petit-Bornand",
    date: "2026-01-25",
    heure: "9h00 - 12h00",
    lieu: "Marché",
    ville: "Petit-Bornand",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café sur le marché."
  },
  {
    slug: "cafe-entremont-mairie",
    titre: "Café rencontre - Place de l'ancienne Mairie",
    date: "2026-02-01",
    heure: "9h00 - 12h00",
    lieu: "Place de l'ancienne Mairie",
    ville: "Entremont",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café."
  },
  {
    slug: "cafe-beffay",
    titre: "Café rencontre - Beffay",
    date: "2026-02-08",
    heure: "9h00 - 12h00",
    lieu: "Beffay",
    ville: "Petit-Bornand",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café."
  },
  {
    slug: "cafe-la-ville",
    titre: "Café rencontre - La Ville",
    date: "2026-02-15",
    heure: "9h00 - 12h00",
    lieu: "La Ville",
    ville: "Petit-Bornand",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café."
  },
  {
    slug: "cafe-kiosque-entremont",
    titre: "Café rencontre - Kiosque",
    date: "2026-02-22",
    heure: "9h00 - 12h00",
    lieu: "Kiosque",
    ville: "Entremont",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café."
  },
  {
    slug: "cafe-termine",
    titre: "Café rencontre - Termine",
    date: "2026-03-01",
    heure: "9h00 - 12h00",
    lieu: "Termine",
    ville: "Petit-Bornand",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café."
  },
  {
    slug: "cafe-foyer-rural",
    titre: "Café rencontre - Foyer rural",
    date: "2026-03-07",
    heure: "9h00 - 12h00",
    lieu: "Foyer rural",
    ville: "Petit-Bornand",
    type: "cafe",
    description: "Venez échanger avec nous autour d'un café."
  },
  {
    slug: "reunion-petit-bornand",
    titre: "Réunion publique - Petit-Bornand",
    date: "2026-03-11",
    heure: "20h30",
    lieu: "Foyer rural",
    ville: "Petit-Bornand",
    type: "reunion",
    description: "Venez découvrir notre programme et échanger avec l'équipe."
  },
  {
    slug: "reunion-entremont",
    titre: "Réunion publique - Entremont",
    date: "2026-03-13",
    heure: "20h30",
    lieu: "Salle d'animation",
    ville: "Entremont",
    type: "reunion",
    description: "Venez découvrir notre programme et échanger avec l'équipe."
  }
];

export default function AgendaPage() {
  const [countdown, setCountdown] = useState({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
  const [isClient, setIsClient] = useState(false);

  // Trier par date (tous les événements pour le rendu initial)
  const tousEvenements = evenementsData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filtrer côté client uniquement
  const evenementsFuturs = isClient
    ? tousEvenements.filter(e => new Date(e.date) >= new Date(new Date().toDateString()))
    : tousEvenements;

  const prochainEvent = evenementsFuturs[0];
  const autresEvents = evenementsFuturs.slice(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!prochainEvent || !isClient) return;

    const updateCountdown = () => {
      const eventDate = new Date(prochainEvent.date + "T09:00:00");
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
        return;
      }

      const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
      const heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondes = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ jours, heures, minutes, secondes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prochainEvent, isClient]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    return {
      jourCourt: jours[date.getDay()],
      numero: date.getDate(),
      mois: mois[date.getMonth()],
    };
  };

  const formatDateLong = (dateStr: string) => {
    const date = new Date(dateStr);
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]}`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "reunion": return "Réunion publique";
      case "cafe": return "Café rencontre";
      default: return "Événement";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reunion": return "bg-primary";
      case "cafe": return "bg-orange-400";
      default: return "bg-gray-500";
    }
  };

  const getTypeBgLight = (type: string) => {
    switch (type) {
      case "reunion": return "from-primary/10 to-primary/5";
      case "cafe": return "from-orange-300/20 to-orange-300/5";
      default: return "from-gray-500/10 to-gray-500/5";
    }
  };

  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero compact */}
        <section className="bg-gradient-to-b from-background-alt to-background py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-2">
              Agenda
            </h1>
            <p className="text-lg text-foreground-muted">
              Nos prochains rendez-vous
            </p>
          </div>
        </section>

        {prochainEvent && (
          <>
            {/* Prochain événement - Hero Card */}
            <section className="py-8 sm:py-12">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getTypeBgLight(prochainEvent.type)} border border-white/50 shadow-xl`}>
                  {/* Badge "Prochain" */}
                  <div className="absolute top-4 right-4">
                    <span className={`${getTypeColor(prochainEvent.type)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                      Prochain
                    </span>
                  </div>

                  <div className="p-6 sm:p-10">
                    {/* Type d'événement */}
                    <p className="text-sm font-semibold text-foreground-muted uppercase tracking-wide mb-2">
                      {getTypeLabel(prochainEvent.type)}
                    </p>

                    {/* Titre */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-6">
                      {prochainEvent.titre}
                    </h2>

                    {/* Countdown */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                      {[
                        { value: countdown.jours, label: "jours" },
                        { value: countdown.heures, label: "heures" },
                        { value: countdown.minutes, label: "min" },
                        { value: countdown.secondes, label: "sec" },
                      ].map((item) => (
                        <div key={item.label} className="bg-white rounded-2xl shadow-sm px-4 sm:px-6 py-3 sm:py-4 min-w-[70px] sm:min-w-[90px]">
                          <div className="text-2xl sm:text-4xl font-bold text-primary">{item.value}</div>
                          <div className="text-xs sm:text-sm text-foreground-muted">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Infos */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-foreground">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{formatDateLong(prochainEvent.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{prochainEvent.heure}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{prochainEvent.lieu}, {prochainEvent.ville}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Autres événements */}
            {autresEvents.length > 0 && (
              <section className="py-8 sm:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    À venir ensuite
                  </h3>

                  <div className="grid gap-4">
                    {autresEvents.map((event) => {
                      const date = formatDate(event.date);
                      return (
                        <div
                          key={event.slug}
                          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                        >
                          <div className="flex items-stretch">
                            {/* Date badge */}
                            <div className={`${getTypeColor(event.type)} text-white flex flex-col items-center justify-center px-4 sm:px-6 py-4 min-w-[80px] sm:min-w-[100px]`}>
                              <span className="text-xs uppercase opacity-80">{date.jourCourt}</span>
                              <span className="text-2xl sm:text-3xl font-bold">{date.numero}</span>
                              <span className="text-xs uppercase opacity-80">{date.mois}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 sm:p-5">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <p className="text-xs text-foreground-muted uppercase tracking-wide mb-1">
                                    {getTypeLabel(event.type)}
                                  </p>
                                  <h4 className="font-semibold text-foreground">
                                    {event.titre}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-foreground-muted">
                                  <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {event.heure}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    {event.ville}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA Contact */}
        <section className="py-16 bg-primary mt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Vous souhaitez nous rencontrer ?
            </h2>
            <p className="text-lg text-primary-light max-w-2xl mx-auto mb-8">
              Contactez-nous pour organiser un rendez-vous personnalisé.
            </p>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-accent-light transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
