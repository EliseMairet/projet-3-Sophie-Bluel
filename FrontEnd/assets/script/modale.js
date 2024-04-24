//affichage de la modale à la connaction
//variable
const containerModale = document.querySelector(".containerModale")
const fa-xmark = document.querySelector(".containerModals .fa-xmark")

//au click admin apparition modale
admin.addEventListener("click", ()=>{
    console.log(admin)
    containerModale.Style.display ="flex"
})

//au click de la croix fermeture modale
xmark.addEventListener("click", ()=>{
    console.log(xmark)
    containerModale.Style.display ="none"
})


//enlever modale au click à côté
containerModale.addEventListener("click", (e)=>{
    console.log(e.target)
    if (e.target.className == "containerModale") {
        containerModale.style.display = "none"
    }
})