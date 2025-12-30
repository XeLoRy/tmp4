import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getEvenements } from "@/lib/content";

export default function AgendaPage() {
  const evenements = getEvenements();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return {
      jour: jours[date.getDay()],
      numero: date.getDate(),
      mois: mois[date.getMonth()],
      annee: date.getFullYear()
    };
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "reunion": return "Réunion publique";
      case "permanence": return "Permanence";
      case "porte-a-porte": return "Porte-à-porte";
      case "marche": return "Marché";
      default: return "Événement";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reunion": return "bg-primary text-white";
      case "permanence": return "bg-blue-500 text-white";
      case "porte-a-porte": return "bg-orange-500 text-white";
      case "marche": return "bg-purple-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Agenda
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Retrouvez-nous lors de nos prochains rendez-vous
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-light/30 hidden sm:block" />

              <div className="space-y-8">
                {evenements.map((event, index) => {
                  const date = formatDate(event.date);
                  return (
                    <div key={event.slug} className="relative flex gap-6">
                      {/* Point sur la timeline */}
                      <div className="hidden sm:flex flex-shrink-0 w-16 items-start justify-center pt-2">
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10" />
                      </div>

                      {/* Carte événement */}
                      <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                          {/* Badge type */}
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getTypeColor(event.type)}`}>
                            {getTypeLabel(event.type)}
                          </span>

                          {/* Date et heure */}
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-foreground">
                              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-semibold">
                                {date.jour} {date.numero} {date.mois} {date.annee}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground-muted">
                              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{event.heure}</span>
                            </div>
                          </div>

                          {/* Titre */}
                          <h2 className="text-xl font-bold text-foreground mb-2">
                            {event.titre}
                          </h2>

                          {/* Lieu */}
                          <div className="flex items-start gap-2 text-foreground-muted mb-3">
                            <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.lieu}, {event.ville}</span>
                          </div>

                          {/* Description */}
                          <p className="text-foreground-muted">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Vous souhaitez nous rencontrer ?
            </h2>
            <p className="text-lg text-primary-light max-w-2xl mx-auto mb-8">
              Vous ne pouvez pas vous rendre à nos réunions publiques ?
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
