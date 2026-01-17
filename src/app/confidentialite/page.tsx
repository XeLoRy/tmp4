import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles - Une Énergie Commune.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-background">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-cursive text-4xl text-primary mb-8">
              Politique de confidentialité
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground-muted mb-8">
                L&apos;association Une Énergie Commune pour Glières-Val-de-Borne s&apos;engage à protéger
                la vie privée des utilisateurs de son site. Cette politique de confidentialité
                explique comment nous collectons, utilisons et protégeons vos données personnelles.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                1. Responsable du traitement
              </h2>
              <p className="text-foreground-muted mb-6">
                Le responsable du traitement des données personnelles est :<br />
                <strong>Association Une Énergie Commune pour Glières-Val-de-Borne</strong><br />
                43 chemin de la Chapelle, 74130 Glières-Val-de-Borne<br />
                Email : contact@uneenergiecommune.fr
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                2. Données collectées
              </h2>
              <p className="text-foreground-muted mb-4">
                Nous collectons les données que vous nous fournissez volontairement via nos formulaires :
              </p>
              <ul className="text-foreground-muted space-y-2 mb-6">
                <li><strong>Formulaire de contact :</strong> nom, prénom, email, message</li>
                <li><strong>Formulaire de soutien :</strong> nom, prénom, email, téléphone (optionnel), message (optionnel)</li>
                <li><strong>Enquête citoyenne :</strong> réponses aux questions, commentaires (optionnels)</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                3. Finalités du traitement
              </h2>
              <p className="text-foreground-muted mb-4">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="text-foreground-muted space-y-2 mb-6">
                <li>Répondre à vos demandes de contact</li>
                <li>Gérer les déclarations de soutien à notre liste</li>
                <li>Vous informer de l&apos;avancement de la campagne (si vous y avez consenti)</li>
                <li>Analyser les résultats de l&apos;enquête citoyenne pour améliorer notre programme</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                4. Base légale du traitement
              </h2>
              <p className="text-foreground-muted mb-6">
                Le traitement de vos données repose sur votre <strong>consentement</strong> explicite,
                recueilli lors de la soumission des formulaires.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                5. Destinataires des données
              </h2>
              <p className="text-foreground-muted mb-6">
                Vos données personnelles sont destinées uniquement aux membres de l&apos;association
                Une Énergie Commune habilités à les traiter. <strong>Elles ne sont jamais vendues,
                cédées ou partagées avec des tiers</strong> à des fins commerciales ou autres.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                6. Durée de conservation
              </h2>
              <p className="text-foreground-muted mb-6">
                Vos données sont conservées pendant la durée de la campagne électorale et
                jusqu&apos;à 3 mois après les élections municipales de mars 2026, sauf obligation
                légale de conservation plus longue. Après cette période, vos données seront supprimées.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                7. Vos droits
              </h2>
              <p className="text-foreground-muted mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="text-foreground-muted space-y-2 mb-6">
                <li><strong>Droit d&apos;accès :</strong> obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
                <li><strong>Droit de rectification :</strong> demander la correction de données inexactes</li>
                <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> demander la limitation du traitement</li>
                <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              </ul>
              <p className="text-foreground-muted mb-6">
                Pour exercer ces droits, contactez-nous à : <strong>contact@uneenergiecommune.fr</strong>
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                8. Sécurité des données
              </h2>
              <p className="text-foreground-muted mb-6">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
                pour protéger vos données contre tout accès non autorisé, modification, divulgation
                ou destruction. Le site utilise le protocole HTTPS pour sécuriser les échanges de données.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                9. Cookies
              </h2>
              <p className="text-foreground-muted mb-6">
                Ce site n&apos;utilise pas de cookies de traçage ou publicitaires.
                Seuls des cookies techniques essentiels au fonctionnement du site peuvent être utilisés.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                10. Réclamation
              </h2>
              <p className="text-foreground-muted mb-6">
                Si vous estimez que le traitement de vos données constitue une violation du RGPD,
                vous avez le droit d&apos;introduire une réclamation auprès de la CNIL
                (Commission Nationale de l&apos;Informatique et des Libertés) :<br /><br />
                <strong>CNIL</strong><br />
                3 Place de Fontenoy<br />
                TSA 80715<br />
                75334 Paris Cedex 07<br />
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.cnil.fr
                </a>
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                11. Modification de la politique
              </h2>
              <p className="text-foreground-muted mb-6">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                Toute modification sera publiée sur cette page avec la date de mise à jour.
              </p>

              <p className="text-sm text-foreground-muted mt-12">
                Dernière mise à jour : janvier 2026
              </p>

              <div className="mt-12 p-6 bg-background-alt rounded-xl">
                <p className="text-foreground-muted mb-4">
                  Pour toute question relative à cette politique ou pour exercer vos droits :
                </p>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full bg-primary px-6 py-2 text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
