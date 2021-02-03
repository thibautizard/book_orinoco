// ! Définit l'adesse de l'API, place les animations de base de la page et récupère les éléments du DOM à manipuler

// ? let apiAddress = "https://projet5-oc-api.herokuapp.com";
let apiAddress = "http://localhost:3000";

window.addEventListener("scroll", _ => addShadow(0, .1))
if(!localStorage.getItem("products")) localStorage.setItem("products", "[]")
if(!localStorage.getItem("total")) localStorage.setItem("total", 0)

// Actualise le compteur de produits dans le panier
actualizeCounter()

const container = document.querySelector(`div[class$="container"]`)
const loader = document.querySelector(".container-loader")
const addButton = document.querySelector(".ajouter")
const popUp = document.querySelector(".alert")
const okButton = document.querySelector(".alert__button")
okButton && okButton.addEventListener("click", (_) => closePopup() && display(greyCover, "none"));
const greyCover = document.querySelector(".grey-cover")
const total = document.querySelector(".total")
total && (total.textContent = formatPrice(localStorage.getItem("total")))
const orderId = localStorage.getItem("orderId")
orderId && (document.querySelector(".order-id").textContent = orderId)


display(container, "none")