//Preparado especificamente para la mitad de la pantalla

var componentes;
var componentesContainer;
var cestaContainer;
var precioTotal;
var pagar;
var itemTag;
var buttonTag;
var cestaVacia = '<div id="vacio"> <img src="./../img/Cesta.png" alt="" width="100px"> <h2>Arrastra tus productos aqui</h2> <h3>Para agregarlos a la cesta</h3> </div>';
var productoCesta=[];
var productsAlloweb=[];

let precio = 0;

//Funciones
function setProduct(){
    let counterIds = 0;
    for(let item of componentes){
        item.addEventListener("dragstart", empiezaArrastrar)
        item.setAttribute("idHTML", counterIds);
        item.setAttribute("amount", 0);

        productsAlloweb.push({
            "type": item.querySelector("h2").textContent,
            "name": item.querySelector("h3").textContent,
            "price": item.querySelector(".price").textContent,
            "id": item.getAttribute("idHTML")
        });
        counterIds++;
    }
}

//Crea el div en la cesta
function createShoppingBascket(item){
    if(cestaContainer.querySelector("#vacio")!=null){
        cestaContainer.innerHTML="";
    }
    let producto;
    itemTag.setAttribute("amount", Number(itemTag.getAttribute("amount"))+1);
    producto = '<div class="productoencesta" idHTML='+ item.id +'>\
            <div class="titulo">\
                <h2>' + item.name + '</h2>\
                <p>' + item.price +'</p>\
            </div>\
            <div class="botones">\
                <button class="menos" idHTML='+ item.id +'>-</button>\
                <h2 class="amount">1</h2>\
                <button class="mas" idHTML='+ item.id +'>+</button>\
                <button class="quitar" idHTML='+ item.id +'>x</button>\
            </div>\
        </div>';
    cestaContainer.insertAdjacentHTML("beforeend", producto);
    precio = precio + Number(item.price);
    precioTotal.textContent = precio + " €";

    var nuevoElemento = cestaContainer.querySelector("[idHTML='" + item.id + "']");
    buttonsEvents(nuevoElemento);

}

//Incrementa las cantidades
function increaseShoppingBascket(item){
    let number = Number(
  cestaContainer
    .querySelector('div[idHTML="' + item.id + '"]')
    .querySelector('.amount')
    .textContent
    );
    componentesContainer.querySelector("div[idHTML='"+ item.id +"']").setAttribute("amount", number+1);
    cestaContainer.querySelector('div[idHTML="' + item.id + '"]').querySelector('.amount')
    .textContent = number + 1;
    precio = precio + Number(item.price);
    precioTotal.textContent = precio+" €";
}

//Establece los eventos de los botones de la cesta
function buttonsEvents(contenedor){
    var restas = contenedor.getElementsByClassName("menos")[0];
    var sumas = contenedor.getElementsByClassName("mas")[0];
    var eliminaciones = contenedor.getElementsByClassName("quitar")[0];

    restas.addEventListener("click", restar);
    sumas.addEventListener("click", sumar);
    eliminaciones.addEventListener("click", quitar);
}

//Funciones de eventos

//Aqui inicia
function start(event){
    componentesContainer=document.getElementById("productos");
    cestaContainer=document.getElementById("listaProductos");
    precioTotal=document.getElementById("precioTotal");
    pagar=document.getElementById("boton");
    componentes=document.getElementsByClassName("producto");
    cestaContainer.innerHTML=cestaVacia;

    setProduct();

    cestaContainer.addEventListener("dragover", e=>{e.preventDefault()})
    cestaContainer.addEventListener("drop", dropear);
}

function empiezaArrastrar(event){
    itemTag=event.target;
}

//Lo que pasa cuando un objeto cae en la cesta
function dropear(event){
    for(let item of productsAlloweb){
        if(item.id == Number(itemTag.getAttribute("idHTML")) && Number(itemTag.getAttribute("amount")) <= 0){
            //Crea el div
            createShoppingBascket(item);
            break;
        }
        else if(item.id == Number(itemTag.getAttribute("idHTML"))){
            //Incrementa las cantidades
            increaseShoppingBascket(item);
            break;
        }
    }
}

