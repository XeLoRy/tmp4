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
              Participer
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Votre voix compte ! Rejoignez-nous dans cette aventure collective.
            </p>
          </div>
        </section>

        {/* Enquête citoyenne */}
        <section id="enquete" className="py-16 bg-background-alt scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-4xl mb-4 block">📝</span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Enquête citoyenne
              </h2>
              <p className="text-lg text-foreground-muted">
                Aidez-nous à construire un programme qui vous ressemble en répondant
                à quelques questions sur vos priorités pour le village.
              </p>
            </div>

            <EnqueteForm />
          </div>
        </section>

        {/* Soutenir */}
        <section id="soutenir" className="py-16 bg-background scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-4xl mb-4 block">💪</span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Soutenir notre liste
              </h2>
              <p className="text-lg text-foreground-muted">
                Votre soutien est précieux. Rejoignez les citoyens engagés pour le village !
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-foreground mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Pourquoi souhaitez-vous nous soutenir ?"
                    className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="rgpd"
                    name="rgpd"
                    className="mt-1 rounded border-primary-light/30 text-primary focus:ring-primary"
                  />
                  <label htmlFor="rgpd" className="text-sm text-foreground-muted">
                    J&apos;accepte que mes données soient utilisées pour recevoir des informations
                    sur la campagne. Elles ne seront jamais partagées avec des tiers.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  Envoyer mon soutien
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Don */}
        <section id="don" className="py-16 bg-white scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-4xl mb-4 block">❤️</span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Faire un don
              </h2>
              <p className="text-lg text-foreground-muted">
                Soutenez financièrement notre campagne via HelloAsso.
                Chaque contribution compte !
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 text-center">
              <p className="text-foreground-muted mb-6">
                Les dons sont gérés de manière transparente via HelloAsso.
                Vous recevrez un reçu fiscal si applicable.
              </p>
              <a
                href="https://www.helloasso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-full bg-accent px-8 py-3 text-lg font-medium text-white hover:bg-accent-light hover:text-foreground transition-colors"
              >
                Faire un don sur HelloAsso
              </a>
            </div>
          </div>
        </section>

        {/* Bénévolat */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cursive text-3xl text-white mb-4">
              Envie de vous impliquer davantage ?
            </h2>
            <p className="text-lg text-primary-light mb-8 max-w-2xl mx-auto">
              Rejoignez notre équipe de bénévoles pour distribuer des tracts,
              organiser des événements ou simplement échanger avec les habitants.
            </p>
            <a
              href="/contact"
              className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-accent-light transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
