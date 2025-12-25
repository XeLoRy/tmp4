# STATUS - 25 Décembre 2024

## Résumé du projet

Site de campagne électorale municipale "Une Énergie Commune" pour le village.

## Stack technique

- **Framework** : Next.js 16.1.1
- **Styling** : Tailwind CSS 4
- **CMS** : Decap CMS (admin sur /admin)
- **Hébergement** : Azure Static Web Apps (export statique)

## Pages créées

| Page | Route | Status |
|------|-------|--------|
| Accueil | `/` | ✅ OK |
| Équipe | `/equipe` | ✅ OK - Photo interactive 21 membres |
| Thématiques | `/thematiques` | ✅ OK - 5 axes programme |
| Actualités | `/actus` | ✅ OK |
| Contact | `/contact` | ✅ OK |
| Participer | `/participer` | ✅ OK |

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

### Solution adoptée : Export statique
- ✅ `output: 'export'` dans next.config.ts
- ✅ Supprimé `/api/auth`, `/connexion`, `auth.ts`, `middleware.ts`
- ✅ Workflow GitHub avec `output_location: "out"`

### Auth alternatives (à implémenter plus tard si besoin)
- Decap CMS : Utilise GitHub OAuth nativement
- Google Forms : Pour inscriptions citoyens
- Azure Functions : Dans `/api` folder séparé
- Firebase/Supabase : Auth côté client

## Fichiers clés

```
src/
├── app/
│   ├── page.tsx          # Accueil avec hero + mot tête de liste
│   ├── equipe/page.tsx   # Photo interactive
│   └── thematiques/page.tsx
├── components/
│   ├── EquipeClient.tsx  # Composant interactif photo groupe
│   ├── Header.tsx
│   └── Footer.tsx
└── lib/
    └── content.ts        # Lecture fichiers markdown

content/
├── equipe/               # 21 fichiers membres avec positions x,y
├── thematiques/          # 5 axes du programme
├── config/site.md        # Config globale (photo groupe, etc.)
└── pages/accueil.md      # Textes page d'accueil

public/
├── images/
│   ├── equipe-groupe.jpg
│   └── mm.png            # Photo tête de liste
└── admin/                # Decap CMS
```

## Prochaines étapes

1. [x] Export statique configuré
2. [x] Déploiement Azure SWA ✅ EN LIGNE
3. [ ] Compléter noms réels des 21 membres
4. [ ] Ajouter photos individuelles membres (optionnel)
5. [ ] Configurer Decap CMS auth (GitHub OAuth)
6. [ ] Tester formulaire contact
7. [ ] Ajouter Google Forms pour enquête citoyenne

## Repository

- GitHub : https://github.com/XeLoRy/tmp4
- **Site en ligne** : https://wonderful-coast-0605c9403.4.azurestaticapps.net
