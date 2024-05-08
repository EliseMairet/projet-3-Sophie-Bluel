  const login = document.querySelector(".login")
  const logout = document.querySelector(".logout")
  const containerModale = document.querySelector(".containerModale")
  const xmark = document.querySelector(".fa-xmark") 
  const photoModal = document.getElementById("modale1") 
  const ajouterPhoto = document.getElementById("modale2") 
  const modifierButton = document.querySelector("#Modifier")

  // Affichage de la modale à la connexion
  login.addEventListener("click", () => {
      containerModale.style.display = "flex"
  })

  // Fermeture de la modale au clic sur la croix
  xmark.addEventListener("click", () => {
      containerModale.style.display = "none"
  })

  // Enlever la modale au clic à côté
  containerModale.addEventListener("click", (e) => {
      if (e.target.className === "containerModale") {
          containerModale.style.display = "none"
      }
  })

    // Ajout de l'écouteur d'événements pour afficher la modale au clic sur le bouton Modifier
    modifierButton.addEventListener("click", () => {
        displayphotoModal()
        deletephotos()
        containerModale.style.display = "flex" // Afficher la modale
    })

// Attachez l'événement de clic au bouton "Modifier"
document.getElementById("Modifier").addEventListener("click", async () => {
    await displayphotoModal()
    deletephotos()
    document.querySelector(".containerModale").style.display = "flex" // Afficher la modale
})

  // Affichage de la gallery dans la modale + affichage corbeille
  async function displayphotoModal() {
      photoModal.innerHTML = ""
      const photos = await getWorks() // Récupération de la galerie
      photos.forEach((photo) => {
          const figure = document.createElement("figure")
          const img = document.createElement("img")
          const span = document.createElement("span")
          const trash = document.createElement("i")
          trash.classList.add("fa-solid", "fa-trash-can")
          trash.addEventListener("click", () => {
            deletephotos(photo.id)
          })
          img.src = photo.imageUrl
          span.appendChild(trash)
          figure.appendChild(span)
          figure.appendChild(img)
          photoModal.appendChild(figure)
      })
  }

  displayphotoModal()

  function getAuthorization() {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        return 'Bearer' + logged
        } else {
        return false
 }
}

getAuthorization()

  // Supprimer une image dans la modale
  function deletephotos(id) {
              const response = fetch("http://localhost:5678/api/works/" + id, {
                  method: "DELETE",
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': getAuthorization(), //token
                    'Content-Type': 'application/json',
                  },
                params: {
                    'id': id
                    } 
              })
              if (!response.ok) {
                  console.log("La suppression n'a pas réussi.")
                  return
              }
              console.log("La suppression a réussi.")
              displayphotoModal()
          }

deletephotos()

  // Bouton ajouter photo
  const ajouter = document.createElement("button")
  ajouter.innerText = "Ajouter une photo"
  photoModal.appendChild(ajouter)

  // Lier le bouton "Ajouter une photo" à la modale
  ajouter.addEventListener("click", () => {
      containerModale.style.display = "flex"
  })

async function Ajouter() {
    const modifierContainer = document.querySelector("#modale1") // Sélection de l'élément où le bouton Modifier sera ajouté
    // Création dynamique du bouton Modifier
    const AjouterButton = document.createElement("button")
    AjouterButton.innerText = "Ajouter une photo"
    // Ajout de l'écouteur d'événements pour afficher la modale au clic sur le bouton Modifier
    AjouterButton.addEventListener("click", async () => {
        await modale2()
        containerModale.style.display = "flex" // Afficher la modale
    })
    // Ajout du bouton Modifier à l'élément Modifier

    // modifierContainer.appendChild(AjouterButton)
}

Ajouter()


  //prévisualisation de l'image