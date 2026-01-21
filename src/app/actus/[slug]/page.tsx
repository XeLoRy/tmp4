import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticle, getArticles } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/actus"
              className="inline-flex items-center text-primary hover:underline mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux actualités
            </Link>

            <div className="flex items-center gap-4 mb-4">
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

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {article.title}
            </h1>
          </div>
        </section>

        {/* Image */}
        {article.image && (
          <section className="py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>
        )}

        {/* Contenu */}
        <section className="py-8 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Envie d&apos;en savoir plus ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programme"
                className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Découvrir notre programme
              </Link>
              <Link
                href="/participer"
                className="inline-flex justify-center rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white hover:bg-white hover:text-primary transition-colors"
              >
                Participer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
