
function getProductsSession(parameter) {
    let products = JSON.parse(localStorage.getItem("products"))
    if(parameter) products = products.map(product => product[parameter])
    return products
}

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}

function actualizeCounter() {
    const products = getProductsSession()
    const counter = document.querySelector(".counter")
    counter.textContent = products.length
}

function actualizeTotal(price) {
    const total = parseInt(localStorage.getItem("total")) + price/100
    const totalContainer = document.querySelector(".total-container .total")
    if(totalContainer) totalContainer.textContent = formatPrice(total)
    localStorage.setItem("total", total)
}


function addItem(id, name, lens, price, display) {
    const products = getProductsSession()  

    if(price >= 0) products.push({id, lens})
    if(price < 0) products.splice(products.findIndex(product => product.id === id && product.lens === lens), 1)

    localStorage.setItem("products", JSON.stringify(products))

    actualizeCounter()
    actualizeTotal(price)

}

function computeMaxHeight() {
    return document.documentElement.scrollHeight
}