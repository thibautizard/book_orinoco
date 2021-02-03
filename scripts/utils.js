// ! ENSEMBLE DE FONCTIONS UTILES

// Récupère tous les produits dans le panier
function getProductsSession(parameter) {
    let products = JSON.parse(localStorage.getItem("products"))
    if(parameter) products = products.map(product => product[parameter])
    return products
}

// Formate le prix en euros
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}


// Actualise le compteur de produits dans le panier
function actualizeCounter() {
    const products = getProductsSession()
    const counter = document.querySelector(".counter")
    counter.textContent = products.length
}

// Actualise tous les afficheurs de prix
function actualizeTotal(price) {
    const total = parseInt(localStorage.getItem("total")) + price/100
    const totalContainer = document.querySelector(".total-container .total")
    if(totalContainer) totalContainer.textContent = formatPrice(total)
    localStorage.setItem("total", total)
}

// Ajoute un produit dans le localStorage à partir de son id, lentille et prix
function addItem(id, lens, price) {
    const products = getProductsSession()  

    if(price >= 0) products.push({id, lens})
    if(price < 0) products.splice(products.findIndex(product => product.id === id && product.lens === lens), 1)

    localStorage.setItem("products", JSON.stringify(products))

    actualizeCounter()
    actualizeTotal(price)
}

// Renvoie la hauteur maximale de la page
function computeMaxHeight() {
    return document.documentElement.scrollHeight
}