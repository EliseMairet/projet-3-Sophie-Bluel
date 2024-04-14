
// varaible login
const loginUrl = "http://localhost:5678/api/users/login"
const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const submitBtn = document.querySelector("input[type='submit']")
const form = document.querySelector(".login")
const loginError = document.querySelector(".errorLogin")
const passwordError = document.querySelector(".errorPassword")

const logUser = {
  email: "",
  password: ""
}


//LOGIQUE contrôle du Log IN

// Evenement à la connection
form.addEventListener("submit", (e) => {
  e.preventDefault() //interrompt le comportement par default d'un evenement
  e.stopPropagation()//arrete la propagation d'un evenement par rapport aux éléments parents dans le DOM
  loginUser()
})

// Evenement au MAIL
inputEmail.addEventListener("input", (e) => {
  inputEmail.reportValidity() //valide un champs de formulaire html par js
  logUser.email = e.target.value //ne pas raffrachir la page
})

// Evenement au Password
inputPassword.addEventListener("input", (e) => {
  inputPassword.reportValidity()
  logUser.password = e.target.value
})

//Evenement au chargement du DOM
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault()
  logUser.email = inputEmail.value
  logUser.password = inputPassword.value
  console.log(logUser)
})

// faire la route users/login (methode post)
/*récuperer les informations users/login*/
async function loginUser() {
  try {
    await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(logUser)
    })
      .then((response) => response.json())
      .then((responseData) => {
        data = responseData
        console.log(data)
      })
      /*en cas d'erreur login*/
    if (data.message) {
      loginError.textContent = "Erreur dans l’identifiant !!"
      inputEmail.style.color = "red"
      console.log(logUser)
      /*en cas d'erreur mot de passe*/
    } else if (data.error) {
      passwordError.textContent = "Erreur dans le mot de passe !!"
      loginError.textContent = ""
      inputEmail.style.color = "#1d6154"
      console.log(logUser)
    } else {
      inputPassword.style.color = "#1d6154"
      passwordError.textContent = ""
      loginError.textContent = ""
      console.log("LogAdmin correct")
      console.log(logUser)
      // stockage du token dans le stockage local
      localStorage.setItem("token", data.token)
      //Redirection index.html
      window.location.href = ".assets/login.html"
    }
  } catch (error) {
    console.log(error)
  }
}