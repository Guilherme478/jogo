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

var origX = [199, 307, 419, 535, 651, 765, 879, 199, 309, 406, 522, 635, 764, 879, 199, 293, 406, 537, 637, 751, 865, 199, 291, 422, 522, 636, 765, 865, 198 ,293, 406, 535, 635, 750, 864];
var origY = [99, 99, 99, 99, 99, 99, 99, 183, 182, 181, 182, 167, 167, 181, 273, 258, 257, 258, 271, 270, 270, 348, 363, 348, 347, 347, 360, 360, 438, 438, 451, 451, 437, 437, 437];

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