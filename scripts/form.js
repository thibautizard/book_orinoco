// !  FONCTIONS PAGE PANIER ET GESTION FORMULAIRE

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

// Contrôle en js les entrées du formulaire
function controlInputs(inputs) {
    return inputs.every(input => {
        if(input.classList.contains("name")) return /^[a-zA-Z,.'\s-]+$/.test(input.value)
        if(input.classList.contains("address")) return /^[a-zA-Z1-9,.'\s-]+$/.test(input.value)
        if(input.classList.contains("mail")) return /^\S+@\S+\.\S+$/.test(input.value)
        
    })
}

// Vide les champs du formulaire après envoi
function emptyFields() {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => input.value = "")
}