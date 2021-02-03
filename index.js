let productsContainer = document.querySelector(".cards-container")

// Récupération de tous les appareils photos disponibles sur l'API
fetch(`${apiAddress}/api/cameras`)
        .then(response => {
            return response.json()
        })
        .then(products => {

           let allProducts = ""

           // Pour chaque apparail photo un composant HTML est généré puis injecté dans le DOM
           products.forEach(product => {

                let productElement = `
                <div class="product-container" data-flip="1">
                                
                        <!-- UNE CARTE PIVOTANTE -->
                        <div class="card" onmousemove="flipMouse(event)" onmouseout="restoreFlip(event)">
                
                            <!-- ILLUSTRATION -->
                            <div class="img-container">
                                <a href="./product.html?id=${product._id}"  style="background-image: url(${product.imageUrl});"></a>
                            </div>
                
                            <!-- PIED DE CARTE -->
                            <div class="card-footer">
                                <i class="card-name"> ${product.name} </i>
                                <p class="card-price"> ${formatPrice(product.price/100)} </p>
                            </div>
                
                        </div>
                
                </div>
                `
                allProducts += productElement
           })

           // Une miniature avec une flèche pour afficher les produits suivants est mise à la fin (non fonctionnelle)
           const arrow = `
           <div class="product-container product-container--arrow" href="/">
                        <a href="./index.html" class="arrow-container">
                            <i class="fas fa-arrow-right"></i>
                        </a>
            </div>
            `
           productsContainer.innerHTML += (allProducts + arrow)
        
        })
        .then(_ => {
            // L'ensemble des produits n'est affiché qu'une fois l'ensemble complètement chargé
            setTimeout(_ => {
                display(container)
                display(loader, "none")
            }, 1300)
 
        })
