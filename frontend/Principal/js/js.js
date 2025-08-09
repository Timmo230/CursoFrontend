//Variables
var nickinput;
var emailInput;
var tamanoInput;
var formEntrada;
var errorSubmit;
var error;
var avatares;
var itemimg;
var avatarCont;


//Funciones
function comprobarForm(event){
    if(nickinput.value.length == 0){
        event.preventDefault();
        nickinput.focus();
        errorSubmit.innerText= "EL CAMPO DE NICK ESTA VACIO";
        return false;
    }
    if(tamanoInput.value == 0){
        event.preventDefault();
        tamanoInput.focus();
        errorSubmit.innerText="EL CAMPO DEL TAMANO ESTA VACIO";
        return false;
    }
    datosUsuario(nickinput, tamanoInput, emailInput, avatarCont);
    historialUsers(nickinput, emailInput, tamanoInput);
    return true;
}

function DOMCargado(event){
    nickinput=document.getElementById("nick");
    emailInput=document.getElementById("correo");
    tamanoInput=document.getElementById("tamano");
    formEntrada=document.getElementById("formEntrada");
    errorSubmit=document.getElementById("error");
    error=sessionStorage.getItem("error");
    avatarCont=document.getElementById("avatarImg");


    if(sessionStorage.getItem("error")!=null){
        errorSubmit.innerText=sessionStorage.getItem("error");
        sessionStorage.removeItem("error");
    }

    formEntrada.addEventListener("submit", comprobarForm);

    //Eventos de drag and drop
    avatares=document.getElementsByClassName("avatarimg");

    for(let item of avatares){
        item.addEventListener("dragstart", moviendoImg);
    }

    avatarCont.addEventListener("dragover", e=>{e.preventDefault()});
    avatarCont.addEventListener("drop", cambiarimg);
}

function moviendoImg(event){
    itemimg = event.target;
}

function cambiarimg(event){
    avatarCont.src=itemimg.src;
}

//Eventos
document.addEventListener("DOMContentLoaded", DOMCargado)