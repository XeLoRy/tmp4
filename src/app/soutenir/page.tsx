"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SoutenirPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      prenom: formData.get("prenom") as string,
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      telephone: formData.get("telephone") as string,
      message: formData.get("message") as string,
      afficherPublic: formData.get("afficherPublic") === "on",
      faireDon: formData.get("faireDon") === "on",
      rgpd: formData.get("rgpd") === "on",
    };

    try {
      const response = await fetch("/api/soutenir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary mb-4">
              Je soutiens la campagne
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Votre soutien est précieux. Rejoignez-nous !
            </p>
          </div>
        </section>

        {/* Formulaire de soutien */}
        <section id="soutenir" className="py-16 bg-background scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pictos/soutenir.png" alt="Soutenir" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Déclarer mon soutien
              </h2>
              <p className="text-lg text-foreground-muted">
                Vous êtes convaincu par notre démarche ? Montrez votre appui en quelques clics.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Merci pour votre soutien !</h3>
                  <p className="text-foreground-muted mb-6">
                    Votre engagement compte beaucoup pour nous.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-primary font-medium hover:underline"
                  >
                    Envoyer un autre soutien
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-foreground mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        required
                        disabled={status === "sending"}
                        className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        required
                        disabled={status === "sending"}
                        className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={status === "sending"}
                        className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        disabled={status === "sending"}
                        className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Pourquoi je soutiens cette candidature (optionnel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      disabled={status === "sending"}
                      placeholder="Partagez vos motivations..."
                      className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:bg-gray-100"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="afficherPublic"
                        name="afficherPublic"
                        disabled={status === "sending"}
                        className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed"
                      />
                      <label htmlFor="afficherPublic" className="text-sm text-foreground-muted cursor-pointer">
                        J&apos;accepte que mon nom figure dans la liste publique des soutiens
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="faireDon"
                        name="faireDon"
                        disabled={status === "sending"}
                        className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed"
                      />
                      <label htmlFor="faireDon" className="text-sm text-foreground-muted cursor-pointer">
                        Je souhaite également faire un don pour soutenir la campagne
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="rgpd"
                        name="rgpd"
                        required
                        disabled={status === "sending"}
                        className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed"
                      />
                      <label htmlFor="rgpd" className="text-sm text-foreground-muted cursor-pointer">
                        J&apos;accepte que mes données soient utilisées pour recevoir des informations
                        sur la campagne. Elles ne seront jamais partagées avec des tiers. *
                      </label>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Envoi en cours..." : "Valider mon soutien"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Don */}
        <section id="don" className="py-16 bg-white scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pictos/don.png" alt="Don" className="w-24 h-24 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Faire un don
              </h2>
              <p className="text-lg text-foreground-muted">
                Vous souhaitez soutenir financièrement la campagne ?
                Chaque don nous aide à imprimer des tracts et organiser des rencontres.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8 text-center">
              <p className="text-foreground-muted mb-6">
                Les dons sont gérés de manière transparente via HelloAsso.
                Vous recevrez un reçu fiscal si applicable.
              </p>
              <a
                href="https://www.helloasso.com/associations/une-energie-commune-pour-glieres-val-de-borne"
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
              className="inline-flex justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-white transition-colors"
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
