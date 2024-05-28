  const login = document.querySelector(".login")
  const logout = document.querySelector(".logout")
  const containerModale = document.querySelector(".containerModale")
  const xmark = document.querySelector(".fa-xmark") 
  const photoModal = document.getElementById("modale1") 
  const ajouterPhoto = document.getElementById("modale2") 
  const modifierButton = document.getElementById("Modifier")
  const deleteGallery = document.querySelector(".deleteGallery")
  const boutonAjoutPhoto = document.querySelector(".btnAjoutPhoto")
  const previewImage = document.getElementById("previewImage")
  const categorieModale = document.getElementById("modaleCategorie")
  const fileModale = document.getElementById("file")
  const para = document.getElementById("para")

  // Fermeture de la modale au clic sur la croix
  xmark.addEventListener("click", () => {
      containerModale.style.display = "none"
  })

  // Enlever la modale au clic à côté
  containerModale.addEventListener("click", (e) => {
      if (e.target.className === "containerModale") {
          containerModale.style.display = "none"
          ajoutPhoto.style.display = "none"
      }
  })

    // Ajout de l'écouteur d'événements pour afficher la modale au clic sur le bouton Modifier
    modifierButton.addEventListener("click", () => {
      containerModale.style.display = "flex"
      photoModal.style.display = "flex" // Afficher la modale
      displayphotoModal()
    })

  // Affichage de la gallery dans la modale + affichage corbeille
  async function displayphotoModal() {
      deleteGallery.innerHTML = ""
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
          deleteGallery.appendChild(figure)
      })
  }

  // Appeler deletephotos avec l'ID approprié lorsque nécessaire
async function deletePhotoHandler(id) {
    try {
        await deletephotos(id) // Appeler deletephotos avec l'ID
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression :", error)
    }
}


// Fonction pour afficher un message de confirmation avant la suppression
function confirmDeletePhoto(id) {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette image ?")
  if (confirmation) {
      deletePhotoHandler(id)
  }
}


function getAuthorization() {
    const token = localStorage.getItem('token')
    if (token) {
        return 'Bearer ' + token
    } else {
        return null
    }
}

  // Supprimer une image dans la modale
function deletephotos(id) {
    let text = "Voulez-vous supprimer ce projet ?"
    if(confirm(text) == true)
    {
      fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Authorization': getAuthorization(), 
            'Content-Type': 'application/json',
        },
        params: {
          'id' : id
        }
      })
      .then(response => {
          if (!response.ok) {
              return
          }
          displayphotoModal()
          getProjet()
      })
      .catch(error => {
          console.error("Une erreur s'est produite lors de la suppression :", error)
      })
    } 
}

  // Lier le bouton "Ajouter une photo" à la modale
  boutonAjoutPhoto.addEventListener("click", () => {
    photoModal.style.display = "none"
    ajouterPhoto.style.display = "flex"
  })



  











  //deuxième modale

  const ajouterButton = document.querySelector("#ajouterButton")
  const ajoutPhoto = document.querySelector(".ajoutPhoto")
  const arrowLeft = document.getElementById("arrowLeft")
  const xmarkAdd = document.getElementById("xmarkAdd")

    arrowLeft.addEventListener("click", ()=>{
      ajouterPhoto.style.display = "none"
      photoModal.style.display = "flex"
    })

    xmarkAdd.addEventListener("click", ()=>{
        ajoutPhoto.style.display = "none"
        photoModal.style.display = "none"
        containerModale.style.display = "none"
    })

    const addPicture = document.querySelector(".addPicture")
    const inputFile = document.querySelector(".addPicture input")
    const labelFile = document.querySelector(".addPicture label")
    const iconFile = document.querySelector(".fa-image.fa-4x") 
    const pFile = document.querySelector(".addPicture p")
  
    inputFile.addEventListener("change", (event) => {
      afficheImageModale(event)
    }) 

  
    const form = document.querySelector(".addPicture form")
    const titre = document.getElementById("titre")
  

    async function displayCategorieModale() {
      const select = document.querySelector(".ajoutPhoto select")
      if (select) {
        const categories = await getCategories()
        categories.forEach(modaleCategorie => { 
          const option = document.createElement("option")
          option.value = modaleCategorie.id
          option.textContent = modaleCategorie.name
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
          body: formData 
        })
        .then(response => response.json())
        .then(data => {
          console.log("La photo a bien été ajoutée", data)
          getWorks()
        })
      })
    }

    function verifChamps() {
      const titreValue = titre.value
      const categorieModaleValue = categorieModale.value
      const fileModaleValue = fileModale.files[0]
      if ( titreValue !="" && categorieModaleValue != "" && fileModaleValue !="")
      {
        para.style.color = "white"
        para.style.background = "#1D6154"
        return true
      }else{
        para.style.background = "grey"
        para.style.color = "white"
        return false
      }
    }

titre.addEventListener("input", (event) => {
  verifChamps()
}) 

categorieModale.addEventListener("change", (event) => {
  verifChamps()
})

// Prévisualisation de l'image
function afficheImageModale(event) {
  const fileInput = event.target
  const reader = new FileReader()
  const image = new Image()
  const file = fileInput.files[0]
  const fileName = file.name
  const previewImage = document.getElementById("previewImage")

  reader.onload = (event) => {
    image.src = event.target.result
    image.alt = fileName.split('.')[0]
    console.log(previewImage)
    previewImage.appendChild(image)
    addPicture.style.display = "none"
    previewImage.style.display = "flex"
  }

  reader.readAsDataURL(file)
}

//appel du token pour l'ajout des photos

para.addEventListener("click", (event) => {
  event.preventDefault()
  let valid = verifChamps()
  if(valid) {
    addphoto()
  }else{
    alert ("Merci de remplir tout les champs")
  }
})

//fonction fermeture de la modale àl'ajout des photos
function closeModale1() {
  var closeModale = document.querySelector(".ajoutPhoto")
  if(closeModale) {
    closeModale.style.display = "none"
    containerModale.style.display = "none"
  }
}

function addphoto() {
  console.log("ok")
  const token = localStorage.getItem('token')
  if (!token) {
      console.error("Token d'authentification manquant.")
      return;
  }
  const titreValue = titre.value
  const categorieModaleValue = categorieModale.value
  const fileModaleValue = fileModale.files[0]
  const formData = new FormData()
  formData.append("image", fileModaleValue)
  formData.append ("category", categorieModaleValue)
  formData.append ("title", titreValue)

  fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Authorization': getAuthorization()
      },
      body: formData
  })
  .then(response => {
    displayphotoModal()
    getProjet()
    closeModale1()
    return response.json()
  })
  .then(data => {
    console.log(data)
    closeModale1()
    window.location.reload()
  })
  .catch(error => {
      console.error("Une erreur s'est produite lors de l'ajout de la photo:", error)
  })
}

//rafraichir la page d'accueil faire fonction