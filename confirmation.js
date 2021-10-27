// Renvoie un message par défaut si pas de commande passée
let message = document.querySelector(".message")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

if (orderId) {
  document.querySelector(".order-id").innerHTML = orderId;
  const links = document.querySelectorAll("a");
  links.forEach((link) =>
    link.addEventListener("click", (_) => localStorage.clear())
  );
} else {
  message.innerHTML = `
  <h3>
    Désolé, vous n'avez passé aucune commande 🤷🏼‍♂️
  </h3>
  `;
}
