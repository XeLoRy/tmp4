/**
 * PAGE D'ACCUEIL V2 - Design Audacieux
 *
 * Direction esthétique : "Organique Éditorial"
 * - Typographie dramatique (Playfair Display)
 * - Palette terre/forêt avec accent terracotta
 * - Layouts asymétriques
 * - Animations d'entrée orchestrées
 * - Textures grain subtiles
 */

import Link from "next/link";

// Note: Ce fichier est une démonstration du design V2
// Pour l'utiliser, remplacer src/app/page.tsx par ce contenu
// et src/app/globals.css par globals-v2.css

export default function HomeV2() {
  return (
    <>
      {/* Navigation V2 - Minimaliste */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <nav className="mx-auto max-w-7xl px-6 py-6 flex justify-between items-center">
          <Link href="/" className="text-white font-display text-2xl font-bold tracking-tight">
            UEC
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {['Équipe', 'Programme', 'Participer', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-white text-sm uppercase tracking-widest hover:opacity-60 transition-opacity"
              >
                {item}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      <main>
        {/* HERO - Full Screen avec Titre Dramatique */}
        <section className="relative min-h-screen flex items-center grain-overlay overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/equipe-groupe.jpg"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 40%' }}
            />
            {/* Overlay dégradé diagonal */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-transparent" />
          </div>

          {/* Forme décorative */}
          <div className="absolute -right-32 top-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -left-20 bottom-1/4 w-64 h-64 bg-moss/30 rounded-full blur-3xl" />

          {/* Contenu */}
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
            <div className="max-w-4xl">
              {/* Supertitle */}
              <p className="reveal-up text-accent text-sm uppercase tracking-[0.3em] mb-6 font-body">
                Élections Municipales 2026
              </p>

              {/* Title */}
              <h1 className="reveal-up reveal-delay-1 title-dramatic text-cream text-6xl sm:text-7xl lg:text-9xl mb-8">
                Une Énergie
                <br />
                <span className="text-accent">Commune</span>
              </h1>

              {/* Subtitle */}
              <p className="reveal-up reveal-delay-2 text-cream/80 text-xl sm:text-2xl max-w-xl mb-12 leading-relaxed font-light">
                21 citoyens engagés pour bâtir ensemble l'avenir de notre village
              </p>

              {/* CTAs */}
              <div className="reveal-up reveal-delay-3 flex flex-col sm:flex-row gap-4">
                <Link href="/thematiques" className="btn-primary inline-flex items-center justify-center">
                  <span>Découvrir le projet</span>
                </Link>
                <Link href="/equipe" className="btn-outline border-cream text-cream hover:bg-cream hover:text-primary inline-flex items-center justify-center">
                  Rencontrer l'équipe
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-cream/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce" />
            </div>
          </div>
        </section>

        {/* MOT DU CANDIDAT - Layout Asymétrique */}
        <section className="py-24 lg:py-32 bg-cream relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-dark/50" />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Image - Offset vers le haut */}
              <div className="lg:col-span-5 lg:-mt-40 relative">
                <div className="organic-shape overflow-hidden shadow-2xl">
                  <img
                    src="/images/mm.png"
                    alt="Mickaël M."
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-cream p-6 shadow-xl">
                  <p className="font-display text-3xl font-bold">21</p>
                  <p className="text-xs uppercase tracking-wider opacity-80">Colistiers</p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7 lg:pl-12">
                <div className="line-accent mb-8" />
                <h2 className="font-display text-4xl lg:text-5xl text-primary mb-8 leading-tight">
                  "Notre village mérite une équipe à son écoute"
                </h2>
                <blockquote className="text-foreground-muted text-lg lg:text-xl leading-relaxed mb-8 border-l-4 border-sage pl-6">
                  Ensemble, avec nos colistiers issus de tous horizons, nous voulons renforcer
                  les liens entre générations, soutenir notre économie locale et faire de chaque
                  habitant un acteur de notre territoire.
                </blockquote>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-display text-xl text-primary font-semibold">Mickaël M.</p>
                    <p className="text-accent uppercase text-sm tracking-wider">Tête de liste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THÉMATIQUES - Grille Magazine */}
        <section className="py-24 lg:py-32 bg-primary grain-overlay">
          <div className="mx-auto max-w-7xl px-6">
            {/* Header */}
            <div className="max-w-2xl mb-16">
              <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">Notre vision</p>
              <h2 className="font-display text-4xl lg:text-6xl text-cream mb-6">
                5 axes pour transformer notre village
              </h2>
              <div className="line-accent" style={{ background: 'var(--accent)' }} />
            </div>

            {/* Grid - Style Magazine */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
              {[
                { icon: '🗳️', title: 'Citoyenneté', desc: 'Transparence et proximité', color: 'bg-moss' },
                { icon: '👨‍👩‍👧‍👦', title: 'Solidarité', desc: 'Jeunesse et familles', color: 'bg-sage' },
                { icon: '🏘️', title: 'Vie locale', desc: 'Liens entre habitants', color: 'bg-primary-light' },
                { icon: '🌿', title: 'Environnement', desc: 'Développement durable', color: 'bg-moss' },
                { icon: '⭐', title: 'Rayonnement', desc: 'Fierté du territoire', color: 'bg-accent', textDark: true },
              ].map((theme, i) => (
                <Link
                  key={theme.title}
                  href={`/thematiques#${theme.title.toLowerCase()}`}
                  className={`group relative p-8 lg:p-12 ${theme.color} hover-lift card-diagonal ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <span className="text-5xl lg:text-6xl mb-6 block opacity-80 group-hover:scale-110 transition-transform">
                    {theme.icon}
                  </span>
                  <h3 className={`font-display text-2xl lg:text-3xl mb-2 ${theme.textDark ? 'text-primary' : 'text-cream'}`}>
                    {theme.title}
                  </h3>
                  <p className={`text-sm uppercase tracking-wider ${theme.textDark ? 'text-primary/70' : 'text-cream/70'}`}>
                    {theme.desc}
                  </p>
                  <div className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity ${theme.textDark ? 'text-primary' : 'text-cream'}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Link */}
            <div className="mt-12 text-center">
              <Link href="/thematiques" className="inline-flex items-center gap-2 text-cream hover:text-accent transition-colors">
                <span className="uppercase tracking-widest text-sm">Voir tout le programme</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA - Full Width avec motif */}
        <section className="relative py-24 lg:py-32 bg-accent overflow-hidden">
          {/* Pattern SVG */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-display text-4xl lg:text-6xl text-primary mb-6">
              Votre avis compte
            </h2>
            <p className="text-primary/80 text-xl mb-12 max-w-2xl mx-auto">
              Participez à notre enquête citoyenne et contribuez à construire
              le programme qui vous ressemble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/participer#enquete" className="btn-primary bg-primary hover:bg-primary-dark inline-flex items-center justify-center">
                <span>Répondre à l'enquête</span>
              </Link>
              <Link href="/participer#soutenir" className="btn-outline border-primary text-primary hover:bg-primary hover:text-cream inline-flex items-center justify-center">
                Soutenir la liste
              </Link>
            </div>
          </div>
        </section>

        {/* CHIFFRES - Grandes Typo */}
        <section className="py-24 lg:py-32 bg-cream-dark">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {[
                { number: '21', label: 'Candidats engagés' },
                { number: '5', label: 'Thématiques clés' },
                { number: '100%', label: 'Transparence' },
                { number: '∞', label: 'Énergie commune' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-6xl lg:text-8xl text-primary font-bold mb-2">
                    {stat.number}
                  </p>
                  <p className="text-foreground-muted uppercase tracking-wider text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER V2 */}
      <footer className="bg-primary text-cream py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-display text-3xl mb-4">Une Énergie Commune</h3>
              <p className="text-cream/60 leading-relaxed">
                21 citoyens engagés pour bâtir ensemble l'avenir de notre village.
              </p>
            </div>
            <div>
              <h4 className="uppercase tracking-wider text-sm mb-4 text-accent">Navigation</h4>
              <ul className="space-y-2">
                {['Accueil', 'Équipe', 'Programme', 'Actualités', 'Participer', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item === 'Accueil' ? '' : item.toLowerCase()}`} className="text-cream/60 hover:text-cream transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="uppercase tracking-wider text-sm mb-4 text-accent">Contact</h4>
              <p className="text-cream/60">
                contact@une-energie-commune.fr
              </p>
            </div>
          </div>
          <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/40 text-sm">
              © 2025 Une Énergie Commune. Tous droits réservés.
            </p>
            <p className="text-cream/40 text-sm">
              Mentions légales • Politique de confidentialité
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
