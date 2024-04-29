
// varaible login
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const form = document.querySelector("#formulaire")
const messageErreur = document.querySelector(".login p")


//Création du Login

// faire la route users/login (methode post)
/*récuperer les informations users/login*/
/*function loginUser() {
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(logUser)
  })
  .then((response) => response.json())
  .then((responseData) => {
      data = responseData;
      console.log(data);
  });
}*/
     console.log(form)
    form.addEventListener("submit", e => {
      e.preventDefault() //empêcher la page de se rafraichir à la connection
      const userEmail = email.value
      const userPwd = password.value
    if (userEmail == "" || userPwd == "") {
      alert ("Merci de remplir tout les champs")
    }
    else {
     loginUser() 
    }
     })
    
// Traitement de la réponse de la fonction loginUser()
function loginUser() {
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(logUser)
  })
  .then((response) => response.json())
  .then((responseData) => {
      // Vérification si la connexion est réussie ou non
      if (responseData.success) {
          // Connexion réussie, rediriger vers la page d'accueil
          window.sessionStorage.loged = true //stockage token
          window.location.href = "../index.html"
          console.log("je suis connecté")
      } else {
          // Connexion échouée, afficher un message d'erreur
          email.classList.add("inputErrorLogin")
          password.classList.add("inputErrorLogin")
          messageErreur.textContent = "Votre email ou votre mot de passe est incorrect"
      }
  })
  .catch((error) => {
      // Gestion des erreurs de connexion
      console.error('Erreur lors de la connexion :', error)
  })
}
  