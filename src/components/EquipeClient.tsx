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
                style={{ objectPosition: '50% 38%', transform: 'scale(1.8)' }}
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
                {/* Cercle cliquable */}
                <span
                  className={`
                    block w-10 h-10 sm:w-12 sm:h-12 rounded-full
                    border-2 border-white/60 bg-white/20
                    transition-all duration-300 ease-out
                    ${hoveredMembre === membre.slug
                      ? 'bg-white/40 ring-4 ring-white scale-110'
                      : 'hover:bg-white/30'}
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
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Découvrez nos {membres.length} candidats
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {membres.map((membre) => (
              <button
                key={membre.slug}
                onClick={() => setSelectedMembre(membre)}
                className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition-all text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-primary-light/30 mb-3 flex items-center justify-center text-primary font-semibold text-lg sm:text-xl overflow-hidden">
                  {membre.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={membre.photo} alt={membre.nom} className="w-full h-full object-cover" />
                  ) : (
                    membre.nom.split(" ").map(n => n[0]).join("")
                  )}
                </div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                  {membre.nom}
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted truncate">
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
            <p className="text-foreground-muted mb-4">
              {selectedMembre.profession}
            </p>

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
