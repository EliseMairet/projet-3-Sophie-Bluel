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

  // Appeler deletephotos avec l'ID approprié lorsque nécessaire
async function deletePhotoHandler(id) {
    try {
        await deletephotos(id) // Appeler deletephotos avec l'ID
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression :", error)
    }
}

deletePhotoHandler()

function getAuthorization() {
    const token = localStorage.getItem('token')
    if (token) {
        return 'Bearer ' + token
    } else {
        return null
    }
}

getAuthorization()

  // Supprimer une image dans la modale
function deletephotos(id) {
    const token = localStorage.getItem('token')
    if (!token) {
        console.error("Token d'authentification manquant.")
        return;
    }

    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token, // Ajouter le token d'authentification dans l'en-tête
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            console.log("La suppression n'a pas réussi.")
            return
        }
        console.log("La suppression a réussi.")
        displayphotoModal();
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la suppression :", error)
    })
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

  //deuxième modale

  const ajouterButton = document.querySelector("#ajouterButton")
  const ajoutPhoto = document.querySelector(".ajoutPhoto")
  const arrowLeft = document.getElementById("arrowLeft")
  const xmarkAdd = document.getElementById("xmarkAdd")

//lier bouton "ajouter photo" à la modale 2
// bouton ajouter 
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
    modifierContainer.appendChild(AjouterButton)
}

Ajouter()

function addDisplay() {
    arrowLeft.addEventListener("click", ()=>{
        ajoutPhoto.style.display = "flex"
        photoModal.style.display = "none"
    })
    xmarkAdd.addEventListener("click", ()=>{
        ajoutPhoto.style.display = "none"
        photoModal.style.display = "none"
    })
}

addDisplay()

    const addPicture = document.querySelector(".addPicture")
    const inputFile = document.querySelector(".addPicture input")
    const labelFile = document.querySelector(".addPicture label")
    const iconFile = document.querySelector(".fa-image.fa-4x") // Correction du sélecteur pour l'icône
    const pFile = document.querySelector(".addPicture p")
  
    if (inputFile) {
      inputFile.addEventListener("change", () => {
        const file = inputFile.files[0] // Correction de l'accès au fichier
        console.log(file)
        if (file) {
          const reader = new FileReader()
          reader.onload = function (e) {
            addPicture.src = e.target.result
            addPicture.style.display = "flex"
            labelFile.style.display = "none"
            iconFile.style.display = "none"
            pFile.style.display = "none"
          }
          reader.readAsDataURL(file)
        }
      })
    } else {
      console.error("Input file element not found")
    }
  
    const form = document.querySelector(".addPicture form")
    const titre = document.getElementById("titre")
    const modaleCategorie = document.querySelector(".picture .modaleCategorie") // Correction du sélecteur
  
    async function displayCategorieModale() {
      const select = document.querySelector(".ajoutPhoto select")
      if (select) {
        const categories = await getCategories()
        categories.forEach(modaleCategorie => { // Correction de la boucle
          const option = document.createElement("option")
          option.value = modaleCategorie.id
          option.textContent = modaleCategorie.className
          select.appendChild(option)
        })
      } else {
        console.error("Select element not found")
      }
    }
  
    displayCategorieModale()
  
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        fetch("http://localhost:5678/api/works/", {
          method: "POST",
          body: formData // Correction de la transformation du formData
        })
        .then(response => response.json())
        .then(data => {
          console.log("La photo a bien été ajoutée", data)
          getWorks()
        });
      });
    } else {
    }
  
    function verifChamps() {
      const modale2 = document.getElementById("modale2")
      const validerButon = document.createElement("button")
      validerButon.innerText = "Valider"
      if (form) {
        form.addEventListener("input", () => {
          if (titre.value !== "" && modaleCategorie.value !== "" && inputFile.value !== "") {
            validerButon.classList.add("valid")
          } else {
            validerButon.classList.remove("valid")
            validerButon.disabled = true;
          }
        })
        modale2.appendChild(validerButon); // Ajout du bouton au DOM
      } else {
      }
    }
  
    verifChamps()
