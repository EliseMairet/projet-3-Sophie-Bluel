
// varaible login
const email = document.querySelector("form #email")
const password = document.querySelector("form #password")
const form = document.querySelector("form")
const messageErreur = document.querySelector(".login p")


const logUser = {
  email: "",
  password: ""
}


//Création du Login

// faire la route users/login (methode post)
/*récuperer les informations users/login*/
async function loginUser() {
    await fetch("http://localhost:5678/api/users/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginUser)
    }
      .then((response) => response.json())
      .then((responseData) => {
        data = responseData
        console.log(data)
      })
    } 
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userEmail = email.value
      const userPwd = password.value
      console.log(userEmail, userPwd)
      users.forEach((user) => {
        // verifications
        if (
          user.email == userEmail && //email bon 
          user.password == userPwd && //password bon
          user.admin == true
        ) {
          // si les conditions sont remplies on fait ça
          window.sessionStorage.loged = true //stockage token
          window.location.href = "../index.html" //retour page d'accueil si connection ok
          console.log("je suis conecté")
        } else {
          //message d'erreur
          email.classList.add("inputErrorLogin")
          password.classList.add("inputErrorLogin")
          messageErreur.textContent =
            "Votre email ou votre mot de passe est incorrect"
        }
      })
    })

  console.log()