// Récupère les produits du panier et associé les quantités correspondantes à chaque couple appareil x lentille
let products = Object.entries(
  getProductsSession().reduce((acc, product) => {
    acc[`${product.id}_${product.lens}`] ? acc[`${product.id}_${product.lens}`]++ : acc[`${product.id}_${product.lens}`] = 1;
    return acc
  }, {})
);

// Si panier vide on met l'écran gris, si panier plein on affiche le loader en attendant que tout charge
localStorage.getItem("total") === "0" ? display(greyCover, "block") && display(loader, "none") : display(loader, "");

const resume = document.querySelector(".product-resume");
const form = document.querySelector("form");

// On crée une promise pour chaque produit du panier dont on charge les informations via l'API
Promise.all(products.map((product) => {

  const [id, lens] = product[0].split("_");
  const quantity = product[1];

  return fetch(`${apiAddress}/api/cameras/${id}`)
          .then((response) => response.json())
          .then((product) => {
              const { name, price, imageUrl } = product;

              productElement = `
                      <div class="miniature-container">

                          <!-- IMAGE -->
                          <div class="image-container">

                              <a class="image" href="">
                                  <img src=${imageUrl} alt="illustration appareil"/>
                              </a>  
                          
                              
                              <!-- OPTIONS -->
                              <div class="options-container" name="${name}" product="${id}" lens="${lens}" price="${price}" >
                                  <i class="far plus fa-plus-square" onclick="useButton(this)"></i>
                                  <input type="text" class="product-counter text-center" size="2" readonly="readonly" value=${quantity} onFocus=""/>
                                  <i class="far minus fa-minus-square" onclick="useButton(this)"></i>
                              </div>

                          </div>


                          <!-- CALCULS -->
                          <div class="total">
                                  <p class="price"><i class="fas fa-times"></i> ${formatPrice(price / 100)} </p>
                                  <p class="subtotal"> <span class="equal-sign"> = </span> <span class="subtotal-price" product="${id}_${lens}"> ${formatPrice((price / 100) * quantity)} </span></p>
                          </div>

                          <!-- NOM -->
                          <div class="name-lens w-100">
                              <div class="name-product"> ${name} </div>

                              <div class="lenses-information">
                                  <p> LENTILLE : ${lens} </p>
                              </div>
                          </div>

                      </div>`;

              return productElement;
          });
}))
.then((allProducts) => {
    // Une fois tous les produits chargés, on crée un gros bloc HTML qu'on injecte dans le DOM
    resume.innerHTML = allProducts.join("");
    display(loader, "none");
    setTimeout((_) => {
      display(container);
    }, 1000);

  })
  .catch(() => {
    throw Error("Les produits du panier n'ont pas pu être récupérés !");
  });


// Gestion du formulaire de commande

form.addEventListener("submit", (e) => {

  // On empêche la redirection automatique
  e.preventDefault();

  if (!controlInputs()) {
    openPopup("Les données entrées ne sont pas valides. Veuillez réessayer");
    return;
  }

  if (localStorage.getItem("total") === "0") {
    openPopup("Votre panier est vide ! 😔");
    return;
  }

  const inputs = Array.from(document.querySelectorAll("form input"));

  // On crée un object contact avec toutes les informations récoltées et contrôlées par le formulaire
  const contact = inputs.reduce((contact, input) => {
    contact[input.id] = input.value;
    return contact;
  }, {});

  // On garde uniquement les id des produits achetés
  const products = getProductsSession("id")

  // On envoie la requête pour faire valider la commande
  fetch(`${apiAddress}/api/cameras/order`, { 
      method: 'POST',
      headers: {
          'Accept' : 'application/json, text/plain',
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({contact,products})
  })
  .then(response => response.ok ? response.json() : new Error("La validation de la commande a échoué 😭"))
  .then(jsonResponse => {
    // On vide les inputs
    emptyFields();
    // On redirige sur la fenêtre de confirmation de commande
    window.location.assign(`confirmation.html?orderId=${jsonResponse.orderId}`);
  })

  
});

// Message d'avertissement si on clique sur la couverture grise si panier = 0
greyCover.addEventListener("click", (e) =>
  openPopup("Votre panier est vide ! 😔")
);
