# 🟦 DummyJSON Angular App

Une application Angular 17+ pour afficher des utilisateurs, posts et commentaires depuis l’API [DummyJSON](https://dummyjson.com/).  
Le projet utilise **Bootstrap 5** pour un design moderne et responsive et suit une **architecture claire** avec models, services et features.

---

## 📂 Structure du projet

src/app/
├── core/
│ ├── models/ # Interfaces TypeScript (User, Post, Comment)
│ └── services/ # Services Angular pour l'API
├── features/
│ ├── users/
│ │ └── pages/ # Composants...
│ └── products/
│ └── pages/ # Composants...
├── app.component.ts
└── app.routes.ts # Routing principal


---

## 🧱 Fonctionnalités

### 1. Liste des utilisateurs
- Affiche tous les utilisateurs avec image, nom et email
- Cliquer sur un utilisateur ouvre la page de détails

### 2. Détail utilisateur
- Affiche les informations complètes (nom, email, âge, image)
- Liste des posts de cet utilisateur
- Navigation vers chaque post

### 3. Liste globale des posts
- Affiche tous les posts
- Affiche l’auteur du post
- Navigation vers le post ou l’utilisateur

### 4. Détail d’un post
- Affiche le contenu du post
- Liste les commentaires avec le nom et avatar de l’auteur
- Bouton retour vers l’utilisateur

### 5. Produits
- **Afficher la liste de l'ensemble des produits** avec titre et prix
- **Page de détail pour chaque produit** permettant :
  - **Modification** du produit via un **Reactive Form**
  - **Suppression** du produit avec confirmation
- **Page dédiée à la création** d'un nouveau produit via un **Reactive Form**
- Modal de succès après modification avec redirection automatique
---

## ⚙️ Technologies

- Angular 17+  
- TypeScript  
- Bootstrap 5 (responsive et moderne)  
- RxJS pour les appels API  
- Angular Router pour la navigation  
- Standalone Components Angular

---

## 🚀 Installation et démarrage

1. Cloner le projet :

```bash
git clone <repo-url>
cd <project-folder>
```

2. Installer les dépendances

```bash
npm install
```

3. Lancer le serveur Angular

```bash
ng serve
```

4. Ouvrir dans le navigateur

```bash
http://localhost:4200
```

---

## 📦 Services API

- UserService : getUsers(), getUserById(id)

- PostService : getPosts(), getPostsByUser(userId), getPostById(postId)

- CommentService : getCommentsByPost(postId)

- ProductService : loadProducts(), getProductById(id), addProduct(), updateProduct(), deleteProduct()

Les services utilisent RxJS Observables et des modèles TypeScript pour typage strict. 

---

## 🎨 Design

- Bootstrap 5 pour un rendu moderne et responsive
- Cards pour utilisateurs et posts
- List-group pour commentaires
- Navbar pour navigation globale

---

## ✅ Avantages

- Architecture claire et maintenable
- Typage strict avec modèles TypeScript
- Navigation propre avec Angular Router
- Responsive et esthétique grâce à Bootstrap

 


