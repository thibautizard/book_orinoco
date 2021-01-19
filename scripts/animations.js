function cumulativeOffset(element) {
    let top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return { top, left }
};

function flipMouse(e) {
  
    target = e.currentTarget;

    const { top, left } = cumulativeOffset(target)
    
    const progressX = e.clientX - left
    const progressY = e.clientY - top
    
    const width = target.parentNode.offsetWidth 
    const height = target.parentNode.offsetHeight 
    
  

    const signY = progressX > width / 2 ? "+" : "-"
    const pressY = signY === "-" ? width/2 - progressX : progressX - width/2

    const signX = progressY > height / 2 ? "-" : "+"
    const pressX = signX === "+" ? height/2 - progressY : progressY - width/2
    
    target.style.transform = `rotateY(${signY}${pressY/25}deg)` 
    // rotateX(${signX}${pressX/25}deg)

}

function restoreFlip(e) {
    e.currentTarget.style.transform = `rotateY(0deg)`
}

function addShadow(threshold, contrast) {
    console.log(threshold, contrast)
    const navbar = document.querySelector("nav")
    const scroll = window.scrollY

    scroll > 0 ? navbar.classList.add("shadow") : navbar.classList.remove("shadow")
    navbar.style.opacity = scroll > threshold ? 1-contrast : 1
}

function displayAlert(text, eventToPrevent) {

    if(eventToPrevent) eventToPrevent.preventDefault()
    

    const grey = document.querySelector(".grey-cover")
    if(grey) {
        grey.style.opacity = ".5"
        grey.style.visibility = "visible"
        grey.style.height = `100vh`
    }

    

    const popUp = document.querySelector(".alert")
     
    popUp.firstElementChild.textContent = text
    popUp.style.visibility = "visible"
    popUp.classList.remove("pop-up-reverse")
    void popUp.offsetWidth
    popUp.classList.add("pop-up")

}

function closeAlert() {


    if(greyCover) {
        greyCover.style.visibility = "hidden"
        greyCover.style.opacity = "0"
    }

    const popUp = document.querySelector(".alert")
    popUp.classList.remove("pop-up")
    void popUp.offsetWidth
    popUp.classList.add("pop-up-reverse")
}

function animateButton(button) {
    button.classList.replace("far", "fas")
    setTimeout(() => button.classList.replace("fas", "far"), 100)
}