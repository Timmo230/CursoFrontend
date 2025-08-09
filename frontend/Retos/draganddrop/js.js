const objeto=document.getElementById("objeto");
const contenedor=document.getElementById("contenedor");

objeto.addEventListener("dragstart", 
    e=>{console.log("El objeto comienza a moverse");}
);

objeto.addEventListener("dragend", 
    e=>{console.log("El objeto ya no se mueve");}
);

contenedor.addEventListener("dragover", 
    e=>{
        e.preventDefault();
        console.log("El objeto esta moviendose en el contenedor");
    }
);

contenedor.addEventListener("drop", 
    e=>{console.log("El objeto se ha soltado");}
);