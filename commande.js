let products = Object.entries(getProductsSession().reduce((acc, product) => {
    if(!acc[`${product.id}_${product.lens}`]) acc[`${product.id}_${product.lens}`] = 1
    else acc[`${product.id}_${product.lens}`] ++
    return acc
}, {}))

const container = document.querySelector(".cart-container")
const resume = document.querySelector(".product-resume")
const form = document.querySelector("form")
const coverForm = document.querySelector(".cover-form")

if(+localStorage.getItem("total") > 0) coverForm.style.display = "none"

container.style.display = "none"

Promise.all(products.map(product => {

    const [id, lens] = product[0].split("_")
    const quantity = product[1]

    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(response => response.json())
        .then(product => {

            const { name, price, imageUrl } = product

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
                            <p class="price"><i class="fas fa-times"></i> ${formatPrice(price/100)} </p>
                            <p class="subtotal"> <span class="equal-sign"> = </span> <span class="subtotal-price" product="${id}"> ${formatPrice(price/100  * quantity)} </span></p>
                    </div>

                    <!-- NOM -->
                    <div class="name-lens w-100">
                        <div class="name-product">
                            ${name}
                        </div>

                        <div class="lenses-information">
                            <p> LENTILLE : ${lens} </p>
                        </div>
                    </div>

                </div>`

                // Append product to resume
                resume.innerHTML += productElement
                
        })
    
}))
.then(_ => {
    loader.style.display = "none"
    container.style.display = ""
})


form.addEventListener("submit", e => {

    e.preventDefault()

    const inputs = Array.from(e.currentTarget.querySelectorAll("input"))

    const contact = inputs.reduce((contact, input) => {
        contact[input.id] = input.value
        return contact
    }, {})

    const products = getProductsSession("id")

        console.log(products)
        fetch(`http://localhost:3000/api/cameras/order`, { 
            method: 'POST',
            headers: {
                'Accept' : 'application/json, text/plain',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({contact,products})
        })
        .then(response => {
            if(response.ok) return response.json()
            else {
                displayAlert("La validation de la commande a échoué 😭")
                throw new Error("La validation de la commande a échoué 😭")
            }
        })
        .then(jsonResponse => {
            localStorage.setItem("products", "")
            localStorage.setItem("orderId", jsonResponse.orderId)
            emptyFields()

            window.location.href = window.location.href.replace("commande", "confirmation");
        })

})

coverForm.addEventListener("click", e => displayAlert("Votre panier est vide ! 😔"))







