window.addEventListener("scroll", _ => addShadow(0, .1))
if(!localStorage.getItem("products")) localStorage.setItem("products", "[]")
if(!localStorage.getItem("total")) localStorage.setItem("total", 0)

actualizeCounter()

const loader = document.querySelector(".container-loader")
const main = document.querySelector("main")

const alertButton = document.querySelector(".alert__button")
alertButton && alertButton.addEventListener("click", closeAlert)

const greyCover = document.querySelector(".grey-cover")
greyCover && greyCover.addEventListener("click", closeAlert)

const total = document.querySelector(".total")
total && (total.textContent = formatPrice(localStorage.getItem("total")))

const orderId = localStorage.getItem("orderId")
orderId && (document.querySelector(".order-id").textContent = orderId)
