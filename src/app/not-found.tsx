import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-cursive text-8xl sm:text-9xl text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Page introuvable
          </h2>
          <p className="text-lg text-foreground-muted mb-8 max-w-md mx-auto">
            Oups ! Cette page n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex justify-center rounded-full bg-primary px-8 py-3 text-lg font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-full border-2 border-primary px-8 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
