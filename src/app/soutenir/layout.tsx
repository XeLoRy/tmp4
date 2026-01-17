import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soutenir - Rejoignez-nous",
  description: "Soutenez la liste Une Énergie Commune pour les élections municipales 2026 à Glières-Val-de-Borne. Déclarez votre soutien ou faites un don.",
};

export default function SoutenirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
