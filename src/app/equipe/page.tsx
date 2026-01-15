import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EquipeClient from "@/components/EquipeClient";
import { getMembres, getSiteConfig } from "@/lib/content";

export default function EquipePage() {
  const membres = getMembres();
  const config = getSiteConfig();

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Notre équipe
            </h1>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Une équipe engagée, dynamique et unie avec des compétences complémentaires pour Glières-Val-de-Borne
            </p>
          </div>
        </section>

        <EquipeClient membres={membres} photoGroupe={config.photoGroupe} />
      </main>

      <Footer />
    </>
  );
}
