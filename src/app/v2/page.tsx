/**
 * PAGE D'ACCUEIL V2 - Design Audacieux
 * Route: /v2
 *
 * Direction esthétique : "Organique Éditorial"
 */

import Link from "next/link";

export default function HomeV2() {
  return (
    <>
      {/* Styles V2 inline */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        .v2-page {
          --primary: #1a3a2f;
          --primary-light: #2d5a4a;
          --accent: #e07b4c;
          --cream: #f5f0e8;
          --cream-dark: #e8dfd2;
          --sage: #9caa97;
          --moss: #5c7a5e;

          background: var(--cream);
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }

        .v2-page .font-display {
          font-family: 'Playfair Display', Georgia, serif;
        }

        .v2-page .title-dramatic {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 0.95;
        }

        .v2-page .grain-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
        }

        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .v2-page .reveal-up {
          animation: reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }

        .v2-page .reveal-delay-1 { animation-delay: 0.1s; }
        .v2-page .reveal-delay-2 { animation-delay: 0.2s; }
        .v2-page .reveal-delay-3 { animation-delay: 0.3s; }

        .v2-page .btn-primary {
          background: var(--primary);
          color: var(--cream);
          padding: 1rem 2.5rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .v2-page .btn-primary:hover {
          background: var(--accent);
        }

        .v2-page .btn-outline {
          border: 2px solid var(--cream);
          color: var(--cream);
          padding: 1rem 2.5rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .v2-page .btn-outline:hover {
          background: var(--cream);
          color: var(--primary);
        }

        .v2-page .hover-lift {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
        }

        .v2-page .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -15px rgba(26, 58, 47, 0.3);
        }

        .v2-page .line-accent {
          width: 60px;
          height: 3px;
          background: var(--accent);
        }

        .v2-page .organic-shape {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
      `}</style>

      <div className="v2-page min-h-screen">
        {/* Banner */}
        <div className="fixed top-0 left-0 right-0 z-[100] bg-accent text-center py-2 text-sm">
          <span className="text-white font-medium">Version 2 Preview</span>
          <Link href="/" className="ml-4 underline text-white/80 hover:text-white">
            ← Retour V1
          </Link>
        </div>

        {/* Navigation V2 */}
        <header className="fixed top-8 left-0 right-0 z-50 mix-blend-difference">
          <nav className="mx-auto max-w-7xl px-6 py-6 flex justify-between items-center">
            <Link href="/v2" className="text-white font-display text-2xl font-bold tracking-tight">
              UEC
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {['Équipe', 'Programme', 'Participer', 'Contact'].map((item) => (
                <span key={item} className="text-white text-sm uppercase tracking-widest opacity-70">
                  {item}
                </span>
              ))}
            </div>
          </nav>
        </header>

        <main>
          {/* HERO */}
          <section className="relative min-h-screen flex items-center grain-overlay overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/images/equipe-groupe.jpg"
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 40%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2f]/90 via-[#1a3a2f]/70 to-transparent" />
            </div>

            {/* Decorative blurs */}
            <div className="absolute -right-32 top-1/4 w-96 h-96 bg-[#e07b4c]/20 rounded-full blur-3xl" />
            <div className="absolute -left-20 bottom-1/4 w-64 h-64 bg-[#5c7a5e]/30 rounded-full blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
              <div className="max-w-4xl">
                <p className="reveal-up text-[#e07b4c] text-sm uppercase tracking-[0.3em] mb-6">
                  Élections Municipales 2026
                </p>

                <h1 className="reveal-up reveal-delay-1 title-dramatic text-[#f5f0e8] text-6xl sm:text-7xl lg:text-9xl mb-8">
                  Une Énergie
                  <br />
                  <span className="text-[#e07b4c]">Commune</span>
                </h1>

                <p className="reveal-up reveal-delay-2 text-[#f5f0e8]/80 text-xl sm:text-2xl max-w-xl mb-12 leading-relaxed font-light">
                  21 citoyens engagés pour bâtir ensemble l&apos;avenir de notre village
                </p>

                <div className="reveal-up reveal-delay-3 flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary">
                    Découvrir le projet
                  </button>
                  <button className="btn-outline">
                    Rencontrer l&apos;équipe
                  </button>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f5f0e8]/60">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-px h-12 bg-[#f5f0e8]/30" />
            </div>
          </section>

          {/* MOT DU CANDIDAT */}
          <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: '#f5f0e8' }}>
            <div className="absolute top-0 right-0 w-1/3 h-full" style={{ background: '#e8dfd2' }} />

            <div className="relative mx-auto max-w-7xl px-6">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 lg:-mt-40 relative">
                  <div className="organic-shape overflow-hidden shadow-2xl">
                    <img
                      src="/images/mm.png"
                      alt="Mickaël M."
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 p-6 shadow-xl" style={{ background: '#1a3a2f', color: '#f5f0e8' }}>
                    <p className="font-display text-3xl font-bold">21</p>
                    <p className="text-xs uppercase tracking-wider opacity-80">Colistiers</p>
                  </div>
                </div>

                <div className="lg:col-span-7 lg:pl-12">
                  <div className="line-accent mb-8" />
                  <h2 className="font-display text-4xl lg:text-5xl mb-8 leading-tight" style={{ color: '#1a3a2f' }}>
                    &ldquo;Notre village mérite une équipe à son écoute&rdquo;
                  </h2>
                  <blockquote className="text-lg lg:text-xl leading-relaxed mb-8 border-l-4 pl-6" style={{ color: '#4a5f56', borderColor: '#9caa97' }}>
                    Ensemble, avec nos colistiers issus de tous horizons, nous voulons renforcer
                    les liens entre générations, soutenir notre économie locale et faire de chaque
                    habitant un acteur de notre territoire.
                  </blockquote>
                  <div>
                    <p className="font-display text-xl font-semibold" style={{ color: '#1a3a2f' }}>Mickaël M.</p>
                    <p className="uppercase text-sm tracking-wider" style={{ color: '#e07b4c' }}>Tête de liste</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THÉMATIQUES */}
          <section className="py-24 lg:py-32 grain-overlay" style={{ background: '#1a3a2f' }}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-2xl mb-16">
                <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: '#e07b4c' }}>Notre vision</p>
                <h2 className="font-display text-4xl lg:text-6xl mb-6" style={{ color: '#f5f0e8' }}>
                  5 axes pour transformer notre village
                </h2>
                <div className="line-accent" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                {[
                  { icon: '🗳️', title: 'Citoyenneté', desc: 'Transparence et proximité', bg: '#5c7a5e' },
                  { icon: '👨‍👩‍👧‍👦', title: 'Solidarité', desc: 'Jeunesse et familles', bg: '#9caa97' },
                  { icon: '🏘️', title: 'Vie locale', desc: 'Liens entre habitants', bg: '#2d5a4a' },
                  { icon: '🌿', title: 'Environnement', desc: 'Développement durable', bg: '#5c7a5e' },
                  { icon: '⭐', title: 'Rayonnement', desc: 'Fierté du territoire', bg: '#e07b4c', dark: true },
                ].map((theme, i) => (
                  <div
                    key={theme.title}
                    className={`group p-8 lg:p-12 hover-lift cursor-pointer ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                    style={{ background: theme.bg }}
                  >
                    <span className="text-5xl lg:text-6xl mb-6 block opacity-80 group-hover:scale-110 transition-transform">
                      {theme.icon}
                    </span>
                    <h3 className="font-display text-2xl lg:text-3xl mb-2" style={{ color: theme.dark ? '#1a3a2f' : '#f5f0e8' }}>
                      {theme.title}
                    </h3>
                    <p className="text-sm uppercase tracking-wider" style={{ color: theme.dark ? '#1a3a2f' : '#f5f0e8', opacity: 0.7 }}>
                      {theme.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative py-24 lg:py-32" style={{ background: '#e07b4c' }}>
            <div className="relative mx-auto max-w-4xl px-6 text-center">
              <h2 className="font-display text-4xl lg:text-6xl mb-6" style={{ color: '#1a3a2f' }}>
                Votre avis compte
              </h2>
              <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#1a3a2f', opacity: 0.8 }}>
                Participez à notre enquête citoyenne et contribuez à construire
                le programme qui vous ressemble.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary" style={{ background: '#1a3a2f' }}>
                  Répondre à l&apos;enquête
                </button>
                <button className="btn-outline" style={{ borderColor: '#1a3a2f', color: '#1a3a2f' }}>
                  Soutenir la liste
                </button>
              </div>
            </div>
          </section>

          {/* CHIFFRES */}
          <section className="py-24 lg:py-32" style={{ background: '#e8dfd2' }}>
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                {[
                  { number: '21', label: 'Candidats engagés' },
                  { number: '5', label: 'Thématiques clés' },
                  { number: '100%', label: 'Transparence' },
                  { number: '∞', label: 'Énergie commune' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-6xl lg:text-8xl font-bold mb-2" style={{ color: '#1a3a2f' }}>
                      {stat.number}
                    </p>
                    <p className="uppercase tracking-wider text-sm" style={{ color: '#4a5f56' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-16" style={{ background: '#1a3a2f', color: '#f5f0e8' }}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="font-display text-3xl mb-4">Une Énergie Commune</h3>
                <p style={{ opacity: 0.6 }}>
                  21 citoyens engagés pour bâtir ensemble l&apos;avenir de notre village.
                </p>
              </div>
              <div>
                <h4 className="uppercase tracking-wider text-sm mb-4" style={{ color: '#e07b4c' }}>Navigation</h4>
                <ul className="space-y-2" style={{ opacity: 0.6 }}>
                  {['Accueil', 'Équipe', 'Programme', 'Actualités', 'Participer', 'Contact'].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="uppercase tracking-wider text-sm mb-4" style={{ color: '#e07b4c' }}>Contact</h4>
                <p style={{ opacity: 0.6 }}>contact@une-energie-commune.fr</p>
              </div>
            </div>
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(245,240,232,0.2)' }}>
              <p style={{ opacity: 0.4 }} className="text-sm">
                © 2025 Une Énergie Commune
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
