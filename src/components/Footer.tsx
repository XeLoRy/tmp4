import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="font-cursive text-2xl text-primary-light">
              Une Énergie Commune
            </span>
            <p className="mt-4 text-sm text-gray-400">
              Ensemble, construisons l&apos;avenir de notre village.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/equipe" className="text-sm text-gray-400 hover:text-white transition-colors">
                  L&apos;équipe
                </Link>
              </li>
              <li>
                <Link href="/thematiques" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Nos 5 thématiques
                </Link>
              </li>
              <li>
                <Link href="/actus" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Participer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Participer
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/participer#enquete" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Enquête citoyenne
                </Link>
              </li>
              <li>
                <Link href="/participer#soutenir" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Soutenir notre liste
                </Link>
              </li>
              <li>
                <a
                  href="https://www.helloasso.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Faire un don
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Une Énergie Commune. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="text-sm text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-sm text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
