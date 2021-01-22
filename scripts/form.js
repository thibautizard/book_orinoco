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
        addItem(id, name, lens, price, false)

        const subtotal = document.querySelector(`.subtotal-price[product="${id}_${lens}"]`)
        subtotal.textContent = formatPrice(input.value * Math.abs(price)/100)

    }
}

function controlInputs(inputs) {
    return inputs.every(input => /^[a-zA-Z@,.'\s-]+$/.test(input.value))
}

function emptyFields() {
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input => input.value = "")
}