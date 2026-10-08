# Système de Design - TechPulse

## 1. Palette de Couleurs (Tailwind CSS)
Pour un look moderne, Tech et IA, nous optons pour un thème sombre avec des accents vibrants (néon) qui rappellent le cyberespace et l'innovation.

*   **Fond principal (Background) :** `bg-slate-900`
*   **Fond secondaire (Cartes, Sidebar) :** `bg-slate-800`
*   **Texte principal :** `text-slate-100`
*   **Texte secondaire (Métadonnées, dates) :** `text-slate-400`
*   **Couleur d'accentuation primaire (Boutons, Liens, Tags IA) :** `text-cyan-400` / fond `bg-cyan-500` avec hover `hover:bg-cyan-400`
*   **Couleur d'accentuation secondaire (Alertes, Nouveautés) :** `text-fuchsia-400` / fond `bg-fuchsia-500`
*   **Bordures et séparateurs :** `border-slate-700`

## 2. Typographie
Une combinaison de polices modernes pour allier lisibilité et identité "Tech".

*   **Titres (Headings - H1, H2, H3) :** *Space Grotesk* (pour un aspect géométrique et résolument tech). Configuration Tailwind : `font-display`.
*   **Corps de texte (Body) :** *Inter* ou la police système standard. Configuration Tailwind : `font-sans`. Lisibilité maximale sur tous les écrans.

## 3. Structure de la Page d'Accueil

La page d'accueil mettra en valeur le contenu récent avec une esthétique épurée et immersive.

### A. Navigation (Navbar)
*   **Logo :** "TechPulse" avec la partie "Pulse" stylisée (`text-cyan-400`).
*   **Liens :** IA, Développement, Hardware, Sécurité.
*   **Actions :** Icône de recherche, Bouton "S'abonner" (`bg-cyan-500 text-slate-900 font-medium rounded-full`).

### B. Section Héro (Hero Section)
*   Mise en avant de l'article phare.
*   **Layout :** Grande image d'illustration en arrière-plan avec overlay dégradé, ou disposition côte à côte.
*   **Éléments :** Badge de catégorie, Titre massif (H1), Courte description, Bouton "Lire l'article".

### C. Contenu Principal (Main Layout)
Utilisation d'une grille CSS pour la structure globale : `grid grid-cols-1 lg:grid-cols-4 gap-8`.

**1. Grille d'Articles (Zone de contenu principale : `lg:col-span-3`)**
*   Affichage des derniers articles sous forme de cartes fluides.
*   **Style des cartes :** `bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-colors`.

**2. Sidebar (Barre latérale : `lg:col-span-1`)**
*   **Section "Tendances" :** Liste compacte des articles les plus populaires de la semaine.
*   **Espace Publicitaire :** Encart pub encadré discrètement (`border border-slate-700 bg-slate-800/50`).
*   **Widget Newsletter :** Formulaire minimaliste.

### D. Footer (Pied de page)
*   Navigation secondaire, liens vers les réseaux sociaux, mentions légales.
*   Séparateur supérieur : `border-t border-slate-800`.
