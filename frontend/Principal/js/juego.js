const juego = document.getElementById("juego");
var inicioMarcado=false;
var gameSize;
var actualID;
var pointsInput;
var timeInput;
var points = 0;
var soltado=true;
var play=false;
var ActualTime=0;
var idFunction;
var nuevaPartida;


getUsersData();
if(!checkUserData()){
    setError();
    location="index.html";
}

//Funciones
function rellenarFormularioUsuario(){
    document.getElementById("nick").value=nick;
    document.getElementById("avatarImg").src=avatar;
}

function getRandomInt(min, max) {
  return (Math.floor(Math.random() * max)) + min;
}

function printGameStyle(){
    juego.style.gridTemplateColumns="repeat("+ tamano +", 1fr)";
    juego.style.gridTemplateRows="repeat("+ tamano +", 1fr)";

    juego.innerHTML="";
    let randNumber = 0;
    let colors = ["rojo", "verde"];
    for(let i = 0; i < gameSize * gameSize; i++){
        
        if(i%2!=0) randNumber = getRandomInt(0,2);
        juego.insertAdjacentHTML("beforeend", '<div class="containerItem" id="'+ (i+1)+'" draggable="false">\
                    <div class="item '+colors[randNumber]+'" draggable="false">\
                    </div>\
                </div>');
    }
}

function gameEvents(){
    var items =document.getElementsByClassName("item");
    for(let item of items){
        item.addEventListener("mousedown", beginToMark);
        item.addEventListener("mouseover", continueToMark);
    }
}


function beginToMark(event){
    actualID = event.target.parentElement
    let item = event.target;
    
    if(item.classList.contains("rojo")) actualID.classList.add("rojo");
    else actualID.classList.add("verde");
    inicioMarcado=true;
    points++;
    pointsInput.value = points;
    if(!play){
        ActualTime=10;
        play=true;
        idFunction=setInterval(time, 1000);
    } 
}

function continueToMark(event){
    if(inicioMarcado && play){
        let containerItem = event.target.parentElement
        let item = event.target;
        
        let isAdjacent = findAdjacents(actualID, containerItem);
        let IsSameColor = isSameColor(actualID.getElementsByClassName("item")[0], containerItem.getElementsByClassName("item")[0]);
        if(isAdjacent && IsSameColor){
            if(item.classList.contains("rojo")) containerItem.classList.add("rojo");
            else containerItem.classList.add("verde");
            actualID = containerItem;
            points++;
            pointsInput.value=points;
        }
    }
}

function soltar(event){
    if(soltado){
        renise();
        inicioMarcado=false;
    }
    soltado=true;
}

function findAdjacents(actualObject, nextObject){
    var thisactualID = parseInt(actualObject.getAttribute("id"));
    var nextID = parseInt(nextObject.getAttribute("id"));
    if(thisactualID!=nextID){
        if(nextObject.classList.contains("rojo") || nextObject.classList.contains("verde")){
            renise();
            soltado=false;
            return false;
        }
        if(thisactualID + gameSize == nextID || thisactualID - gameSize == nextID ||
            thisactualID - 1 == nextID || thisactualID + 1==nextID){
                return true;
        }
        renise();
        soltado=false;
        return false;
    }
}

function isSameColor(actual, next){
    let actualClass = actual.classList;
    let nextClass = next.classList;
    if(actualClass.value == nextClass.value){
        return true;
    }
    renise();
    soltado=false;
    return false;
}

function time(){
    ActualTime--;
    timeInput.value=ActualTime;
    if(ActualTime<=0){
        play = false;
        clearInterval(idFunction);
        points=0;
        document.getElementById("juegoAcabado").style.zIndex="2";
        document.getElementById("juegoAcabado").classList.add("juegoAcabadoColor");
        
        document.getElementById("juego").style.zIndex="1";
        removeEvents();
    }
}

function newGame(){
    document.getElementById("juegoAcabado").style.zIndex="1";
    document.getElementById("juego").style.zIndex="2";
    printGameStyle();
    gameEvents();
    pointsInput.value=0;
    timeInput.value=0;
}

function renise(){
    inicioMarcado=false;
    actualID=null;
    printGameStyle();
    gameEvents();
}

function removeEvents(){
    document.removeEventListener("mouseup", soltar);
    juego.innerHTML="";
}

function start(event){
    gameSize = parseInt(tamano);
    rellenarFormularioUsuario();
    printGameStyle();
    gameEvents();
    pointsInput = document.getElementById("puntuacion");
    timeInput=document.getElementById("tmpo");
    nuevaPartida=document.getElementById("nuevaPartida");
    pointsInput.value=0;
    timeInput.value=0;
    document.addEventListener("mouseup", soltar);
    nuevaPartida.addEventListener("click", newGame);
}

 document.addEventListener("DOMContentLoaded", start);