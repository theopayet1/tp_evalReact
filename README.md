<!-- Badges "langages utilisés" (shields.io) -->
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-black?logo=javascript)
![React](https://img.shields.io/badge/React-18%2B-black?logo=react)
![Vite](https://img.shields.io/badge/Vite-5%2B-black?logo=vite)
![CSS%20Modules](https://img.shields.io/badge/CSS%20Modules-black?logo=css3)
# ⚔️ Witcher Board — Frontend (React + Vite)

Application React réalisée dans le cadre de l’examen **Witcher Board** : un tableau de contrats (quêtes) consultables, filtrables côté serveur, consultables en détail, créables / modifiables, avec une “authentification” simplifiée en tant que sorceleur (sélection).

---

## ✅ Objectifs de l’examen couverts

- **React + Vite** + **React Router**
- **Liste des contrats** + style minimaliste + différenciation visuelle selon le statut (`Available`, `Assigned`, `Completed`)
- **Filtres côté serveur** (aucun filtrage JS côté front)
- **Détail d’un contrat** + récupération du sorceleur assigné (si `Assigned` / `Completed`)
- **Création** + **Modification** via formulaire (champs autorisés uniquement)
- **Connexion sorceleur (sélection)** + affichage du sorceleur courant + actions **assigner** / **terminer**

> CSS : volontairement simple, **sans framework** (ni Tailwind, ni Bootstrap), comme demandé.

---

## 🧰 Prérequis

- Node.js + npm
- Backend lancé sur `http://localhost:3000`

---

## ▶️ Lancer le backend (fourni)

L’API tourne sur `http://localhost:3000` et la doc Swagger est sur `http://localhost:3000/api-docs`.

⚠️ Relancer l’API réinitialise la base (données pré-remplies).

---

## ▶️ Lancer le frontend

```bash
npm install
npm run dev
```

Frontend (Vite) : `http://localhost:5173`

---

## 🧭 Routes principales

- `/` : page d’accueil
- `/contract` : liste des contrats + filtres
- `/contract/:id_contract` : détail d’un contrat
- `/contract/create` : création d’un contrat
- `/contract/:id_contract/edit` : édition d’un contrat
- `/login` : “connexion” sorceleur (sélection d’un sorceleur existant)

---

## 🔌 API utilisée (résumé)

### Contrats
- `GET /api/contracts/` : liste (avec filtres en query params côté serveur)
- `GET /api/contracts/:id` : détail contrat
- `POST /api/contracts/` : création
- `PUT /api/contracts/:id` : modification
- `PUT /api/contracts/:id/assignedTo` : assignation au sorceleur courant (**payload = id sorceleur**, ex: `3`)
- `PUT /api/contracts/:id/status` : finalisation (**payload = "Completed"**)

### Sorceleurs
- `GET /api/witchers` : liste sorceleurs (page login)
- `GET /api/witchers/:id` : détail sorceleur (affiché sur contrat `Assigned` / `Completed`)

---

## 🧩 Choix techniques (simples et lisibles)

- **HttpClient** : centralisation des appels `GET/POST/PUT/DELETE`, parsing JSON, gestion d’erreurs.
- **Composants UI réutilisables** (CSS Modules) : `Button`, `Input`, `Select`, `Card`.
- **Card réutilisée** : affichage en liste (compact) et affichage détail (variant `detail`).
- **Formulaire partagé** : `ContractForm` utilisé pour **Create** et **Edit** (seule la route / requête change).
- **Session sorceleur** : `WitcherSessionService` stocke `{ id, name }` dans `sessionStorage`
    - persistant pendant la navigation
    - jusqu’à fermeture de l’onglet (pas une vraie auth)

---

## 🧪 Règles importantes respectées

- Les filtres **doivent relancer la requête HTTP** et laisser **le serveur filtrer**  
  ❌ Aucun `.filter()` sur la liste côté front.
- Sur le détail :
    - si `Available` → bouton **Assigner** au sorceleur connecté
    - si `Assigned` ET `assignedTo === witcherCourant.id` → bouton **Terminer** → `Completed`

---

## 🗂️ Architecture du projet

```txt
src/
├─ assets/
├─ components/
│  ├─ contracts/
│  │  ├─ ContractForm/
│  │  │  ├─ ContractForm.jsx
│  │  │  └─ ContractForm.module.css
│  └─ ui/
│     ├─ Button/
│     │  ├─ Button.jsx
│     │  └─ Button.module.css
│     ├─ Card/
│     │  ├─ Card.jsx
│     │  └─ Card.module.css
│     ├─ Input/
│     │  ├─ Input.jsx
│     │  └─ Input.module.css
│     └─ Select/
│        ├─ Select.jsx
│        └─ Select.module.css
├─ pages/
│  ├─ Contract/
│  │  ├─ ContractDetail/
│  │  ├─ CreateContract/
│  │  ├─ EditContractPage/
│  │  ├─ LoginWitcherPage/
│  │  └─ ContractPage.jsx
│  └─ Home/
│     └─ HomePage.jsx
├─ services/
│  ├─ HttpClient.js
│  └─ WitcherSessionService.js
├─ App.css
└─ App.jsx
└─ index.css
└─ mmain.jsx
.env
