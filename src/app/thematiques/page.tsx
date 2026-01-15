"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const thematiquesData = [
  {
    slug: "citoyennete",
    title: "Citoyenneté",
    icon: "🗳️",
    subtitle: "Remettre de la citoyenneté dans la vie du village",
    objectif: "Une équipe municipale à l'écoute, vouée à la collectivité et non aux intérêts personnels",
    engagements: [
      {
        titre: "Écouter et impliquer les habitants : renforcer la participation citoyenne",
        actions: [
          "Permanences hebdomadaires du Maire et/ou un adjoint tous les samedis matin",
          "Commissions ouvertes aux élus et habitants volontaires",
          "Création et mise en place d'un conseil municipal jeune",
          "Création d'un relais citoyen au sein de chaque hameau",
          "Participation des habitants sur les sujets importants : consultations, réunions publiques, référendum",
          "Gestion transparente (finances, urbanisme,...) avec un élu référent par thématique clairement identifié"
        ]
      },
      {
        titre: "Défendre les intérêts de la commune et de ses habitants avec les partenaires institutionnels",
        actions: [
          "Avoir un partenariat exigeant avec la CCFG : participation constructive mais défense de nos intérêts",
          "Lors d'un projet, consultation et implication de toutes les associations concernées",
          "Construire les projets en étroite collaboration avec nos partenaires institutionnels (Département, Région,…)",
          "Communiquer sur les compétences des différents partenaires d'une Mairie"
        ]
      },
      {
        titre: "Communication claire et régulière",
        actions: [
          "Site web actualisé, bulletin municipal, informations via les réseaux sociaux (Facebook/Instagram)",
          "Transparence des actions et décisions sur le site internet, réseaux, et sur l'info du mois",
          "Info bi-mensuelle (site + papier)",
          "Publication annuelle d'un journal communal ouvert aux élus et aux non élus",
          "Panneau information entretenu et à jour dans chaque hameau",
          "Comptes rendus complets du conseil municipal affichés sur les panneaux de la Mairie"
        ]
      }
    ]
  },
  {
    slug: "solidarite",
    title: "Cohésion et Solidarité",
    icon: "🤝",
    subtitle: "Soutenir jeunesse, familles, séniors et renforcer les liens intergénérationnels",
    objectif: "Une commune dynamique et solidaire où il fait bon grandir, s'épanouir et vieillir",
    engagements: [
      {
        titre: "Entraide à toutes les générations",
        actions: [
          "Proposer des rencontres inter-générations autour d'une thématique",
          "Lancer une application Glières-Val-de-Borne qui propose du covoiturage, un service d'entraide pour tous",
          "Créer un lieu de rencontre intergénérationnelle avec jeux de société, babyfoot, ping-pong, etc.",
          "Créer des logements pour les personnes âgées ou handicapées pour qu'elles restent au village",
          "Construction d'une grande salle « tiers-lieu » au centre du Petit-Bornand, lieu d'échange associatif, de partage et de rencontre"
        ]
      },
      {
        titre: "Soutenir les écoles",
        actions: [
          "Augmentation de l'aide financière pour les sorties pédagogiques et projets culturels",
          "Créer des espaces d'ombre pour l'été dans les 2 écoles",
          "Création d'un poste d'ETAPS pour le sport scolaire et les activités extrascolaires",
          "Création d'une salle de motricité à l'école Tom Morel",
          "Mettre en place des études encadrées par des enseignants volontaires"
        ]
      },
      {
        titre: "Favoriser le sport-santé",
        actions: [
          "Intervention de l'ETAPS auprès des seniors",
          "Accompagnement des publics vers différentes activités sportives",
          "Dynamisation générale du secteur sportif communal",
          "Réflexion autour de la création d'un pôle compétition en ski nordique",
          "Étude de faisabilité d'un centre sportif dédié au « Padel »",
          "Mise en place d'un chèque sport/culture pour tous les jeunes de la Commune de 4 à 20 ans"
        ]
      }
    ]
  },
  {
    slug: "vie-locale",
    title: "Vie Locale",
    icon: "🏔️",
    subtitle: "Renforcer la vie locale et le lien social",
    objectif: "Des équipements et services de proximité pour tous les habitants",
    engagements: [
      {
        titre: "Construction d'une Maison médicale à Petit-Bornand",
        actions: [
          "Étude de faisabilité d'un nouveau bâtiment sur les terrains communaux du centre",
          "Consultation publique et/ou Référendum sur le projet",
          "Montage des dossiers de financement et de subventions en collaboration avec les partenaires institutionnels",
          "Mise en œuvre et réalisation de la Maison médicale durant le mandat"
        ]
      },
      {
        titre: "Valoriser les associations et encourager les initiatives locales",
        actions: [
          "Construire une grande salle « tiers-lieu » au centre du Petit-Bornand pour les associations, les réunions publiques et les fêtes privées",
          "Apporter un réel soutien aux associations par tous les moyens dont dispose la Commune (humains, financiers, locaux)",
          "Organiser une soirée pour remercier et valoriser les associations",
          "Mettre en avant les associations via les réseaux sociaux et panneaux d'affichage",
          "Reprise par la Commune de la gestion de la cantine et du péri-scolaire à Entremont"
        ]
      },
      {
        titre: "Création d'une salle de motricité et d'un réfectoire à l'école d'Entremont",
        actions: [
          "Associer le nouveau réfectoire et la nouvelle salle de motricité dans un même projet, en liaison avec la CCFG",
          "Anticiper la possibilité d'une future cantinière (cuisine aux normes, attentes, normes d'hygiène)",
          "Associer l'APE et l'équipe enseignante au projet",
          "Avoir un suivi précis du chantier"
        ]
      },
      {
        titre: "Mobilités douces, sécurisation",
        actions: [
          "Entretien et nettoyage des sentiers",
          "Étude et réalisation d'un passage à mobilité douce entre La Puya et La Ville",
          "Aires de covoiturage aux 2 extrémités de la Commune avec 1 application dédiée",
          "Réhabilitation des abris-bus et créations de parkings à vélo à proximité",
          "Mise à disposition d'une navette et d'un chauffeur pour les projets des écoles",
          "Création/réfections des liaisons douces entre les hameaux",
          "Aménagement d'aires de croisement sur la vieille route des Evaux",
          "Rétablissement de l'éclairage public"
        ]
      }
    ]
  },
  {
    slug: "economie",
    title: "Économie et Environnement",
    icon: "🌿",
    subtitle: "Préserver et valoriser l'économie locale",
    objectif: "Être acteurs d'un développement raisonné",
    engagements: [
      {
        titre: "Soutenir agriculteurs et producteurs locaux, favoriser les circuits-courts",
        actions: [
          "Favoriser l'installation de nouveaux agriculteurs sur notre territoire et d'un maraîcher",
          "Entretenir notre caractère rural en préservant les terres agricoles pour les agriculteurs",
          "Ouverture de la route de tous nos alpages (y compris Lessy et les Auges)",
          "Mise en place du nouveau PLU et réflexion autour de la gestion des terrains agricoles",
          "Créer un point de rencontre avec des produits locaux"
        ]
      },
      {
        titre: "Économie",
        actions: [
          "Étudier la faisabilité d'une zone artisanale pour favoriser l'installation des jeunes artisans de la Commune",
          "Agrandir et déplacer le marché dominical en l'installant sur les terrains communaux au centre",
          "Financer un distributeur de produits locaux",
          "Mettre en place une véritable politique de gestion environnementale et financière de nos forêts avec l'ONF",
          "Favoriser l'affouage pour entretenir nos forêts et permettre aux habitants de se chauffer à moindre coût"
        ]
      },
      {
        titre: "Préserver notre environnement",
        actions: [
          "Mettre en place une « Journée de la Commune » en mobilisant tous les volontaires pour des travaux d'aménagement",
          "Aller vers l'assainissement collectif pour chaque hameau",
          "Apporter un réel soutien financier aux écoles pour des ateliers autour de l'environnement",
          "Établir une fresque climat",
          "Préserver l'alpage de Cenise et garder sa vocation agricole",
          "1 habitant = 1 poule"
        ]
      }
    ]
  },
  {
    slug: "rayonnement",
    title: "Rayonnement",
    icon: "✨",
    subtitle: "Faire rayonner notre territoire",
    objectif: "Faire de chacun d'entre nous un ambassadeur fier de son territoire",
    engagements: [
      {
        titre: "Aider au développement d'événements et de manifestations culturelles, sportives",
        actions: [
          "Soutenir les fêtes de village (moyens financiers, humains, matériel)",
          "Établir des lieux de décollage et atterrissage labellisés FFVL pour le parapente",
          "Installer sapins de Noël et illuminations dans les 2 villages",
          "Étudier la mise en place d'un festival de musique classique autour de l'Abbaye",
          "Organiser un grand « son et lumière » retraçant l'histoire de la vallée du Borne"
        ]
      },
      {
        titre: "Préserver et valoriser le patrimoine naturel et culturel",
        actions: [
          "Constituer un réservoir de « personnes-ressource » afin d'en faire les gardiens et les vecteurs de nos richesses patrimoniales",
          "Entretenir et valoriser le bâti patrimonial (chapelles des hameaux, fours à bois,…)",
          "Soutenir les chasseurs et les pêcheurs dans la préservation de notre faune naturelle",
          "Valoriser et développer le camping municipal"
        ]
      },
      {
        titre: "Tourisme",
        actions: [
          "Renforcer l'identité propre de GVDB en affirmant son caractère de village de montagne",
          "Développer l'image du tourisme responsable en valorisant les endroits calmes et discrets",
          "Aménager des itinéraires de ski de randonnée",
          "Organiser des promenades gourmandes pour faire connaître nos produits locaux et nos sentiers"
        ]
      }
    ]
  }
];

