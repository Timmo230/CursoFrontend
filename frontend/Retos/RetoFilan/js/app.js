var dragablesContainer;
var form;
var actualImg;

var nick;
var dificultad;
var tamano;
var avatar;

//Funciones
function addEvents(){
    form = document.getElementById("formulario");
    form.addEventListener("submit", saveData);

    dragablesContainer.addEventListener("dragover", e=>{e.preventDefault()});
    dragablesContainer.addEventListener("drop", drop);

    let imgs = document.getElementById("dragables").getElementsByTagName("img");
    for(let item of imgs){
        item.addEventListener("dragstart", dragstart);
        item.setAttribute("dragable", "true");
    }
}

function isnewplayer(){
    nick=localStorage.getItem("nick");
    dificultad=localStorage.getItem("dificultad");
    tamano=localStorage.getItem("tamano");
    avatar=localStorage.getItem("avatar");
    
    if(!(nick == null && (dificultad == 0 || dificultad==null) && (tamano == 0 || tamano ==null))){
        document.getElementById("nick").value = nick;
        document.getElementById("dificultad").value = dificultad;
        document.getElementById("tamano").value = tamano;
        document.getElementById("dragablesContainer").src = avatar;
    }
}

//funciones de evento

function saveData(event){
    event.preventDefault();
    nick = document.getElementById("nick").value;
    dificultad = document.getElementById("dificultad").value;
    tamano = document.getElementById("tamano").value;
    avatar = document.getElementById("dragablesContainer").src;

    if(!(nick.length == 0 || dificultad == 0 || tamano == 0)){
        localStorage.setItem("nick", nick);
        localStorage.setItem("dificultad", dificultad);
        localStorage.setItem("tamano", tamano);
        localStorage.setItem("avatar", avatar);
        form.submit();
        return true;
    }
    return false;
}

function drop(event){
    event.target.src=actualImg;
}

function dragstart(event){
    actualImg=event.target.src;
}

function main(event){
    dragablesContainer = document.getElementById("dragablesContainer");
    addEvents();
    isnewplayer();
}

document.addEventListener("DOMContentLoaded", main);