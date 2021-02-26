// !  FONCTIONS POUR LA PAGE PANIER ET LA GESTION DU FORMULAIRE

// Ajoute ou supprime un produit en utilisant les options de la page panier
function useButton(button) {

    const sign = button.classList.contains("plus")
    const input = sign ? button.nextElementSibling : button.previousElementSibling

    if(sign && +input.value > - 1 || !sign && +input.value > 0) {

        animateButton(button)

        const id = button.parentNode.getAttribute("product")
        const name = button.parentNode.getAttribute("name")
        const lens = button.parentNode.getAttribute("lens")
        const price = sign ? +button.parentNode.getAttribute("price") :  -button.parentNode.getAttribute("price")
        sign ? input.value++ : input.value--
        addItem(id, lens, price)

        const subtotal = document.querySelector(`.subtotal-price[product="${id}_${lens}"]`)
        subtotal.textContent = formatPrice(input.value * Math.abs(price)/100)

    }
}

// Contrôle en js les entrées du formulaire et renvoie true si tout est ok
function controlInputs() {
  const inputs = Array.from(document.querySelectorAll("form input"));
  console.log(inputs)
  return inputs.every((input) => {
    if (input.classList.contains("name"))
      return /^[a-zA-Z,.'\s-]+$/.test(input.value);
    if (input.classList.contains("address"))
      return /^\d+\s[A-z]+\s[A-z]+/.test(input.value);
    if (input.classList.contains("mail"))
      return /^\S+@\S+\.\S+$/.test(input.value);
  });
}

function changeSubmitButton() {
  const inputsValid = controlInputs();
  const submitButton = document.querySelector("button[type='submit']")

  if (inputsValid) {
    submitButton.style.opacity = 1;
    submitButton.style.backgroundColor = "#8761f5 !important";
  } else {
    submitButton.style.opacity = 0.5;
    submitButton.style.backgroundColor = "lightgrey !important";
  }
}

// Vide les champs du formulaire après envoi d'un formulaire correct
function emptyFields() {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => input.value = "")
}