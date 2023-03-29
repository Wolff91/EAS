// Etch-A-Sketch 

function promptMe(){
    var sqInput = prompt("How big should the drawing area be?");
    alert (sqInput);
}

var cont = document.getElementById("container");

for(var i = 1; i <257; ++i){
 var div = document.createElement("div");
 div.setAttribute("class", "square");
 div.setAttribute("id", "div" + i);
 
var h1 = document.createElement("h1");
  // h1.textContent = i;
   div.appendChild(h1);
   cont.appendChild(div);
 }

