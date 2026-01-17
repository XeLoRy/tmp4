import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Une Énergie Commune - Informations sur l'éditeur et l'hébergeur.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-cursive text-4xl text-primary mb-8">
              Mentions légales
            </h1>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Éditeur du site
              </h2>
              <p className="text-foreground-muted mb-4">
                Le site <strong>www.uneenergiecommune.fr</strong> est édité par :
              </p>
              <ul className="text-foreground-muted space-y-2 mb-6">
                <li><strong>Association :</strong> Une Énergie Commune pour Glières-Val-de-Borne</li>
                <li><strong>Statut :</strong> Association loi 1901</li>
                <li><strong>RNA :</strong> W742010831</li>
                <li><strong>SIREN :</strong> 999 551 492</li>
                <li><strong>Siège social :</strong> 43 chemin de la Chapelle, 74130 Glières-Val-de-Borne</li>
                <li><strong>Email :</strong> contact@uneenergiecommune.fr</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Directeur de la publication
              </h2>
              <p className="text-foreground-muted mb-6">
                <strong>Mickaël Maistre</strong>, Président de l&apos;association.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Hébergement
              </h2>
              <p className="text-foreground-muted mb-6">
                Ce site est hébergé par :<br />
                <strong>Microsoft Azure</strong> (Azure Static Web Apps)<br />
                Microsoft Corporation<br />
                One Microsoft Way<br />
                Redmond, WA 98052, États-Unis<br />
                <a href="https://azure.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://azure.microsoft.com
                </a>
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Propriété intellectuelle
              </h2>
              <p className="text-foreground-muted mb-6">
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes)
                est la propriété exclusive de l&apos;association Une Énergie Commune pour Glières-Val-de-Borne,
                à l&apos;exception des marques, logos ou contenus appartenant à d&apos;autres sociétés partenaires
                ou auteurs.
              </p>
              <p className="text-foreground-muted mb-6">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication
                de ces différents éléments est strictement interdite sans l&apos;accord exprès par écrit
                de l&apos;association.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Crédits
              </h2>
              <p className="text-foreground-muted mb-6">
                <strong>Conception et développement :</strong> Une Énergie Commune<br />
                <strong>Photographies :</strong> Une Énergie Commune et contributeurs
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Limitation de responsabilité
              </h2>
              <p className="text-foreground-muted mb-6">
                Les informations contenues sur ce site sont aussi précises que possible et le site
                est périodiquement mis à jour, mais peut toutefois contenir des inexactitudes,
                des omissions ou des lacunes. L&apos;association Une Énergie Commune ne pourra être
                tenue responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur,
                lors de l&apos;accès au site.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Droit applicable
              </h2>
              <p className="text-foreground-muted mb-6">
                Le présent site et les présentes mentions légales sont soumis au droit français.
                En cas de litige, les tribunaux français seront seuls compétents.
              </p>

              <p className="text-sm text-foreground-muted mt-12">
                Dernière mise à jour : janvier 2026
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
