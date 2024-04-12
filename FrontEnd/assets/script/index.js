/*faire le lien avec api*/
fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((projets) => {
    console.log("Projets: ", projets)
    afficheGallery(projets);
    afficheCategories();
  });

/*afficher la galerie*/

function afficheGallery(projets) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  projets.forEach((projet) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");


    /*afficher toutes les images*/
    img.src = projet.imageUrl;
    img.alt = projet.title;
    figcaption.textContent = projet.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

/*récupérer les filtres*/

const getCategories = () => {
  const categories = fetch("http://localhost:5678/api/categories")
    .then((reponse) => reponse.json())
  return categories
};

/* création des filtres + affiche bouttons */

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

const filtreCategorie = async () => {
  const projets = await categories()
  console.log(categories)
  const bouttons = document.querySelectorAll(".filters button")
    buttons.forEach((button) => {
    button.addEventListener("click", (e)=>{
      console.log(e.target.id)
    })
  })
}

filtreCategorie()