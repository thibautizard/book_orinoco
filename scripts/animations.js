// ! FONCTIONS POUR LES ANIMATIONS DU SITE

// Récupère la position absolue d'un élément par addition des offset des parents
function cumulativeOffset(element) {
    let top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return { top, left }
};

// Génère l'effet de bascule d'une miniature sur la page d'accueil au passage de la souris
function flipMouse(e) {
  
    target = e.currentTarget;

    const { top, left } = cumulativeOffset(target)
    
    const progressX = e.clientX - left
    const progressY = e.clientY - top
    
    const width = target.parentNode.offsetWidth 
    const height = target.parentNode.offsetHeight 
    
  

    const signY = progressX > width / 2 ? "+" : "-"
    const pressY = signY === "-" ? width/2 - progressX : progressX - width/2

    const signX = progressY > height / 2 ? "-" : "+"
    const pressX = signX === "+" ? height/2 - progressY : progressY - width/2
    
    target.style.transform = `rotateY(${signY}${pressY/25}deg)` 
    // rotateX(${signX}${pressX/25}deg)

}

// Repositionne droit la miniature de la page d'accueil lors que la souris en sort
function restoreFlip(e) {
    e.currentTarget.style.transform = `rotateY(0deg)`
}

// Ajoute une ombre à la barre de navigation si l'utilisateur fait défiler la page
function addShadow(threshold, contrast) {
    const navbar = document.querySelector("nav")
    const scroll = window.scrollY
    const navTitle = document.querySelector(".nav-title");
    
    const logosNavbar = Array.from(document.querySelectorAll(".navbar-brand"));

    if (scroll > 70) {
      navbar.classList.add("shadow");
      logosNavbar.forEach((logo) => (logo.style.display = "none"));
      navTitle.style.fontSize = "3rem";
    }

    if (scroll === 0) {
      navbar.classList.remove("shadow");
      logosNavbar.forEach((logo) => (logo.style.display = ""));
      navTitle.style.fontSize = "7rem";
    }

    navbar.style.opacity = scroll > threshold ? 1-contrast : 1
}
   
// Ouvre une fenêtre d'information avec un message à afficher
function openPopup(text, eventToPrevent) {

    if(eventToPrevent) eventToPrevent.preventDefault()
     
    popUp.firstElementChild.textContent = text
    popUp.style.top = `${window.scrollY + window.innerHeight/2}px`
    popUp.style.visibility = "visible"

    popUp.classList.remove("pop-up-reverse")
    void popUp.offsetWidth
    popUp.classList.add("pop-up")

}

// Ferme la fenêtre d'information
function closePopup() {
    const popUp = document.querySelector(".alert")
    popUp.classList.remove("pop-up")
    void popUp.offsetWidth
    popUp.classList.add("pop-up-reverse")
}

// Inverse la couleur d'un bouton lors d'un clic
function animateButton(button) {
    button.classList.replace("far", "fas")
    setTimeout(() => button.classList.replace("fas", "far"), 100)
}

// Affiche un élément selon la valeur indiquée
function display(element, value='') {
    element.style.display = value
}