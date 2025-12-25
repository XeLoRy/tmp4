import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Contact
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Une question ? Une suggestion ? N&apos;hésitez pas à nous écrire !
            </p>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
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
                      required
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
                      required
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
                    required
                    className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-foreground mb-2">
                    Sujet
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="programme">Question sur le programme</option>
                    <option value="benevolat">Devenir bénévole</option>
                    <option value="presse">Contact presse</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Votre message..."
                    className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="rgpd"
                    name="rgpd"
                    required
                    className="mt-1 rounded border-primary-light/30 text-primary focus:ring-primary"
                  />
                  <label htmlFor="rgpd" className="text-sm text-foreground-muted">
                    J&apos;accepte que mes données soient utilisées pour répondre à ma demande.
                    Elles ne seront jamais partagées avec des tiers.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </div>

            {/* Infos de contact */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:contact@uneenergiecommune.fr"
                  className="text-primary hover:underline"
                >
                  contact@uneenergiecommune.fr
                </a>
              </div>
              <div className="bg-background rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-semibold text-foreground mb-2">Permanence</h3>
                <p className="text-foreground-muted">
                  Horaires et lieu à venir
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
