
// Variables login
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const form = document.querySelector("#formulaire")
const messageErreur = document.querySelector(".login p")

form.addEventListener("submit", (e) => {
  e.preventDefault() //empêcher la page de se rafraichir à la connection
  const userEmail = email.value
  const userPwd = password.value
  if (userEmail == "" || userPwd == "") {
    alert ("Merci de remplir tout les champs")
  }
  else {
    fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email:userEmail, password:userPwd }),
    })
    .then((response) => response.json())
    .then((responseData) => {
        // Vérification si la connexion a renvoyé un token
        if (responseData.token) {
            // Connexion réussie, on stocke le token et on redirige vers la page d'accueil
            localStorage.setItem("token", responseData.token)
            window.location="index.html" 
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
})
    