//Resta uno la cantidad del producto al que le da al boton de menos
function restar(event){
    //Declaracion variables
    buttonTag=event.target;
    var ObjetosCesta = document.getElementById("listaProductos").getElementsByClassName("productoencesta");
    var idButton = buttonTag.getAttribute("idHTML");
    var product;
    //Busca el objeto de la cesta que se esta restando
    for(let item of ObjetosCesta){
        var idComponente = item.getAttribute("idHTML");
        if(idButton == idComponente){
            //Relacion con los productos de la izquierda
            product = document.querySelector("#productos").querySelector("[idHTML='"+idButton+"']");
            let amountToSet = Number(product.getAttribute("amount")) - 1;
            product.setAttribute("amount", amountToSet);
            //Elimina el div en caso que no haya productos y pone el icono de la cesta y el texto en caso que no haya otros            
            if(Number(product.getAttribute("amount")) <= 0){
                item.remove();
                product.setAttribute("amount",0);
                if(cestaContainer.getElementsByClassName("productoencesta").length == 0){
                    cestaContainer.innerHTML=cestaVacia;
                }
            }
            //Cambia las cantidades
            else{
                cestaContainer.querySelector('div[idHTML="' + item.getAttribute("idHTML")+ '"]').querySelector('.amount')
                .textContent = Number(product.getAttribute("amount"));
            }
            //Cambia el precio total
            precio = precio - Number(product.querySelector(".price").textContent);
            precioTotal.textContent = precio+"€";
            break;
        }
    }
}

//Suma uno la cantidad del producto al que le da al boton de mas
function sumar(event){
    //Declaracion variables
    buttonTag=event.target;
    var ObjetosCesta = document.getElementById("listaProductos").getElementsByClassName("productoencesta");
    var idButton = buttonTag.getAttribute("idHTML");
    var product;
    //Busca el objeto de la cesta que se esta restando
    for(let item of ObjetosCesta){
        var idComponente = item.getAttribute("idHTML");
        if(idButton == idComponente){
            //Relacion con los productos de la izquierda
            product = document.querySelector("#productos").querySelector("[idHTML='"+idButton+"']");
            let amountToSet = Number(product.getAttribute("amount")) + 1;
            product.setAttribute("amount", amountToSet);
            
            cestaContainer.querySelector('div[idHTML="' + item.getAttribute("idHTML")+ '"]').querySelector('.amount')
            .textContent = Number(product.getAttribute("amount"));
        
            //Cambia el precio total
            precio = precio + Number(product.querySelector(".price").textContent);
            precioTotal.textContent = precio+"€";
            break;
        }
    }
}

//Elimina el producto al que le da al boton de eliminar
function quitar(event){
    //Declaracion variables
    buttonTag=event.target;
    var ObjetosCesta = document.getElementById("listaProductos").getElementsByClassName("productoencesta");
    var idButton = buttonTag.getAttribute("idHTML");
    var product;

    let cantidadActual;
    let costo;


    //Busca el objeto de la cesta que se esta restando
    for(let item of ObjetosCesta){
        var idComponente = item.getAttribute("idHTML");
        if(idButton == idComponente){
            //Relacion con los productos de la izquierda
            product = document.querySelector("#productos").querySelector("[idHTML='"+idButton+"']");
            costo = Number(product.querySelector(".price").textContent);
            cantidadActual = Number(product.getAttribute("amount"));
            let amountToSet = 0;
            product.setAttribute("amount", amountToSet);
            
            cestaContainer.querySelector('div[idHTML="' + item.getAttribute("idHTML")+ '"]').querySelector('.amount')
            .textContent = Number(product.getAttribute("amount"));
        
            //Cambia el precio total
            precio = precio - cantidadActual*costo;
            precioTotal.textContent = precio+"€";
            item.remove();
            product.setAttribute("amount",0);
            if(cestaContainer.getElementsByClassName("productoencesta").length == 0){
                cestaContainer.innerHTML=cestaVacia;
            }
            break;
        }
    }
}

//Inicio de Eventos
document.addEventListener("DOMContentLoaded", start);