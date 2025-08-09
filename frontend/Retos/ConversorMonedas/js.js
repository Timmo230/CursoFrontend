const monedaOrigen=document.getElementById("monedaOrigen");
const monedaConversion=document.getElementById("monedaConversion");
const inputOrigen=document.getElementById("inputOrigen");
const inputConversion=document.getElementById("inputConversion");
const boton=document.getElementById("boton");
const error=document.getElementById("error");

let numeroOrigen;
let moneda1;
let moneda2;
let resultado;

function comprobar(event){
    if(inputOrigen.value ==""){
        inputOrigen.focus();
        event.preventDefault();
        error.innerText = "No hay ningun valor a convertir"
        return false;
    }
    error.innerText = "";
    numeroOrigen = Number(inputOrigen.value);
    moneda1 = Number(monedaOrigen.value);
    moneda2 = Number(monedaConversion.value);
    conversion(numeroOrigen, moneda1, moneda2);
    event.preventDefault();
    return true;
}

function conversion(monOrigen, mon1, mon2){
    let euro = 1;
    let libra = 0.86;
    let dolar = 1.17;
    let result;
    if(mon1 == 2){
        euro = 1.16;
        libra = 1;
        dolar = 1.36;
    }else if(mon2){
        euro = 0.86;
        libra = 0.74;
        dolar = 1;
    }
    if(mon2 == 1) result = monOrigen * euro;
    if(mon2 == 2) result = monOrigen * libra;
    if(mon2 == 3) result = monOrigen * dolar;
    inputConversion.value = result.toFixed(2);
}

boton.addEventListener("click", comprobar);