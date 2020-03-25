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

var origX = [199, 306, 409, 537, 638, 762, 862, 200, 307, 411, 537, 636, 748, 861, 200, 307, 423, 538, 652, 762, 876, 200, 309, 422, 523, 636, 748, 862, 200, 309, 408, 536, 651, 764, 879];
var origY = [96, 96, 96, 96, 96, 96, 96, 165, 168, 167, 166, 166, 167, 166, 256, 273, 271, 271, 258, 258, 256, 362, 362, 345, 360, 346, 345, 360, 452, 438, 452, 437, 452, 452, 437];

function magn(){
    for(var i=0;i<parts.length;i++){
        if(Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15) {
            elementSelect.setAttribute("x", origX[i]);
            elementSelect.setAttribute("y", origY[i]);
        }
    }
}

var win = document.getElementById("win");

function testing() {
    var sucessPart = 0;
    var heros = document.getElementsByClassName("hero");
    for(var i=0; i<parts.length;i++){
        var listX = "Lista X:" ;
        var listY = "Lista Y:" ;
        var posx = parseFloat(heros[i].firstChild.getAttribute("x"));
        var posy = parseFloat(heros[i].firstChild.getAttribute("y"));
        var listX = listX +", "+parseFloat(heros[i].firstChild.getAttribute("x"));
        var listY = listY +", "+parseFloat(heros[i].firstChild.getAttribute("y"));
        document.getElementById("lista").innerHTML = listX+"<br>"+listY;
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