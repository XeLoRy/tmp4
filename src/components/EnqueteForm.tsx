'use client';

import { useState } from 'react';

const PRIORITES = [
  'Sécurité et tranquillité',
  'Environnement et espaces verts',
  'Commerces et vie économique',
  'Jeunesse et écoles',
  'Seniors et solidarité',
  'Culture et associations',
  'Mobilité et transports',
  'Urbanisme et logement',
  'Sport et loisirs',
  'Numérique et modernisation',
];

export default function EnqueteForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    priorite1: '',
    priorite2: '',
    priorite3: '',
    commentaire: '',
    newsletter: false,
    benevolat: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          priorite1: '',
          priorite2: '',
          priorite3: '',
          commentaire: '',
          newsletter: false,
          benevolat: false,
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Impossible de soumettre le formulaire. Réessayez plus tard.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <span className="text-5xl mb-4 block">✅</span>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Merci pour votre participation !</h3>
        <p className="text-green-700">
          Votre avis est précieux et nous aidera à construire un programme qui vous ressemble.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-primary underline hover:no-underline"
        >
          Soumettre une autre réponse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
      {/* Infos personnelles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
            Nom (optionnel)
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-foreground mb-2">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Priorités */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Vos 3 priorités pour Glières Val-de-Borne
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((num) => (
            <div key={num}>
              <label
                htmlFor={`priorite${num}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Priorité {num}
              </label>
              <select
                id={`priorite${num}`}
                name={`priorite${num}`}
                value={formData[`priorite${num}` as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Sélectionner...</option>
                {PRIORITES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Commentaire */}
      <div>
        <label htmlFor="commentaire" className="block text-sm font-medium text-foreground mb-2">
          Vos idées ou suggestions
        </label>
        <textarea
          id="commentaire"
          name="commentaire"
          value={formData.commentaire}
          onChange={handleChange}
          rows={4}
          placeholder="Partagez vos idées pour améliorer notre village..."
          className="w-full rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="newsletter" className="text-sm text-foreground-muted cursor-pointer">
            Je souhaite recevoir les actualités de la campagne par email
          </label>
        </div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="benevolat"
            name="benevolat"
            checked={formData.benevolat}
            onChange={handleChange}
            className="mt-0.5 w-5 h-5 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
          <label htmlFor="benevolat" className="text-sm text-foreground-muted cursor-pointer">
            Je suis intéressé(e) pour devenir bénévole (organisation d&apos;événements, échanges avec les habitants)
          </label>
        </div>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer mes réponses'}
      </button>

      <p className="text-xs text-foreground-muted text-center">
        Vos données sont traitées conformément au RGPD et ne seront jamais partagées avec des tiers.
      </p>
    </form>
  );
}
