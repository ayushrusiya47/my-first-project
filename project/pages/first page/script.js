
const body= document.querySelector("body");

const signInSignUpButton = document.querySelector(".sign-in-sign-up");

window.addEventListener("load",()=>{
    // body.classList.add("visible");
     body.style.opacity=100;
});

signInSignUpButton.addEventListener("click",()=>{
    location.href="../sign-in-up/index.html";
})

