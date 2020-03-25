var minutes = 0;
var seconds = 0;
var playTime = setInterval(counter, 1000);


function counter() {
    seconds++;
    if(seconds == 60){
        minutes++;
        seconds = 0;
    }
    
}

var parts = document.getElementsByClassName("mobile");


for (var i=0;i<parts.length;i++) {
    parts[i].setAttribute("x", Math.floor((Math.random()*10) + 1));
    parts[i].setAttribute("y", Math.floor((Math.random()*409) + 1));
    parts[i].setAttribute("onmousedown", "selectElement(evt)");
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0 ;
var currentPosY = 0;

function selectElement(evt) {
    elementSelect = reorder(evt);
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentPosX = parseFloat(elementSelect.getAttribute("x"));
    currentPosY = parseFloat(elementSelect.getAttribute("y"));
    elementSelect.setAttribute("onmousemove", "moveElement(evt)");
}

function moveElement(evt) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentPosX = currentPosX + dx;
    currentPosY = currentPosY + dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = evt.clientX;
    currentY = evt.clientY;
    elementSelect.setAttribute("onmouseout", "deselectElement(evt)");
    elementSelect.setAttribute("onmouseup", "deselectElement(evt)");
    magn();
}

function deselectElement(evt) {
    testing();
    if(elementSelect != 0){
        elementSelect.removeAttribute("onmousemove");
        elementSelect.removeAttribute("onmouseout");
        elementSelect.removeAttribute("onmouseup");
        elementSelect = 0;
    }
}

var puzzleContainer = document.getElementById('container');

function reorder(evt) {
    var hero = evt.target.parentNode;
    var clone = hero.cloneNode(true);
    var id = hero.getAttribute("id");
    puzzleContainer.removeChild(document.getElementById(id));
    puzzleContainer.appendChild(clone);
    return puzzleContainer.lastChild.firstChild;
    
}

var origX = [201, 309, 407, 538, 639, 765, 865, 201, 307, 408, 524, 637, 765, 880, 201, 309, 423, 537, 636, 767, 880, 201, 296, 407, 523, 639, 754, 882, 201, 310, 409, 539, 654, 768, 882];
var origY = [96, 96, 96, 96, 96, 96, 96, 164, 178, 178, 164, 164, 180, 165, 269, 256, 255, 271, 255, 257, 257, 359, 345, 346, 346, 359, 361, 361, 449, 449, 449, 436, 449, 451, 436,];

function magn(){
    for(var i=0;i<parts.length;i++){
        if(Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15) {
            elementSelect.setAttribute("x", origX[i]);
            elementSelect.setAttribute("y", origY[i]);
        }
    }
}


function testing() {
    var sucessPart = 0;
    var heros = document.getElementsByClassName("hero");
    for(var i=0; i<parts.length;i++){
        var posx = parseFloat(heros[i].firstChild.getAttribute("x"));
        var posy = parseFloat(heros[i].firstChild.getAttribute("y"));
        var ind = heros[i].getAttribute("id");
        if(origX[ind] == posx && origY[ind] == posy){
            sucessPart = sucessPart+1;
        }
    }
    if(sucessPart == 35) {
        clearInterval(playTime);
        alert("Fim de jogo! Conclusão em "+minutes+" minutos e "+seconds+" segundos.");
        }
}