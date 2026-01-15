"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getThematiques } from "@/lib/content";

// Import statique des thématiques côté client
const thematiquesData = [
  {
    slug: "citoyennete",
    title: "Citoyenneté",
    icon: "🗳️",
    description: "Une équipe municipale à l'écoute, responsable et tournée vers l'avenir",
    engagements: [
      "Écouter et impliquer les habitants : consultations publiques, réunions, ateliers participatifs",
      "Créer un lien direct élus/habitants avec des permanences régulières",
      "Démocratie participative : sondages, boîtes à idées",
      "Gestion transparente des finances et de l'urbanisme",
      "Communication claire et régulière : site web, bulletin municipal, réseaux sociaux"
    ],
    actions: [
      "Organiser des consultations publiques sur les grands projets",
      "Mettre en place des réunions thématiques et ateliers participatifs",
      "Créer des permanences régulières des élus",
      "Proposer un accompagnement aux démarches administratives",
      "Publier des comptes rendus accessibles et compréhensibles",
      "Défendre les intérêts de la commune dans l'intercommunalité"
    ]
  },
  {
    slug: "solidarite",
    title: "Solidarité & Services",
    icon: "🤝",
    description: "Renforcer l'accès aux soins, à l'éducation et aux services de proximité",
    engagements: [
      "Construire une Maison Médicale à Petit-Bornand",
      "Construire un réfectoire et une salle de motricité à l'école d'Entremont",
      "Développer les services à la personne et les aides sociales",
      "Améliorer la mobilité et les transports",
      "Soutenir les familles et les seniors"
    ],
    actions: [
      "Étudier et lancer le projet de Maison Médicale",
      "Planifier la construction du réfectoire à Entremont",
      "Renforcer le CCAS et les aides sociales",
      "Améliorer les transports à la demande",
      "Créer des activités intergénérationnelles"
    ]
  },
  {
    slug: "vie-locale",
    title: "Vie Locale & Patrimoine",
    icon: "🏔️",
    description: "Préserver notre identité tout en dynamisant la vie du village",
    engagements: [
      "Conserver et réhabiliter la Maison Pédat",
      "Soutenir les associations et la vie culturelle",
      "Valoriser notre patrimoine historique et naturel",
      "Organiser des événements festifs et rassembleurs",
      "Développer les équipements sportifs et de loisirs"
    ],
    actions: [
      "Lancer l'étude de réhabilitation de la Maison Pédat",
      "Augmenter le soutien aux associations",
      "Créer des parcours patrimoine",
      "Organiser des fêtes villageoises",
      "Améliorer les équipements sportifs existants"
    ]
  },
  {
    slug: "economie",
    title: "Économie & Environnement",
    icon: "🌿",
    description: "Être acteur d'un développement raisonné",
    engagements: [
      "Soutenir agriculteurs, producteurs locaux et circuits courts",
      "Sécuriser les alpages",
      "Gestion responsable de l'eau, des déchets et de l'énergie",
      "Préparer l'avenir de l'eau à horizon 2050",
      "Sensibiliser les jeunes à l'environnement"
    ],
    actions: [
      "Favoriser les circuits courts et la vente directe",
      "Sécuriser et entretenir les alpages",
      "Optimiser la gestion des déchets",
      "Engager une réflexion sur l'eau à long terme",
      "Créer des programmes de sensibilisation environnementale"
    ]
  },
  {
    slug: "territoire",
    title: "Aménagement & Cadre de Vie",
    icon: "🏡",
    description: "Un développement harmonieux et maîtrisé du territoire",
    engagements: [
      "Rétablir les finances de la Commune sans augmenter les impôts",
      "Maîtriser l'urbanisme et préserver les paysages",
      "Améliorer les infrastructures routières et la sécurité",
      "Développer le numérique et la connectivité",
      "Entretenir et embellir l'espace public"
    ],
    actions: [
      "Réaliser un audit financier complet",
      "Réviser le PLU avec les habitants",
      "Sécuriser les points noirs routiers",
      "Améliorer la couverture numérique",
      "Entretenir les espaces verts et fleurir le village"
    ]
  }
];

export default function ThematiquesPage() {
  const [expandedEngagements, setExpandedEngagements] = useState<Record<string, boolean>>({});

  const toggleEngagement = (themeSlug: string, index: number) => {
    const key = `${themeSlug}-${index}`;
    setExpandedEngagements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Notre programme
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-10">
              Découvrez notre projet pour construire ensemble l&apos;avenir de Glières-Val-de-Borne
            </p>

            {/* Navigation par icônes */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {thematiquesData.map((theme) => (
                <a
                  key={theme.slug}
                  href={`#${theme.slug}`}
                  className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  <span className="text-4xl mb-2">{theme.icon}</span>
                  <span className="text-sm font-medium text-foreground-muted group-hover:text-primary transition-colors">
                    {theme.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Thématiques */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {thematiquesData.map((theme) => (
                <article
                  key={theme.slug}
                  id={theme.slug}
                  className="scroll-mt-24"
                >
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{theme.icon}</span>
                        <h2 className="text-2xl font-bold text-foreground">
                          {theme.title}
                        </h2>
                      </div>

                      <div className="bg-background rounded-xl p-6 mb-6">
                        <h3 className="font-semibold text-foreground mb-4">
                          Nos engagements :
                        </h3>
                        <ul className="space-y-4">
                          {theme.engagements.map((engagement, i) => {
                            const key = `${theme.slug}-${i}`;
                            const isExpanded = expandedEngagements[key];
                            return (
                              <li key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-start gap-3">
                                  <svg
                                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <div className="flex-1">
                                    <span className="text-foreground-muted">
                                      {engagement}
                                    </span>
                                    {theme.actions && theme.actions[i] && (
                                      <>
                                        <button
                                          onClick={() => toggleEngagement(theme.slug, i)}
                                          className="mt-2 text-sm text-primary font-medium hover:underline flex items-center gap-1"
                                        >
                                          Voir les actions
                                          <svg
                                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        </button>
                                        {isExpanded && (
                                          <div className="mt-3 pl-4 border-l-2 border-primary/30 text-sm text-foreground-muted">
                                            {theme.actions[i]}
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="font-semibold text-primary mb-2">
                          Notre objectif :
                        </h3>
                        <p className="text-lg text-foreground-muted italic">
                          {theme.description}
                        </p>
                      </div>

                      {/* Revenir au haut de page */}
                      <div className="mt-6 text-center">
                        <button
                          onClick={scrollToTop}
                          className="text-sm text-foreground-muted hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          Revenir au haut de page
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Ce programme vous parle ?
            </h2>
            <p className="text-lg text-primary-light mb-8">
              Participez à notre enquête citoyenne pour enrichir notre projet
            </p>
            <a
              href="/participer#enquete"
              className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-accent-light transition-colors"
            >
              Donner mon avis
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