export default function ThematiquesPage() {
  const [expandedEngagements, setExpandedEngagements] = useState<Record<string, boolean>>({});

  const toggleEngagement = (themeSlug: string, engIndex: number) => {
    const key = `${themeSlug}-${engIndex}`;
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
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-5xl">{theme.icon}</span>
                        <h2 className="text-2xl font-bold text-foreground">
                          {theme.title}
                        </h2>
                      </div>
                      <p className="text-lg text-primary font-medium mb-6 ml-16">
                        {theme.subtitle}
                      </p>

                      {/* Engagements */}
                      <div className="space-y-4">
                        {theme.engagements.map((engagement, engIndex) => {
                          const key = `${theme.slug}-${engIndex}`;
                          const isExpanded = expandedEngagements[key];
                          return (
                            <div key={engIndex} className="bg-background rounded-xl overflow-hidden">
                              <button
                                onClick={() => toggleEngagement(theme.slug, engIndex)}
                                className="w-full p-4 flex items-start gap-3 text-left hover:bg-background-alt transition-colors"
                              >
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
                                <span className="flex-1 font-medium text-foreground">
                                  {engagement.titre}
                                </span>
                                <span className="text-sm text-primary font-medium flex items-center gap-1">
                                  Voir les actions
                                  <svg
                                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </span>
                              </button>
                              {isExpanded && (
                                <div className="px-4 pb-4">
                                  <ul className="ml-8 space-y-2 border-l-2 border-primary/30 pl-4">
                                    {engagement.actions.map((action, actionIndex) => (
                                      <li key={actionIndex} className="text-sm text-foreground-muted">
                                        {action}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Objectif */}
                      <div className="border-t border-gray-100 pt-6 mt-6">
                        <h3 className="font-semibold text-primary mb-2">
                          Notre objectif :
                        </h3>
                        <p className="text-lg text-foreground-muted italic">
                          {theme.objectif}
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
