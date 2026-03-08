'use client';

import { useState } from 'react';
import { collectFingerprint } from '@/lib/fingerprint';

const PRIORITES = [
  'Citoyenneté et transparence',
  'Sécurité et tranquillité',
  'Environnement et espaces naturels',
  'Agriculture et producteurs locaux',
  'Commerces et vie économique',
  'Tourisme',
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
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState('');

  // OTP state
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [otpError, setOtpError] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');

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

  const handleRequestOtp = async () => {
    const email = formData.email.trim();
    if (!email) {
      setOtpError('Veuillez entrer votre email.');
      return;
    }

    setOtpStatus('sending');
    setOtpError('');

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erreur');
      setOtpToken(result.token);
      setVerifiedEmail(email);
      setOtpStatus('sent');
    } catch (err) {
      setOtpStatus('error');
      setOtpError(err instanceof Error ? err.message : "Erreur lors de l'envoi du code.");
    }
  };

  const handleVerifyOtp = () => {
    if (otpCode.length === 6) {
      setEmailVerified(true);
      setOtpError('');
    } else {
      setOtpError('Le code doit contenir 6 chiffres.');
    }
  };

  const handleResetEmail = () => {
    setEmailVerified(false);
    setOtpStatus('idle');
    setOtpCode('');
    setOtpToken('');
    setVerifiedEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (formData.email !== verifiedEmail) {
      setStatus('error');
      setErrorMessage("L'email a changé depuis la vérification. Veuillez vérifier à nouveau.");
      handleResetEmail();
      return;
    }

    try {
      const response = await fetch('/api/enquete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          _timestamp: loadedAt,
          _fingerprint: collectFingerprint(),
          _otpCode: otpCode,
          _otpToken: otpToken,
        }),
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
        });
        handleResetEmail();
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Impossible de soumettre le formulaire. Réessayez plus tard.');
    }
  };

  const isBusy = status === 'loading';

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
      {/* Honeypot - invisible to humans */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {/* Email + OTP verification — first step */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-foreground-muted mb-3">
          Afin de garantir l&apos;authenticité de votre participation, un code de vérification vous sera envoyé par email.
        </p>

        {emailVerified ? (
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600 font-medium text-sm flex-1">
              {verifiedEmail}
            </span>
            <span className="text-green-600 text-sm font-medium">Vérifié</span>
            <button
              type="button"
              onClick={handleResetEmail}
              className="text-xs text-foreground-muted hover:text-foreground underline"
            >
              Modifier
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.fr"
                className="flex-1 rounded-lg px-4 py-3 border border-primary-light/30 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={otpStatus === 'sending'}
                className="rounded-lg bg-primary text-white px-5 py-3 text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {otpStatus === 'sending' ? 'Envoi...' : otpStatus === 'sent' ? 'Renvoyer le code' : 'Envoyer le code'}
              </button>
            </div>

            {/* OTP input */}
            {otpStatus === 'sent' && (
              <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 mb-3">
                  Un code à 6 chiffres a été envoyé à <strong>{verifiedEmail}</strong>. Vérifiez aussi vos spams.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="000000"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="flex-1 rounded-lg px-4 py-3 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-primary text-center text-xl tracking-[0.3em] font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="rounded-lg bg-primary px-5 py-3 text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {otpError && (
          <p className="text-red-500 text-sm mt-2">{otpError}</p>
        )}
      </div>

      {/* Rest of form — only shown after email verification */}
      <div className={!emailVerified ? 'opacity-50 pointer-events-none' : ''}>
        {/* Infos personnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
        </div>

        {/* Priorités */}
        <div className="border-t pt-6 mb-6">
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
        <div className="mb-6">
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
        <div className="space-y-3 mb-6">
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
        </div>

        {/* Error message */}
        {status === 'error' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isBusy || !emailVerified}
          className="w-full rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBusy ? 'Envoi en cours...' : 'Envoyer mes réponses'}
        </button>

        <p className="text-xs text-foreground-muted text-center mt-4">
          Vos données sont traitées conformément au RGPD et ne seront jamais partagées avec des tiers.
        </p>
      </div>
    </form>
  );
}
