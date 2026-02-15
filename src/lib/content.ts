import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDirectory = path.join(process.cwd(), "content");

// Types
export interface Membre {
  slug: string;
  nom: string;
  role: string;
  profession: string;
  photo: string;
  motivation: string;
  ordre: number;
  age?: number;
  hameau?: string;
  village?: string;
  enfants?: number;
  position: {
    x: number;
    y: number;
  };
}

export interface Thematique {
  slug: string;
  title: string;
  icon: string;
  description: string;
  ordre: number;
  engagements: string[];
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface PageAccueil {
  heroTitle: string;
  heroCitation: string;
  engagementTexte: string;
  teteDeListe?: string;
  tetteDeListeRole?: string;
  edito?: string;
}

export interface Edito {
  titre: string;
  teteDeListe: string;
  role: string;
  content: string;
}

export interface SiteConfig {
  nomListe: string;
  slogan: string;
  email: string;
  helloasso: string;
  photoGroupe: string;
}

export interface Evenement {
  slug: string;
  titre: string;
  date: string;
  heure: string;
  lieu: string;
  ville: string;
  type: string;
  description: string;
}

// Utilitaires
function getMarkdownFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((file) => file.endsWith(".md"));
}

function parseMarkdownFile<T>(filePath: string): T & { content: string } {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, content } as T & { content: string };
}

// Équipe
export function getMembres(): Membre[] {
  const files = getMarkdownFiles("equipe");
  const membres = files.map((file) => {
    const data = parseMarkdownFile<Omit<Membre, "slug">>(`equipe/${file}`);
    return {
      ...data,
      slug: file.replace(".md", ""),
    };
  });
  return membres.sort((a, b) => a.ordre - b.ordre);
}

export function getMembre(slug: string): Membre | null {
  try {
    const data = parseMarkdownFile<Omit<Membre, "slug">>(`equipe/${slug}.md`);
    return { ...data, slug };
  } catch {
    return null;
  }
}

// Thématiques
export function getThematiques(): Thematique[] {
  const files = getMarkdownFiles("thematiques");
  const thematiques = files.map((file) => {
    const data = parseMarkdownFile<Omit<Thematique, "slug">>(`thematiques/${file}`);
    return {
      ...data,
      slug: file.replace(".md", ""),
    };
  });
  return thematiques.sort((a, b) => a.ordre - b.ordre);
}

export function getThematique(slug: string): Thematique | null {
  try {
    const data = parseMarkdownFile<Omit<Thematique, "slug">>(`thematiques/${slug}.md`);
    return { ...data, slug };
  } catch {
    return null;
  }
}

// Actualités
export function getArticles(): Article[] {
  const files = getMarkdownFiles("actus");
  const articles = files.map((file) => {
    const data = parseMarkdownFile<Omit<Article, "slug">>(`actus/${file}`);
    return {
      ...data,
      slug: file.replace(".md", ""),
    };
  });
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(slug: string): Article | null {
  try {
    const data = parseMarkdownFile<Omit<Article, "slug">>(`actus/${slug}.md`);
    return {
      ...data,
      slug,
      content: marked(data.content) as string
    };
  } catch {
    return null;
  }
}

// Pages
export function getPageAccueil(): PageAccueil {
  try {
    const data = parseMarkdownFile<PageAccueil>("pages/accueil.md");
    return data;
  } catch {
    return {
      heroTitle: "Une Énergie Commune",
      heroCitation: "Ensemble, construisons l'avenir de notre village",
      engagementTexte: "Nous sommes une équipe de citoyens engagés.",
    };
  }
}

export function getEdito(): Edito {
  try {
    const data = parseMarkdownFile<Edito>("pages/edito.md");
    return data;
  } catch {
    return {
      titre: "Mot de la tête de liste",
      teteDeListe: "Mickaël Maistre",
      role: "Tête de liste",
      content: "",
    };
  }
}

// Config
export function getSiteConfig(): SiteConfig {
  try {
    const data = parseMarkdownFile<SiteConfig>("config/site.md");
    return data;
  } catch {
    return {
      nomListe: "Une Énergie Commune",
      slogan: "Ensemble, construisons l'avenir de notre village",
      email: "contact@uneenergiecommune.fr",
      helloasso: "",
      photoGroupe: "",
    };
  }
}

// Thématiques avec engagements détaillés (parsés depuis le markdown)
export interface EngagementDetail {
  titre: string;
  actions: string[];
}

export interface ThematiqueDetail {
  slug: string;
  title: string;
  icon: string;
  description: string;
  ordre: number;
  engagements: EngagementDetail[];
  objectif: string;
}

export function getThematiquesDetail(): ThematiqueDetail[] {
  const files = getMarkdownFiles("thematiques");
  const thematiques = files.map((file) => {
    const data = parseMarkdownFile<Omit<Thematique, "slug">>(`thematiques/${file}`);
    const slug = file.replace(".md", "");

    // Parse markdown body into structured engagements
    const engagements: EngagementDetail[] = [];
    const sections = data.content.split(/^###\s+/m).filter(Boolean);

    for (const section of sections) {
      if (section.startsWith("##") || section.trim().startsWith("## ")) continue;
      const lines = section.split("\n");
      const titre = lines[0].replace(/^\d+\.\s*/, "").trim();
      if (!titre) continue;

      const actions: string[] = [];
      for (const line of lines.slice(1)) {
        const match = line.match(/^[\*\-]\s+(.+)/);
        if (match) actions.push(match[1].trim());
      }
      engagements.push({ titre, actions });
    }

    // Extract objectif from "## Notre objectif" section
    const objectifMatch = data.content.match(/## Notre objectif\s+([\s\S]*?)$/);
    let objectif = data.description || "";
    if (objectifMatch) {
      objectif = objectifMatch[1]
        .replace(/\*\*/g, "")
        .replace(/\\\s*/g, " ")
        .trim();
    }

    return { slug, title: data.title, icon: data.icon, description: data.description, ordre: data.ordre, engagements, objectif };
  });
  return thematiques.sort((a, b) => a.ordre - b.ordre);
}

// Agenda
export function getEvenements(): Evenement[] {
  const files = getMarkdownFiles("agenda");
  const evenements = files.map((file) => {
    const data = parseMarkdownFile<Omit<Evenement, "slug">>(`agenda/${file}`);
    return {
      ...data,
      slug: file.replace(".md", ""),
    };
  });
  // Trier par date croissante (prochains événements en premier)
  return evenements.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getProchainEvenement(): Evenement | null {
  const evenements = getEvenements();
  const now = new Date();
  const prochains = evenements.filter(e => new Date(e.date) >= now);
  return prochains.length > 0 ? prochains[0] : null;
}
