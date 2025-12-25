# STATUS - 25 Décembre 2024

## Résumé du projet

Site de campagne électorale municipale "Une Énergie Commune" pour le village.

## Stack technique

- **Framework** : Next.js 16.1.1
- **Styling** : Tailwind CSS 4
- **CMS** : Decap CMS (admin sur /admin)
- **Hébergement** : Azure Static Web Apps (en cours de déploiement)

## Pages créées

| Page | Route | Status |
|------|-------|--------|
| Accueil | `/` | ✅ OK |
| Équipe | `/equipe` | ✅ OK - Photo interactive 21 membres |
| Thématiques | `/thematiques` | ✅ OK - 5 axes programme |
| Actualités | `/actus` | ✅ OK |
| Contact | `/contact` | ✅ OK |
| Participer | `/participer` | ✅ OK |
| Connexion | `/connexion` | ⚠️ Auth à revoir |

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

## Problème actuel : Déploiement Azure SWA

### Tentatives
1. ❌ `output: 'export'` + API routes → Erreur : API routes incompatibles
2. ❌ Next.js SSR (sans export) → Erreur : "Invalid API key" (résolu)
3. ❌ Next.js SSR → Erreur : "Web app warm up timed out"

### Solutions possibles
1. **Export statique** : Retirer `/api/auth` et `/connexion`, utiliser `output: 'export'`
2. **Vercel** : Déploiement natif Next.js (gratuit)
3. **Azure avec retry** : Parfois le timeout est temporaire

### Auth alternatives (si export statique)
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
│   ├── thematiques/page.tsx
│   ├── api/auth/         # ⚠️ À retirer si export statique
│   └── connexion/        # ⚠️ À retirer si export statique
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

1. [ ] Résoudre déploiement Azure (export statique ou retry)
2. [ ] Compléter noms réels des 21 membres
3. [ ] Ajouter photos individuelles membres (optionnel)
4. [ ] Configurer Decap CMS auth (GitHub OAuth)
5. [ ] Tester formulaire contact
6. [ ] Ajouter Google Forms pour enquête citoyenne

## Repository

- GitHub : https://github.com/XeLoRy/tmp4 (privé recommandé)
- Azure SWA : wonderful-coast-0605c9403.azurestaticapps.net (en attente)
