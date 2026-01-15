import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnqueteForm from "@/components/EnqueteForm";

export default function ParticiperPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Enquête citoyenne
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Vous avez la parole...
            </p>
          </div>
        </section>

        {/* Enquête citoyenne */}
        <section id="enquete" className="py-16 bg-background-alt scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <EnqueteForm />
          </div>
        </section>

        {/* CTA vers soutien */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Vous souhaitez aller plus loin ?
            </h2>
            <p className="text-lg text-primary-light mb-8 max-w-2xl mx-auto">
              Rejoignez notre liste de soutiens ou contribuez à la campagne.
            </p>
            <a
              href="/soutenir"
              className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-accent-light transition-colors"
            >
              Je soutiens la campagne
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
