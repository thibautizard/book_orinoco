// ! Définit l'adesse de l'API, place les animations de base de la page et récupère les éléments du DOM à manipuler

// ? "https://projet5-oc-api.herokuapp.com";
let apiAddress = "https://projet5-oc-api.herokuapp.com";

window.addEventListener("scroll", (_) => addShadow(0, 0.1));

// Initialise à 0 les variables products et total si celles-ci n'existent pas
if (!localStorage.getItem("products")) localStorage.setItem("products", "[]");
if (!localStorage.getItem("total")) localStorage.setItem("total", 0);

// Actualise toujours le compteur visuel de produits à partir du localStorage
actualizeCounter();

// Identifie les principaux éléments et ajoute les animations principales
const container = document.querySelector(`div[class$="container"]`);
const loader = document.querySelector(".container-loader");
const addButton = document.querySelector(".ajouter");
const popUp = document.querySelector(".alert");
const okButton = document.querySelector(".alert__button");
okButton &&
  okButton.addEventListener(
    "click",
    (_) => closePopup() && display(greyCover, "none")
  );
const greyCover = document.querySelector(".grey-cover");
const total = document.querySelector(".total");
total && (total.textContent = formatPrice(localStorage.getItem("total")));

display(container, "none")