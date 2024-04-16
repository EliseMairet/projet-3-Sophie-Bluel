/*faire le lien avec api*/
fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((projets) => {
    console.log("Projets: ", projets)
    afficheGallery(projets)
    afficheCategories()
  });

/*afficher la galerie*/

function afficheGallery(projets) {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""
  projets.forEach((projet) => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")


    /*afficher toutes les images*/

    img.src = projet.imageUrl
    img.alt = projet.title
    figcaption.textContent = projet.title
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
  })
}

/*récupérer les filtres*/

const getCategories = () => {
  const categories = fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
  return categories
}

/* création des filtres + afficher bouttons */

  // Créer le bouton "Tous"
const tous = () => {
  var btn = document.createElement("BUTTON")         // Créer un élément <button>
  var t = document.createTextNode("CLICK ME")        // Créer un noeud textuel
  btn.appendChild(tous)                               
  document.body.appendChild(btn)          
  console.log()         
}

/*bouttons des filtres*/

const afficheCategories = async () => {
  const filters = document.querySelector(".filters")
  const categories = await getCategories()
  console.log("Get categories response: ", categories)
  categories.forEach((categorie) => {
    const bouttonCategories = document.createElement("button")
    bouttonCategories.innerText = categorie.name
    bouttonCategories.id = categorie.id
    filters.appendChild(bouttonCategories)
  })
}


/*filtrer au click par categorie la gallerie*/





/**********à faire **********/
  // On crée un bouton "Tous"
  // On lui met le texte "Tous"
  // On l'insère dans filters

  /* Gestion du clic sur le bouton "Tous"

  // On met un addEventListener sur le clic de ce bouton "Tous"
  // On appelle la fonction getWorks()
  // Dans le .then , on appelle la fonction afficheWorksHome en passant en paramètre les works obtenus
  // (Voir lignes 45 à 48)

  /* On crée les boutons pour chaque catégorie dans la base de données */

  // On appelle getCategories()
  // Dans le .then, on boucle sur chaque catégorie
  // Pour chaque catégorie trouvée, on crée un bouton
  // On lui met comme texte le nom de la catégorie
  // On l'insère dans filters

  // On met un addEventListener sur le clic de ce bouton
  // On appelle la fonction getWorksFiltered en passant en paramètre le nom de la catégorie
  // Dans le .then , on appelle la fonction afficheWorksHome en passant en paramètre les works obtenus

/* On appelle l'affichage des filtres par catégorie */

// On appelle getCategories
// Dans le .then , on appelle la fonction afficheCategories en passant en paramètre les categories obtenues
// (Voir ligne 45 à 48 pour exemple)