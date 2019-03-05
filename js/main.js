let circusTheme = ["#D44343","#FFB400","#9068D4","#4BB1DF","#9ED450","#FF9980", "#E58E73","#FF7F49", "#FFFF66", "#CCFF00", "#FDFF00", "#BEE64B"]

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

document.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 38:
        case 40:
        case 37:
        case 39:
        startGame();
   }},{once : true});

document.addEventListener('keydown', moveChar);

function moveChar (e){
    let currTop = parseInt(character.style.top.toString().replace("px", ""));
    let currLeft = parseInt(character.style.left.replace("px", ""));
    switch(e.keyCode){
         case 38:
         if(character.getBoundingClientRect().y>160){
            character.style.top = currTop - 70 + "px";
         } else {
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
         }
         break;
         case 40:
         if(character.getBoundingClientRect().y<(innerHeight-200)){
            character.style.top = currTop + 70 + "px";
         } else {
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
         }
         break;
         case 37:
         if(character.getBoundingClientRect().x>160){
            character.style.left = currLeft - 70 + "px";
         } else {
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
         }
         break;
         case 39:
         if(character.getBoundingClientRect().x<(innerWidth-200)){
            character.style.left = currLeft + 70 + "px";
         } else {
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
         }
         break;
    }
}

function startGame(){
     let title = document.querySelector("#title");
     title.style.top="-130px";
     title.style.transform = "scale(.25)";
     let botNav = document.querySelector("footer");
     botNav.style.bottom = "-100px";
     setTimeout(function(){
         botNav.remove();},500);
     let topNav = document.querySelector("header");
     topNav.style.top="65px";
     let arrows = document.querySelector("#arrs");
     arrows.style.opacity = "0"; 
 }

const createObstacle = function(text, size, time){
    let ob = document.createElement("div");
    let obText = document.createElement("h2");
    obText.innerText = text;
    obText.style.fontSize = Math.floor(size/3) +"px";
    obText.style.marginTop = -(Math.floor(size/6)) +"px";
    ob.style.position = "fixed";
    ob.style.width = size+"px";
    ob.style.height = size+"px";
    let startX = Math.floor((Math.random()*innerWidth*2)-(innerWidth*0.5));
    let startY;
    let pN = ((Math.round(Math.random())*2)-1);
    if(startX>-size && startX<(innerWidth+size)){
        if(pN>0){
            startY = innerHeight+(size*2);
        } else{
            startY = -(size*2);
        }
    } else {
        startY = Math.floor((Math.random()*innerHeight*2)-(innerHeight*0.5));
    }
    ob.style.top = startY+"px";
    ob.style.left = startX+"px";
    ob.style.transition=`top ${time}s ease-in-out, left ${time}s ease-in-out`;
    ob.appendChild(obText);
    document.querySelector("#obstacles").appendChild(ob);
    ob.style.left = innerWidth-startX;
    ob.style.top = innerHeight-startY;
    return [ob, startX, startY, time];
}

const detectCollision = function(obs, size){
    let dy = (character.getBoundingClientRect().y+47) - (obs.getBoundingClientRect().y + size/2);
    let dx = (character.getBoundingClientRect().x+47) - (obs.getBoundingClientRect().x + size/2);
    let distance = Math.sqrt(dx * dx + dy * dy);
    let disRef = ((size/2) + 47);
    if (distance < disRef){
        alert('collide');
    }
}


function level (troubles){
    for(let i = 0; i<troubles.length; i++){
            let arr = createObstacle(troubles[i].text,troubles[i].size,troubles[i].time);
            let obstacleInMove = arr[0];
            let obstacleStartX = arr[1];
            let obstacleStartY = arr[2];
            window.addEventListener("load", function(){
                obstacleInMove.style.left = innerWidth-obstacleStartX +"px";
                obstacleInMove.style.top = innerHeight-obstacleStartY +"px";
                setTimeout(function(){
                    obstacleInMove.remove();},troubles[i].time*1000);
            });

            console.log(character.getBoundingClientRect());
            setInterval(function(){
                detectCollision(arr[0], troubles[i].size);
            },100);
    }
}

const levelOneObs = [
    {
        text: "MOM",
        size: 500,
        time: 4
    }
];

level(levelOneObs);