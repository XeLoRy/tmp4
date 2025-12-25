import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConnexionPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="py-20">
          <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="font-cursive text-4xl text-primary mb-4">
                Connexion
              </h1>
              <p className="text-foreground-muted">
                Connectez-vous pour participer à la vie de notre campagne
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="votre@email.fr"
                    className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  Recevoir un lien de connexion
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-foreground-muted">
                  Vous recevrez un email avec un lien magique pour vous connecter.
                  <br />
                  Aucun mot de passe requis !
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-foreground-muted">
                Vos données sont protégées et ne seront jamais partagées.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
