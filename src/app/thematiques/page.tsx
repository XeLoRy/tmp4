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
    objectif: "Une équipe municipale à l'écoute, responsable et tournée vers l'avenir.",
    engagements: [
      {
        titre: "Écouter et impliquer les habitants : renforcer la participation citoyenne",
        actions: [
          "Permanences hebdomadaires du Maire et/ou un adjoint tous les samedis matin",
          "Commissions ouvertes aux élus et habitants volontaires",
          "Création et mise en place d'un conseil municipal des jeunes",
          "Participation des habitants sur les sujets importants : consultations, réunions publiques, référendum",
          "Gestion transparente (finances, urbanisme,...) avec un élu référent par thématique clairement identifié et disponible"
        ]
      },
      {
        titre: "Défendre les intérêts de la Commune et de ses habitants avec les partenaires institutionnels",
        actions: [
          "Avoir un partenariat exigeant avec la CCFG : participation constructive mais défense de nos intérêts",
          "Consultation et implication de toutes les associations et acteurs concernés dans la conception des projets",
          "Construire les projets en étroite collaboration avec nos partenaires institutionnels (Département, Région,…)",
          "Communiquer sur les compétences des différents partenaires d'une Mairie"
        ]
      },
      {
        titre: "Communication claire et régulière",
        actions: [
          "Site internet régulièrement mis à jour",
          "Bulletin municipal annuel et lettres d'information mensuelles",
          "Réseaux sociaux",
          "Affichage public d'informations de la vie municipale"
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
          "Accompagnement des habitants pour faciliter leur vie quotidienne grâce aux outils digitaux (covoiturage, démarches administratives, services à la personne, entraide entre habitants...)",
          "Soutenir la mise en place de rencontres intergénérationnelles entre les enfants des écoles et les anciens du village",
          "Aménager des lieux de rencontre intergénérationnelle (jeux de société, babyfoot, ping-pong, etc)"
        ]
      },
      {
        titre: "Soutenir les écoles",
        actions: [
          "Création d'un poste d'éducateur sportif (ETAPS) pour le sport scolaire et les activités extrascolaires",
          "Créer des espaces d'ombre pour l'été dans les 2 écoles",
          "Mettre en place un accompagnement aux devoirs après la classe",
          "Augmentation de l'aide financière pour les sorties pédagogiques"
        ]
      },
      {
        titre: "Favoriser le sport-santé",
        actions: [
          "Mise en place d'un chèque sport/culture pour tous les jeunes de la Commune de 4 à 20 ans",
          "Réflexion autour de la création d'un pôle compétition en ski nordique",
          "Étude du réaménagement de l'ancien stade du Petit Bornand en un espace multisport (tennis, padel, sports collectifs…)",
          "Intervention de l'ETAPS auprès des seniors"
        ]
      }
    ]
  },
  {
    slug: "vie-locale",
    title: "Vie Locale",
    icon: "🏔️",
    subtitle: "Renforcer la vie locale et le lien social entre les habitants",
    objectif: "Des équipements et services de proximité pour tous les habitants",
    engagements: [
      {
        titre: "Construction d'un centre de services de proximité au Petit-Bornand",
        actions: [
          "Une Maison médicale (médecin, cabinet d'infirmière libérale, professions paramédicales, espace bien-être…)",
          "Une salle polyvalente pour les associations, les réunions publiques et les fêtes privées (anniversaires, baptêmes, cousinades,…)",
          "Des logements adaptés pour personnes âgées en perte d'autonomie pour qu'elles restent au village",
          "Un dispositif d'hébergements d'urgence"
        ]
      },
      {
        titre: "Valoriser les associations et encourager les initiatives locales",
        actions: [
          "Création d'un service à la vie associative pour apporter un réel soutien aux associations par tous les moyens dont dispose la Commune (humains, financiers, locaux à disposition, communication, planning des rendez-vous associatifs…)",
          "Organiser une soirée pour remercier et valoriser les associations",
          "Harmoniser la gestion de la cantine et du péri-scolaire entre les écoles du Petit-Bornand et d'Entremont"
        ]
      },
      {
        titre: "Création d'une salle de motricité et d'un réfectoire à l'école d'Entremont",
        actions: [
          "Associer le nouveau réfectoire et la nouvelle salle de motricité dans un même projet, en liaison avec la CCFG",
          "Anticiper la possibilité d'une future cuisine sur place",
          "Associer l'APE et l'équipe enseignante au projet"
        ]
      },
      {
        titre: "Mobilités douces, sécurisation",
        actions: [
          "Étude et réalisation d'un passage à mobilité douce reliant les deux villages en concertation avec les propriétaires et les habitants",
          "Stimuler le covoiturage entre les habitants",
          "Réhabilitation des abris-bus et sécurisation, créations de parkings-vélo à proximité",
          "Création/réfections des liaisons douces entre les hameaux",
          "Sécurisation des voies piétonnes sur la RD12 en concertation avec la CCFG",
          "Rétablissement de l'éclairage public à des horaires adaptés pour la sécurité"
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
          "Entretenir notre caractère rural en préservant les terres agricoles pour nos agriculteurs",
          "Étudier le projet d'installation d'un maraîcher sur la Commune ou mener un état des lieux des espaces naturels accessibles pour installer des agriculteurs diversifiés à échelle humaine (maraîchers, arboriculteurs, céréaliers)",
          "Garantir l'accès aux alpages pour les agriculteurs et aux propriétaires (y compris Lessy et les Auges)",
          "Créer un annuaire des producteurs locaux à destination des habitants et des touristes"
        ]
      },
      {
        titre: "Soutenir le tissu économique",
        actions: [
          "Étudier la faisabilité d'une zone artisanale pour favoriser l'installation des jeunes artisans de la Commune",
          "Agrandir le marché dominical en l'installant sur les terrains communaux en connexion avec le centre de service de proximité",
          "Favoriser l'affouage pour entretenir nos forêts et permettre aux habitants de se chauffer à moindre coût",
          "Réflexion participative sur la gestion et l'avenir des bâtiments communaux (Ancienne Poste, maisons Pédat, Caouin, Dénarié,...)"
        ]
      },
      {
        titre: "Préserver notre environnement",
        actions: [
          "Mettre en place une « Journée de la Commune » en mobilisant tous les volontaires pour des travaux d'aménagement du village/collecte de déchets, avec garde d'enfants et repas citoyen",
          "Mettre en place une véritable politique de la gestion environnementale et financière de nos forêts avec l'ONF",
          "Faire un point sur l'assainissement collectif en cours pour chaque hameau et sa progression future",
          "Proposer des ateliers de sensibilisation autour de l'environnement aux écoles et aux habitants (fresque climat, faune et flore, gestion et préservation des ressources…)",
          "Préserver l'alpage de Cenise et garder sa vocation agricole"
        ]
      }
    ]
  },
  {
    slug: "rayonnement",
    title: "Rayonnement",
    icon: "✨",
    subtitle: "Faire rayonner notre territoire",
    objectif: "Faire de chacun d'entre nous un ambassadeur fier de son territoire et de son histoire",
    engagements: [
      {
        titre: "Aider au développement d'événements et de manifestations culturelles, sportives…",
        actions: [
          "Soutenir les fêtes de village (moyens financiers, humains, matériel)",
          "Installer sapins de Noël et illuminations dans les 2 villages",
          "Soutenir les initiatives de créations d'événements culturels (son et lumière, concerts, musique classique, conférences…)"
        ]
      },
      {
        titre: "Préserver et valoriser le patrimoine naturel et culturel",
        actions: [
          "Valoriser les acteurs du patrimoine de la commune pour préserver et transmettre nos richesses patrimoniales et historiques",
          "Entretenir et valoriser le bâti patrimonial (chapelles des hameaux, fours à bois,…)",
          "Soutenir les chasseurs et les pêcheurs dans la préservation et la sensibilisation de la gestion de la faune"
        ]
      },
      {
        titre: "Tourisme",
        actions: [
          "Renforcer l'identité propre de Glières-Val-de-Borne en affirmant son caractère de village de montagne",
          "Mise en place d'un guide pratique des services et activités du village (activités culturelles, sportives, de pleine nature, transports, hébergements, restauration…)",
          "Développer l'image d'un tourisme responsable en soutenant l'entretien et le nettoyage des sentiers et en valorisant durablement les espaces naturels",
          "Soutenir la mise en place de balades thématiques (produits locaux, artisanat, histoire…)",
          "Valoriser et développer les hébergements touristiques (camping municipal, gîtes, meublés…)"
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
