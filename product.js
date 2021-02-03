// Récupère l'id du produit à partir du paramètre de l'url
const id = window.location.search.substr(1).split("=")[1];

display(container, "none");

// Met à jour la structure HTML de présentation du produit en paramètre de l'URL avec les informations récupérées depuis l'API
fetch(`${apiAddress}/api/cameras/${id}`)
  .then((response) => response.json())
  .then((product) => {
    display(container);
    loader.style.display = "none";

    const { name, price, description, imageUrl } = product;

    // Injecte les informations dans les différents champs
    document.querySelectorAll(".name").forEach((el) => (el.textContent = name));
    document
      .querySelectorAll(".price")
      .forEach((el) => (el.textContent = formatPrice(price / 100)));
    document
      .querySelectorAll(".description")
      .forEach((el) => (el.textContent = description));
    document.querySelectorAll("img").forEach((el) => (el.src = imageUrl));

    // Crée un composant pour le choix des lentilles puis l'injecte dans le produit HTML
    let lentilles = document.querySelector(".lentilles-container");
    let lentillesHTML = "";
    product.lenses.forEach((lens, i) => {
      lentillesHTML += `<div class="lentille my-1">
                          <input type="radio" name="lentille" ${!i && "checked"}/>
                          <label for=${lens} onClick="this.previousElementSibling.checked = true"> ${lens} </label>
                        </div> \n`;
    });

    lentilles.innerHTML = lentillesHTML;

    // Déclenche une fenêtre d'information au moment de l'ajout du produit dans le panier
    addButton.addEventListener("click", () => {
      const lens = document.querySelector("input:checked+label").textContent;
      addItem(id, lens, price);
      openPopup(
        `L'appareil ${name} à lentille ${lens} a été ajouté à votre panier !`
      );
      display(greyCover, "block");
    });

 
  });


// Fait disparaître la fenêtre d'information et l'écran gris si on clique sur ce dernier
greyCover.addEventListener("click", (e) => {
  display(greyCover, "none");
  closePopup();
});