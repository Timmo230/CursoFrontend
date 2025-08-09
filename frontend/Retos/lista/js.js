const liItems=document.getElementsByTagName("li");

console.log("Documento: " + document.nodeType);
console.log("HtmlCollection: " + liItems.nodeType);

for(const liItem of liItems){
    console.log("liElement: " + liItem.nodeType);
}

