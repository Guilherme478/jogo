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

//var partWidth = [134,192,134,163,134,163,134,192,134];
//var partHeight = [163,134,163,134,192,134,163,134,163];

for (var i=0;i<parts.length;i++) {
//    parts[i].setAttribute("width", partWidth[i]);
//    parts[i].setAttribute("height", partHeight[i]);
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
    document.getElementById("xSize").innerHTML = currentPosX;
    document.getElementById("ySize").innerHTML = currentPosY;
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

var origX = [199, 353, 514, 659, 820, 200, 352, 496, 676, 838, 201, 337, 496, 657, 835, 201, 353, 514, 655, 817];
var origY = [98, 98, 98, 98, 98, 203, 186, 201, 186, 204, 297, 297, 313, 297, 297, 429, 428, 427, 428, 410];

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
        var posx = parseFloat(heros[i].firstChild.getAttribute("x"));
        var posy = parseFloat(heros[i].firstChild.getAttribute("y"));
        var ind = heros[i].getAttribute("id");
        if(origX[ind] == posx && origY[ind] == posy){
            sucessPart = sucessPart+1;
        }
    }
    if(sucessPart == 20) {
        clearInterval(playTime);
        alert("Fim de jogo! Conclusão em "+minutes+" minutos e "+seconds+" segundos.");
        }
}