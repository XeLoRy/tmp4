import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Actualités - Suivez notre campagne",
  description: "Toutes les actualités de la campagne Une Énergie Commune pour les élections municipales 2026 à Glières-Val-de-Borne.",
};

export default function ActusPage() {
  const articles = getArticles();

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Actualités
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Suivez notre campagne et restez informé(e) de nos actions
            </p>
          </div>
        </section>

        {/* Liste des articles */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {articles.length > 0 ? (
              <div className="space-y-8">
                {articles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link href={`/actus/${article.slug}`} className="block">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto bg-primary-light/20 overflow-hidden">
                          {article.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {article.category}
                            </span>
                            <time className="text-sm text-foreground-muted">
                              {new Date(article.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                          <h2 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                            {article.title}
                          </h2>
                          <p className="text-foreground-muted">
                            {article.excerpt}
                          </p>
                          <span className="inline-flex items-center text-primary font-medium mt-4">
                            Lire la suite
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground-muted text-lg">
                  Aucun article pour le moment. Revenez bientôt !
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Restez informé(e)
            </h2>
            <p className="text-lg text-primary-light mb-8">
              Inscrivez-vous à notre newsletter pour ne rien manquer de notre campagne
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-primary font-medium hover:bg-accent-light transition-colors"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
