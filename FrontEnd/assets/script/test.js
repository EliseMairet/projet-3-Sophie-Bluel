/*// Fonction pour afficher les catégories dans des filtres 

const afficheCategories = (categories) => {
  const filters=document.querySelector("#filters")
  // Création du bouton tous 
  const button=document.createElement("button")
  button.innerText="Tous"
  filters.appendChild(button)
  // Gestion du clic sur le bouton "Tous"
  button.addEventListener("click", function(){
  getWorks()
  .then(works => {
  afficheWorksHome(works)
  })
})

  // On crée les boutons pour chaque catégorie dans la base de données 
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

// On appelle l'affichage des filtres par catégorie 
getCategories()
  .then(categories => {
    afficheCategories(categories)
  })*/

