"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface EngagementDetail {
  titre: string;
  actions: string[];
}

interface ThematiqueDetail {
  slug: string;
  title: string;
  icon: string;
  description: string;
  ordre: number;
  engagements: EngagementDetail[];
  objectif: string;
}

export default function ProgrammeClient({ thematiquesData }: { thematiquesData: ThematiqueDetail[] }) {
  const [expandedEngagements, setExpandedEngagements] = useState<Record<string, boolean>>({});
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav when scrolled past the main navigation
      if (navRef.current) {
        const navBottom = navRef.current.getBoundingClientRect().bottom;
        setShowStickyNav(navBottom < 0);
      }

      // Detect active section
      const sections = thematiquesData.map(t => t.slug);
      for (const slug of [...sections].reverse()) {
        const element = document.getElementById(slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(slug);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thematiquesData]);

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

      {/* Sticky Navigation */}
      <div
        className={`fixed top-16 sm:top-24 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 ${
          showStickyNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="flex gap-3 sm:gap-2 overflow-x-auto scrollbar-hide justify-start sm:justify-center px-2">
            {thematiquesData.map((theme) => (
              <a
                key={theme.slug}
                href={`#${theme.slug}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeSection === theme.slug
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-background-alt text-foreground-muted"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={theme.icon} alt="" className="w-5 h-5" />
                <span className="text-sm font-medium">{theme.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <main id="main-content" className="min-h-screen">
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
            <div ref={navRef} className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {thematiquesData.map((theme) => (
                <a
                  key={theme.slug}
                  href={`#${theme.slug}`}
                  className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={theme.icon} alt={theme.title} className="w-12 h-12 mb-2" />
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
                  className="scroll-mt-32"
                >
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={theme.icon} alt={theme.title} className="w-14 h-14" />
                        <h2 className="text-2xl font-bold text-foreground">
                          {theme.title}
                        </h2>
                      </div>

                      {/* Engagements */}
                      <div className="space-y-4">
                        {theme.engagements.map((engagement, engIndex) => {
                          const key = `${theme.slug}-${engIndex}`;
                          const isExpanded = expandedEngagements[key];
                          return (
                            <div key={engIndex} className="bg-background rounded-xl overflow-hidden">
                              <button
                                onClick={() => toggleEngagement(theme.slug, engIndex)}
                                className="w-full p-4 text-left hover:bg-background-alt transition-colors"
                              >
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
                                  <span className="flex-1 font-medium text-foreground">
                                    {engagement.titre}
                                  </span>
                                  {/* Sur desktop: à côté du titre */}
                                  <span className="hidden sm:flex text-sm text-primary font-medium items-center gap-1">
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
                                </div>
                                {/* Sur mobile: en dessous du titre */}
                                <span className="flex sm:hidden text-sm text-primary font-medium items-center gap-1 mt-2 ml-8">
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
                                      <li key={actionIndex} className="text-sm text-foreground-muted flex items-start gap-2">
                                        <span className="text-primary font-bold">&bull;</span>
                                        <span>{action}</span>
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
                        <p className="text-lg text-foreground font-semibold">
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
            <p className="text-lg text-white mb-8">
              Participez à notre enquête citoyenne pour enrichir notre projet
            </p>
            <a
              href="/participer#enquete"
              className="inline-flex justify-center rounded-full bg-white border-2 border-transparent px-8 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-white hover:border-white transition-colors"
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
