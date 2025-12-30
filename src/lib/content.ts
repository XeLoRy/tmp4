import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

export interface SiteConfig {
  nomListe: string;
  slogan: string;
  email: string;
  helloasso: string;
  photoGroupe: string;
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
    return { ...data, slug };
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
