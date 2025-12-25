# Une Énergie Commune - Site de campagne municipale

Site web Next.js pour la liste électorale municipale "Une Énergie Commune".

## Stack technique

- **Framework** : Next.js 16 (export statique)
- **Styling** : Tailwind CSS 4
- **CMS** : Decap CMS avec GitHub OAuth
- **Hébergement** : Azure Static Web Apps

## URLs

- **Site** : https://wonderful-coast-0605c9403.4.azurestaticapps.net
- **Admin CMS** : https://wonderful-coast-0605c9403.4.azurestaticapps.net/admin/

## Développement local

```bash
npm install
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Build de production

```bash
npm run build
```

Génère un export statique dans le dossier `out/`.

## Architecture

```
src/app/           # Pages Next.js
content/           # Contenu Markdown (éditable via CMS)
public/admin/      # Interface Decap CMS
api/               # Azure Functions (OAuth)
```

## Gestion du contenu

### Via Decap CMS (recommandé)
1. Aller sur /admin
2. Se connecter avec GitHub
3. Éditer le contenu via l'interface

### Via fichiers Markdown
Modifier directement les fichiers dans `content/` :
- `content/equipe/` : Membres de l'équipe
- `content/thematiques/` : Axes du programme
- `content/actus/` : Actualités

## Ajouter des éditeurs

1. Ajouter comme collaborateur sur ce repo GitHub
2. L'éditeur se connecte via /admin avec son compte GitHub
3. Ses modifications créent des Pull Requests (editorial workflow)

## Déploiement

Le déploiement est automatique via GitHub Actions sur chaque push sur `main`.

## Configuration OAuth

L'authentification GitHub OAuth est gérée par une Azure Function intégrée (`/api/auth`).

Variables d'environnement requises (Azure SWA App Settings) :
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
