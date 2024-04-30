//affichage de la modale à la connection
//variable

//const admin = document.querySelector (".admin")
const containerModale = document.querySelector(".containerModale")
const xmark = document.querySelector(".containerModals .fa-xmark")
const photoModal = document.querySelector(".photoModal")

//au click admin apparition modale
admin.addEventListener("click", ()=>{
    console.log(admin)
    containerModale.style.display ="flex"
})

//au click de la croix fermeture modale
xmark.addEventListener("click", ()=>{
    console.log(xmark)
    containerModale.style.display ="none"
})

//enlever modale au click à côté
containerModale.addEventListener("click", (e)=>{
    console.log(e.target)
    if (e.target.className == "containerModale") {
        containerModale.style.display = "none"
    }
})






//bouton modifier 
const modifier=document.createElement("button")
  button.innerText="Modifier"
  addEventListenerd("fa-solid fa-pen-to-square")
  portfolio.appendChild(button)
// lier le bouton modifier à la modale
  button.addEventListener("click", function(){
    photoModal()
    .then(works => {
    photoModal(works)
    })
  })





//affichage de la gallery dans la modale + affichage corbeille

async function displayphotoModal () {
    photoModal.innerHTML = ""
    const photos = await getWorks() //récupération gallery 
    photos.forEach(photos => { //création de la gallery dans la modale
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash = document.createElement("i")
        trash.classList.add("fa-solid", "fa-trash-can") //injection corbeille
        trash.id = photos.id //récupération de l'id dans la corbeille  (faire un addeventlistener) 
        img.src = photos.imageUrl // récupération url dans la corbeille
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        photos.appendChild(figure)
    })
  }

  displayphotoModal()

  //supprimer une image dans la modale
  function deletephotos () {
    const trashAll = document.querySelectorAll (".fa-trash-can")
    trashAll.forEach(trash => {
        trash.addEventListener("click", (e)=>{
           const id = trash.id
           const init = {
            method: "delete",
            Headers:{"content-Type": "application/json"},
           }
           fetch("http://localhost:5678/api/works/" + id)
           .then ((response)=>{
             if (!response.ok) {
                console.log ("la suppression n'a pas marché")
             }
             return response.json()
           })
           .then((data0)=>{
            console.log("la suppression a reussi voici la data:",data)
            displayphotoModal()
            afficheGallery()
           })
        })
    })
  }

  deletephotos()

//bouton ajouter photo
const ajouter=document.createElement("button")
button.innerText="Ajouter une photo"
photoModal.appendChild(button)
// lier le bouton "ajouter aphot" à la modale2
button.addEventListener("click", function(){
  ajoutPhoto()
  })



