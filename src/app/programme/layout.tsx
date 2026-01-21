import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre programme - 5 thématiques pour Glières-Val-de-Borne",
  description: "Découvrez notre programme en 5 axes : Citoyenneté, Solidarité, Vie locale, Économie et Rayonnement. Des actions concrètes pour notre village.",
};

export default function ThematiquesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
