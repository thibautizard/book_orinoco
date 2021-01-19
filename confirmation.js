let message = document.querySelector(".message")

if(!localStorage.getItem("orderId")) message.innerHTML = `
<h3>
Désolé, vous n'avez passé aucune commande 🤷🏼‍♂️
</h3>
`
const links = document.querySelectorAll("a")
links.forEach(link => link.addEventListener("click", _ => localStorage.clear()))