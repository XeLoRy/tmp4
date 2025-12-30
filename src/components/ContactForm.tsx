"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      prenom: formData.get("prenom") as string,
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      sujet: formData.get("sujet") as string || "autre",
      message: formData.get("message") as string,
      rgpd: formData.get("rgpd") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="text-5xl mb-4">&#10003;</div>
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Message envoye !
        </h2>
        <p className="text-foreground-muted mb-6">
          Merci pour votre message. Nous vous repondrons dans les plus brefs
          delais.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="prenom"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Prenom
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
            <label
              htmlFor="nom"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Nom
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

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email
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
          <label
            htmlFor="sujet"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Sujet
          </label>
          <select
            id="sujet"
            name="sujet"
            disabled={status === "sending"}
            className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-100"
          >
            <option value="">Choisir un sujet</option>
            <option value="question">Question generale</option>
            <option value="programme">Question sur le programme</option>
            <option value="benevolat">Devenir benevole</option>
            <option value="presse">Contact presse</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={status === "sending"}
            placeholder="Votre message..."
            className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:bg-gray-100"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="rgpd"
            name="rgpd"
            required
            disabled={status === "sending"}
            className="mt-1 rounded border-primary-light/30 text-primary focus:ring-primary"
          />
          <label htmlFor="rgpd" className="text-sm text-foreground-muted">
            J&apos;accepte que mes donnees soient utilisees pour repondre a ma
            demande. Elles ne seront jamais partagees avec des tiers.
          </label>
        </div>

        {status === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "sending" ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Envoi en cours...
            </>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>
    </div>
  );
}
