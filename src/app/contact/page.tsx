import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

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
              Une question ? Une suggestion ? N&apos;hesitez pas a nous ecrire !
            </p>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <ContactForm />

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
