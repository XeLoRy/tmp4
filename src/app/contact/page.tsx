import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Nous écrire",
  description: "Contactez l'équipe Une Énergie Commune. Une question sur notre programme ? Envoyez-nous un message.",
};

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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
