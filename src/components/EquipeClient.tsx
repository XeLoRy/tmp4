"use client";

import { useState } from "react";
import type { Membre } from "@/lib/content";

interface EquipeClientProps {
  membres: Membre[];
  photoGroupe?: string;
}

export default function EquipeClient({ membres, photoGroupe }: EquipeClientProps) {
  const [selectedMembre, setSelectedMembre] = useState<Membre | null>(null);
  const [hoveredMembre, setHoveredMembre] = useState<string | null>(null);

  return (
    <>
      {/* Photo de groupe interactive */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
            {photoGroupe ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoGroupe}
                alt="Photo de groupe de l'équipe"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 35%' }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-foreground-muted bg-primary-light/20">
                <p>Photo de groupe à ajouter</p>
              </div>
            )}

            {/* Zones cliquables - cercles visibles pour positionnement */}
            {membres.map((membre) => (
              <button
                key={membre.slug}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${membre.position.x}%`,
                  top: `${membre.position.y}%`,
                }}
                onClick={() => setSelectedMembre(membre)}
                onMouseEnter={() => setHoveredMembre(membre.slug)}
                onMouseLeave={() => setHoveredMembre(null)}
                aria-label={`Voir le profil de ${membre.nom}`}
              >
                {/* Cercle cliquable - très subtil */}
                <span
                  className={`
                    block w-10 h-10 sm:w-12 sm:h-12 rounded-full
                    border border-white/15 bg-transparent
                    transition-all duration-300 ease-out
                    ${hoveredMembre === membre.slug
                      ? 'bg-white/30 border-white/70 ring-2 ring-white/50 scale-110'
                      : 'hover:bg-white/15 hover:border-white/40'}
                  `}
                />

                {/* Tooltip au survol */}
                {hoveredMembre === membre.slug && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {membre.nom}
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="text-center text-foreground-muted mt-4 text-sm">
            Survolez et cliquez sur un membre de l&apos;équipe pour en savoir plus
          </p>
        </div>
      </section>

      {/* Grille alternative */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
            {membres.map((membre) => (
              <button
                key={membre.slug}
                onClick={() => setSelectedMembre(membre)}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all text-center"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto rounded-full bg-primary-light/30 mb-4 flex items-center justify-center text-primary font-semibold text-4xl sm:text-5xl overflow-hidden">
                  {membre.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={membre.photo} alt={membre.nom} className="w-full h-full object-cover" />
                  ) : (
                    membre.nom.split(" ").map(n => n[0]).join("")
                  )}
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base sm:text-lg">
                  {membre.nom}
                </h3>
                <p className="text-sm text-foreground-muted truncate">
                  {membre.profession}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMembre && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setSelectedMembre(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-20 h-20 rounded-full bg-primary-light/30 flex items-center justify-center text-primary font-semibold text-2xl overflow-hidden">
                {selectedMembre.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedMembre.photo} alt={selectedMembre.nom} className="w-full h-full object-cover" />
                ) : (
                  selectedMembre.nom.split(" ").map(n => n[0]).join("")
                )}
              </div>
              <button
                onClick={() => setSelectedMembre(null)}
                className="text-foreground-muted hover:text-foreground p-1"
                aria-label="Fermer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h3 className="text-xl font-bold text-foreground">
              {selectedMembre.nom}
            </h3>
            <p className="text-primary font-medium">
              {selectedMembre.role}
            </p>
            <p className="text-foreground-muted mb-3">
              {selectedMembre.profession}
            </p>

            {/* Infos avec pictogrammes */}
            <div className="flex flex-wrap gap-3 text-sm text-foreground-muted mb-4">
              {selectedMembre.age && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedMembre.age} ans
                </span>
              )}
              {selectedMembre.hameau && selectedMembre.village && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedMembre.hameau} - {selectedMembre.village}
                </span>
              )}
              {selectedMembre.enfants !== undefined && selectedMembre.enfants > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {selectedMembre.enfants} enfant{selectedMembre.enfants > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {selectedMembre.motivation && selectedMembre.motivation !== "À compléter" && (
              <div className="bg-background rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Pourquoi je m&apos;engage :
                </p>
                <p className="text-foreground-muted italic">
                  &ldquo;{selectedMembre.motivation}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
