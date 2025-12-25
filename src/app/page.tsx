import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getThematiques, getArticles, getPageAccueil, getMembres, getSiteConfig } from "@/lib/content";

export default function Home() {
  const thematiques = getThematiques();
  const articles = getArticles().slice(0, 3);
  const pageAccueil = getPageAccueil();
  const membres = getMembres();
  const config = getSiteConfig();

  return (
    <>
      <Header />

      <main>
        {/* Hero Section avec photo */}
        <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end">
          {/* Image de fond croppée */}
          <div className="absolute inset-0 z-0">
            {config.photoGroupe ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={config.photoGroupe}
                  alt="L'équipe Une Énergie Commune"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 52%' }} /* Personnes plus hautes */
                />
                {/* Overlay gradient - plus fort en bas pour le texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5" />
            )}
          </div>

          {/* Contenu en bas */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-10">
            <div className="text-center">
              <h1 className="font-cursive text-4xl sm:text-5xl lg:text-7xl text-white mb-6 drop-shadow-lg">
                {pageAccueil.heroTitle}
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md">
                &ldquo;{pageAccueil.heroCitation}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/thematiques"
                  className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-white transition-colors shadow-lg"
                >
                  Découvrir notre projet
                </Link>
                <Link
                  href="/equipe"
                  className="inline-flex justify-center rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white hover:bg-white hover:text-primary transition-colors"
                >
                  Rencontrer l&apos;équipe
                </Link>
              </div>
            </div>
          </div>

          {/* Indicateur scroll */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Mot de la tête de liste */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-primary-light/30 overflow-hidden shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/mm.png"
                      alt="Mickaël M"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Citation */}
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-xl lg:text-2xl text-foreground leading-relaxed mb-6">
                    &ldquo;Notre village mérite une équipe à son écoute, transparente et tournée vers l&apos;avenir. Ensemble, avec nos {membres.length} colistiers issus de tous horizons, nous voulons renforcer les liens entre générations, soutenir notre économie locale et faire de chaque habitant un acteur de notre territoire. C&apos;est cette énergie commune qui nous anime.&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg text-foreground">Mickaël M.</p>
                    <p className="text-primary font-medium">Tête de liste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre engagement */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Notre engagement
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed">
                {pageAccueil.engagementTexte}
              </p>
            </div>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary mb-1">{membres.length}</p>
                <p className="text-sm text-foreground-muted">candidats</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary mb-1">{thematiques.length}</p>
                <p className="text-sm text-foreground-muted">thématiques</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary mb-1">1</p>
                <p className="text-sm text-foreground-muted">équipe unie</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary mb-1">100%</p>
                <p className="text-sm text-foreground-muted">transparence</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Thématiques */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos {thematiques.length} thématiques
              </h2>
              <p className="text-lg text-foreground-muted">
                Les piliers de notre projet pour le village
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {thematiques.map((theme) => (
                <Link
                  key={theme.slug}
                  href={`/thematiques#${theme.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-4xl mb-4">{theme.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {theme.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/thematiques"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Voir le détail de notre programme
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Participer */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl sm:text-4xl text-white mb-6">
              Votre avis nous intéresse !
            </h2>
            <p className="text-lg text-primary-light max-w-2xl mx-auto mb-8">
              Participez à notre enquête citoyenne et contribuez à construire
              le programme qui vous ressemble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/participer#enquete"
                className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-accent-light transition-colors"
              >
                Répondre à l&apos;enquête
              </Link>
              <Link
                href="/participer#soutenir"
                className="inline-flex justify-center rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white hover:bg-white hover:text-primary transition-colors"
              >
                Soutenir notre liste
              </Link>
            </div>
          </div>
        </section>

        {/* Dernières actus */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-foreground">
                Dernières actualités
              </h2>
              <Link
                href="/actus"
                className="text-primary font-medium hover:underline hidden sm:inline-flex items-center"
              >
                Toutes les actus
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <article key={article.slug} className="bg-background rounded-xl overflow-hidden shadow-sm">
                    <div className="h-48 bg-primary-light/20">
                      {article.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-foreground-muted mb-2">
                        {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <h3 className="font-semibold text-foreground mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-foreground-muted col-span-3 text-center py-8">
                  Les actualités arrivent bientôt !
                </p>
              )}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/actus"
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Toutes les actualités
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
