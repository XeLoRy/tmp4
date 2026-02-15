import { getThematiquesDetail } from "@/lib/content";
import ProgrammeClient from "@/components/ProgrammeClient";

export default function ProgrammePage() {
  const thematiques = getThematiquesDetail();
  return <ProgrammeClient thematiquesData={thematiques} />;
}
