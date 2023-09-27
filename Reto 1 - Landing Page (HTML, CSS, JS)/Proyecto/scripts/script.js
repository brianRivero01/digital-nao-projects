const nombre = document.getElementById("name")
const email = document.getElementById("email");
const lastname = document.getElementById("lastname");
const form = document.getElementById("formContact");
const small = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    small.innerHTML = ""

    //Validacion de campo nombre
    if(nombre.value === ''){
        warnings += `Debe ingresar un nombre <br>`
        entrar = true
    }

    //Validacion de campo apellido
    if(lastname.value == ""){
        warnings += `Debe ingresar un apellido <br>`
        entrar = true
    }

    //Validacion de campo email
    if(!regexEmail.test(email.value)){
        warnings += `Email no válido <br>`
        entrar = true
    }

    //Si hubo errores:
    if(entrar){
        small.innerHTML = warnings
    }
    //No hubo errores:
    else{
        small.style.color="#36aa0f";
        small.innerHTML = "Formulario enviado correctamente"
    }

})