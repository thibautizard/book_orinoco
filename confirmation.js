// Renvoie un message par défaut si pas de commande passée
let message = document.querySelector(".message")
if(!localStorage.getItem("orderId")) message.innerHTML = `
<h3>
Désolé, vous n'avez passé aucune commande 🤷🏼‍♂️
</h3>
`

// Vide le panier une fois le message de confirmation affiché
if (localStorage.getItem("orderId")) {
  const links = document.querySelectorAll("a");
  links.forEach((link) =>
    link.addEventListener("click", (_) => localStorage.clear())
  );
}
