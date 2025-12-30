import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getThematiques } from "@/lib/content";

export default function ThematiquesPage() {
  const thematiques = getThematiques();

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Nos {thematiques.length} thématiques
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Les piliers de notre projet pour construire ensemble l&apos;avenir du village
            </p>
          </div>
        </section>

        {/* Thématiques */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {thematiques.map((theme, index) => (
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
                        <ul className="space-y-3">
                          {theme.engagements.map((engagement, i) => (
                            <li key={i} className="flex items-start gap-3">
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
                              <span className="text-foreground-muted">
                                {engagement}
                              </span>
                            </li>
                          ))}
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
              Ces thématiques vous parlent ?
            </h2>
            <p className="text-lg text-primary-light mb-8">
              Participez à notre enquête citoyenne pour enrichir notre programme
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
