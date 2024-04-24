/*faire le lien avec api*/
fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((projets) => {
    console.log("Projets: ", projets)
    afficheGallery(projets)
  });

//afficher la galerie
function afficheGallery(projets) {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""
  projets.forEach((projet) => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")

    //afficher toutes les images
    img.src = projet.imageUrl
    img.alt = projet.title
    figcaption.textContent = projet.title
    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
  })
}

//récupérer les filtres

const getCategories = () => {
  const categories = fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
  return categories
}

getCategories() 
 .then(categories => {
  afficheCategories(categories)
 })

  // Fonction pour récupérer les projets 
  const getWorks = () => {
    return fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
      return works
    });
  }

/*Fonction pour récupérer les projets filtrés, en passant le nom de la catégorie en paramètre */
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



// création des filtres + afficher bouttons 

// Fonction pour afficher les catégories dans des filtres 
const afficheCategories = (categories) => {
  const filters=document.querySelector(".filters")
  // Création du bouton tous 
  const button=document.createElement("button")
  button.innerText="Tous"
  filters.appendChild(button)
  // Gestion du clic sur le bouton "Tous"
  button.addEventListener("click", function(){
  getWorks()
  .then(works => {
  afficheGallery(works)
  }) 
})
  categories.forEach(categorie => {
    const button=document.createElement("button")
    button.innerText=categorie.name
    filters.appendChild(button)
    button.addEventListener("click", function(){
      getWorksFiltered(categorie.name)
      .then(works => {
      afficheGallery(works)
    })
  })
  })
}

  /**************partie connection**************/
  const loged = window.sessionStorage.loged
  const admin = document.querySelector ("header nav .admin")
  const logout = document.querySelector ("header nav .logout")


  if (loged == "true"){
    admin.textContent = "Admin"
    logout.textContent = "logout"
    logout.addEventListener("click", ()=>{
      window.sessionStorage.loged = false // pour la deconnection
    })
  }