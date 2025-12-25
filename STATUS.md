# STATUS - 25 Décembre 2025

## Résumé du projet

Site de campagne électorale municipale "Une Énergie Commune" pour le village.

## Stack technique

- **Framework** : Next.js 16.1.1
- **Styling** : Tailwind CSS 4
- **CMS** : Decap CMS (admin sur /admin)
- **Hébergement** : Azure Static Web Apps (export statique)
- **Auth** : GitHub OAuth via Azure Functions (intégré à SWA)

## Pages créées

| Page | Route | Status |
|------|-------|--------|
| Accueil | `/` | ✅ OK |
| Équipe | `/equipe` | ✅ OK - Photo interactive 21 membres |
| Thématiques | `/thematiques` | ✅ OK - 5 axes programme |
| Actualités | `/actus` | ✅ OK |
| Contact | `/contact` | ✅ OK |
| Participer | `/participer` | ✅ OK |
| Admin CMS | `/admin` | ✅ OK - Decap CMS fonctionnel |

## Contenu

### Équipe (21 membres)
- Positions des cercles sur photo de groupe : ✅ Terminé
- Noms réels : ❌ À compléter (actuellement "Membre 1-21")
- Tête de liste : Mickaël M. avec citation

### Thématiques (5 axes)
1. 🗳️ Citoyenneté - Équipe à l'écoute, transparente
2. 👨‍👩‍👧‍👦 Solidarité - Jeunesse, familles, séniors
3. 🏘️ Vie locale - Liens entre habitants
4. 🌿 Économie & Environnement - Développement raisonné
5. ⭐ Rayonnement - Fierté du territoire

## Déploiement Azure SWA

### Configuration
- ✅ `output: 'export'` dans next.config.ts
- ✅ Workflow GitHub avec `output_location: "out"`
- ✅ API OAuth intégrée dans `/api` (même domaine que le site)

### URLs
- **Site** : https://wonderful-coast-0605c9403.4.azurestaticapps.net
- **Admin CMS** : https://wonderful-coast-0605c9403.4.azurestaticapps.net/admin/
- **API OAuth** : https://wonderful-coast-0605c9403.4.azurestaticapps.net/api/auth

## Decap CMS - Configuration OAuth

### Architecture
```
┌─────────────────┐     ┌──────────────────┐     ┌────────────┐
│   Decap CMS     │────▶│  SWA API /auth   │────▶│   GitHub   │
│   (popup)       │◀────│  (même domaine)  │◀────│   OAuth    │
└─────────────────┘     └──────────────────┘     └────────────┘
        │                        │
        │    postMessage         │
        │   (handshake +         │
        │    token)              │
        ▼                        │
┌─────────────────┐              │
│  Page /admin    │◀─────────────┘
│  (fenêtre       │   Token reçu
│   principale)   │
└─────────────────┘
```

### Points clés de l'implémentation
1. **Même domaine** : L'API OAuth est sur le même domaine que le CMS (SWA)
2. **Handshake** : Envoi de `authorizing:github` AVANT le token (requis par Decap)
3. **HTML inline** : L'API retourne le HTML de callback directement (pas de redirect)
4. **window.opener** : Préservé car pas de changement de domaine

### Secrets Azure (App Settings SWA)
- `GITHUB_CLIENT_ID` : Ov23liJapgYROtdvvBTD
- `GITHUB_CLIENT_SECRET` : *** (configuré)

### GitHub OAuth App
- Callback URL : `https://wonderful-coast-0605c9403.4.azurestaticapps.net/api/auth`

## Editorial Workflow

✅ Activé - Les modifications créent des Pull Requests à valider avant publication.

Pour donner accès à des éditeurs :
1. Ajouter comme collaborateur sur le repo GitHub
2. Ils se connectent via GitHub OAuth sur /admin
3. Leurs modifications créent des PRs (pas de commit direct)

## Fichiers clés

```
src/
├── app/
│   ├── page.tsx              # Accueil avec hero + mot tête de liste
│   ├── equipe/page.tsx       # Photo interactive
│   └── thematiques/page.tsx
├── components/
│   ├── EquipeClient.tsx      # Composant interactif photo groupe
│   ├── Header.tsx
│   └── Footer.tsx
└── lib/
    └── content.ts            # Lecture fichiers markdown

api/
├── auth/
│   ├── index.js              # OAuth handler (GitHub token exchange)
│   └── function.json         # Azure Function config
├── host.json
└── package.json              # Dépendances (node-fetch)

content/
├── equipe/                   # 21 fichiers membres avec positions x,y
├── thematiques/              # 5 axes du programme
├── config/site.md            # Config globale (photo groupe, etc.)
└── pages/accueil.md          # Textes page d'accueil

public/
├── images/
│   ├── equipe-groupe.jpg
│   └── mm.png                # Photo tête de liste
└── admin/
    ├── index.html            # Decap CMS (config embarquée)
    └── callback.html         # (legacy, non utilisé)
```

## Prochaines étapes

1. [x] Export statique configuré
2. [x] Déploiement Azure SWA
3. [x] Configurer Decap CMS auth (GitHub OAuth) ✅ FONCTIONNEL
4. [x] Editorial workflow activé
5. [ ] Compléter noms réels des 21 membres
6. [ ] Ajouter photos individuelles membres (optionnel)
7. [ ] Tester formulaire contact
8. [ ] Ajouter Google Forms pour enquête citoyenne
9. [ ] (Optionnel) Repo séparé pour contenu si isolation totale requise

## Repository

- GitHub : https://github.com/XeLoRy/tmp4
- **Site en ligne** : https://wonderful-coast-0605c9403.4.azurestaticapps.net
- **Admin CMS** : https://wonderful-coast-0605c9403.4.azurestaticapps.net/admin/
