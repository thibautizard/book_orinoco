const path = window.location.pathname
const pathSegments = path.split("/")
const id = window.location.search.substr(1).split("=")[1]

display(container, "none")

greyCover.addEventListener("click", e => {
    display(greyCover, 'none')
    closePopup()
})

fetch(`${apiAddress}/api/cameras/${id}`)
        .then(response => response.json())
        .then(product => {

            display(container)
            loader.style.display = "none"

            const { name, price, description, imageUrl } = product

           document.querySelectorAll(".name").forEach(el => el.textContent = name)
           document.querySelectorAll(".price").forEach(el => el.textContent = formatPrice(price/100))
           document.querySelectorAll(".description").forEach(el => el.textContent = description)
           document.querySelectorAll("img").forEach(el => el.src = imageUrl)
           
           let lentilles = document.querySelector(".lentilles-container")
           let lentillesHTML = ''
           product.lenses.forEach((lens, i) => {
            lentillesHTML += 
            `<div class="lentille my-1">
                <input type="radio" name="lentille" ${!i && "checked"}/>
                <label for=${lens} onClick="this.previousElementSibling.checked = true"> ${lens} </label>
            </div> \n`
           })

            lentilles.innerHTML = lentillesHTML

           

           addButton.addEventListener("click", () => {
               const lens = document.querySelector("input:checked+label").textContent               
               addItem(id, name, lens, price, true)
               openPopup(`L'appareil ${name} à lentille ${lens} a été ajouté à votre panier !`)
           })

           okButton.addEventListener("click", _ => {
               closePopup()
               display(greyCover, "none")
           })



        })


