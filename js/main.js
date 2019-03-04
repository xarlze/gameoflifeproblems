let circusTheme = ["#d44343","#ffb400","#9068d4","#4bb1df","#9ed450","#FF9980", "#E58E73","#FF7F49", "#FFFF66", "#CCFF00", "#FDFF00", "#BEE64B"]

let letterDivs = document.querySelectorAll(".p>div, .r>div, .o>div, .b>div, .l>div, .e>div, .m>div, .s>div");

const randColor = function(i){
    let colorInd = Math.floor(Math.random()*circusTheme.length);
    letterDivs[i].style.backgroundColor = circusTheme[colorInd];
    letterDivs[i].style.color = circusTheme[colorInd];
}

for(let i = 0; i<letterDivs.length; i++){
    randColor(i);
    setInterval(function(){
    let colorInd = Math.floor(Math.random()*circusTheme.length);
    letterDivs[i].style.backgroundColor = circusTheme[colorInd];
    letterDivs[i].style.color = circusTheme[colorInd];
    }, 100)
}

const character = document.querySelector("#char");

const moveChar = function(e){
    let currTop = parseInt(character.style.top.toString().replace("px", ""));
    let currLeft = parseInt(character.style.left.replace("px", ""));
    console.log(currTop + " left" + currLeft)
     switch(e.keyCode){
         case 38:
         character.style.top = currTop - 80 + "px";
         break;
         case 40:
         character.style.top = currTop + 80 + "px";
         break;
         case 37:
         character.style.left = currLeft - 80 + "px";
         break;
         case 39:
         character.style.left = currLeft + 80 + "px";
         break;
     }
 }

 document.addEventListener('keydown', moveChar);

