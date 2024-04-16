/* Fonction pour récupérer les projets */

const getWorks = () => {
  return fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
    return works
  });
}

/* Fonction pour récupérer les projets filtrés, en passant le nom de la catégorie en paramètre */

const getWorksFiltered = (categorie) => {
  return fetch("http://localhost:5678/api/works")
  .then(response => response.json()) 
  .then(works => {  
    const worksFilter = works.filter(function(results){
      return results.category.name === categorie
    }) 
    return worksFilter
  })
}

/* Fonction pour afficher les works sur la page d'accueil */

const afficheWorksHome = (projets) => {
  const gallery=document.querySelector(".gallery")
  gallery.innerHTML=""
  projets.forEach(projet => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    // afficher toutes les images
    img.src = projet.imageUrl
    img.alt = projet.title
    figcaption.textContent = projet.title
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)  
  })
}

/* On appelle l'affichage de la gallerie */

getWorks()
.then(works => {
  afficheWorksHome(works)
})

/* Fontion pour récupérer les catégories */

const getCategories = () => {
   return fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
    .then(categories => {
        return categories
    })
}

/* Fonction pour afficher les catégories dans des filtres */

const afficheCategories = (categories) => {
  const filters=document.querySelector("#filters")
  /* Création du bouton tous */

  const button=document.createElement("button")
  button.innerText="Tous"
  filters.appendChild(button)

  /* Gestion du clic sur le bouton "Tous"*/

  button.addEventListener("click", function(){
  getWorks()
  .then(works => {
  afficheWorksHome(works)
  })
})

  /* On crée les boutons pour chaque catégorie dans la base de données */

  categories.forEach(categorie => {
    const button=document.createElement("button")
    button.innerText=categorie.name
    filters.appendChild(button)
    button.addEventListener("click", function(){
      getWorksFiltered(categorie.name)
      .then(works => {
      afficheWorksHome(works)
    })
  })
  })
 }
/* On appelle l'affichage des filtres par catégorie */

getCategories()
  .then(categories => {
    afficheCategories(categories)
  })
// Dans le .then , on appelle la fonction afficheCategories en passant en paramètre les categories obtenues
// (Voir ligne 45 à 48 pour exemple)
