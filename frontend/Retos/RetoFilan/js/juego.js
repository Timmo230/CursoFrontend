var nick;
var tamano;
var dificultad;
var avatar;

var play = false;
var cardsSelected = [];
var functionsActived = [];
var cardsClined = 0;
var time = 0;
var points = 0;

var idTime;

var timeInput;


//Funciones
function getData(){
    nick = localStorage.getItem("nick");
    tamano = parseInt(localStorage.getItem("tamano"));
    dificultad = localStorage.getItem("dificultad");
    avatar = localStorage.getItem("avatar");
}

function checkData(){
    if(nick == null || dificultad == 0  || dificultad==null || tamano == 0 || tamano==null){
        location = "./index.html";
    }
}

function setGame(){
    document.getElementById("avatar").src = avatar;
    document.getElementById("nick").innerHTML = "<p>"+ nick +" <span>@nick</span></p>";
    document.getElementById("dificultad").innerHTML = "Nivel: "+dificultad;
    document.getElementById("score").innerHTML = 0;

    document.getElementById("btn-restart").addEventListener("click", main);
    if(dificultad=="Bajo") time = 120;
    else if(dificultad=="Intermedio") time = 90;
    else time = 60;
    timeInput = document.getElementById("time");
    idTime = setInterval(Time, 1000);
    createCards();
}

function createCards(){
    var gameArea = document.getElementById("gameArea");
    var eliminar = 0;
    let imagenes = [];
    let randomNumber;
    var card;

    gameArea.innerHTML = "";
    gameArea.style.gridTemplateColumns = "repeat("+tamano+", 1fr)";

    if(tamano%2!=0){
        eliminar = 1;
    }

    for(let item = 0; item<(tamano*tamano-eliminar)/2; item++){
        imagenes.push("./../img/cards/"+(item+1)+".WebP");
        imagenes.push("./../img/cards/"+(item+1)+".WebP");
    }

    for(let item = 0; item<tamano*tamano-eliminar; item++){
        randomNumber = getRandomInt(0, imagenes.length-1);

        gameArea.insertAdjacentHTML("beforeend", "<img srco='"+imagenes[randomNumber]+"' class='card' id='"+item+"'>");
        imagenes.splice(randomNumber, 1);

        card=document.getElementById(item);
        card.addEventListener("click", cardSelected);
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeCards(cardsSelected){
    clearInterval(functionsActived[0]);
    functionsActived.shift();
    for(let item of cardsSelected){
        item.style.background = "#111";
        item.style.border = "0px solid #111";
        item.replaceWith(document.createElement("img"));
    }
    cardsClined += 2;
    points+= 20;
    document.getElementById("score").textContent = points;
    if(cardsClined == tamano*tamano || cardsClined == tamano*tamano-1) win();
}

function hiddenCards(cardsSelected){
    clearInterval(functionsActived[0]);
    functionsActived.shift();
    let url;
    let id;
    for(let item of cardsSelected){
        id = item.getAttribute("id");
        url = item.getAttribute("srco");
        item.outerHTML = "<img class='card' id='"+id+"' srco='"+url+"'>";
        document.getElementById(id).addEventListener("click", cardSelected);
    }
    points--;
    document.getElementById("score").textContent = points;
}

function win(){
    var gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "<p>HAS GANADO</p>"
}

function lose(){
    var gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "<p>HAS PERDIDO</p>"

    clearInterval(idTime);
}


function Time(){
    time--;
    timeInput.textContent = time+" segundos";

    if(time <= 0) lose();
}


//Funciones de evento
function cardSelected(event){
    var item=event.target;

    cardsSelected.push(item);

    if(cardsSelected.length == 1){
        item.style.background = "#77DD77"
    }   
    else{
        if(cardsSelected[0]==cardsSelected[1]){
            cardsSelected = [];
            return false;
        }
        for(let item of cardsSelected){
            item.src = item.getAttribute("srco");
        }
        var copy = [...cardsSelected];
        if(cardsSelected[0].getAttribute("srco")==cardsSelected[1].getAttribute("srco")) functionsActived.push(setInterval(()=>removeCards(copy), 1000));
        else functionsActived.push(setInterval(()=>hiddenCards(copy), 1000));
        cardsSelected=[];
    }
}


function main(event){
    clearInterval(idTime);
    points = 0;
    document.getElementById("score").textContent = points;
    getData();
    checkData();
    setGame();
    createCards();
}

document.addEventListener("DOMContentLoaded", main);