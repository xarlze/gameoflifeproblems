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

document.addEventListener('keydown', moveChar);

function moveChar (e){
    let currTop = parseInt(character.style.top.toString().replace("px", ""));
    let currLeft = parseInt(character.style.left.replace("px", ""));
    console.log(character.getBoundingClientRect())
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
         if(character.getBoundingClientRect().y<700){
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
         if(character.getBoundingClientRect().x<1300){
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

document.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 38:
        case 40:
        case 37:
        case 39:
        startGame();
   }},{once : true});

const createObstacle = function(text, size, time){
    let ob = document.createElement("div");
    ob.innerText = text;
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
    document.querySelector("#obstacles").appendChild(ob);
    ob.style.left = innerWidth-startX;
    ob.style.top = innerHeight-startY;
    return [ob, startX, startY, time];
}

const moveObstacle= function(ob, x, y, time){
    ob.style.left = innerWidth-x +"px";
    ob.style.top = innerHeight-y +"px";
    setTimeout(function(){
        ob.remove();},time*1000);
}

const createObstacleTest = function(text, size, time){
    let ob = document.createElement("div");
    ob.innerText = text;
    ob.style.position = "fixed";
    ob.style.width = size+"px";
    ob.style.height = size+"px";
    let startX = Math.random()*innerWidth;
    let startY = Math.random()*innerHeight;
    ob.style.top = startY+"px";
    ob.style.left = startX+"px";
    ob.style.transition=`top ${time}s ease-in-out, left ${time}s ease-in-out`;
    document.querySelector("#obstacles").appendChild(ob);
    return [ob, startX, startY, time];
}

const troubles = [
    {
        text: "hi",
        size: 50,
        time: 5
    }
]

for(let i = 0; i<troubles.length; i++){
    let arr = createObstacle(troubles[i].text,troubles[i].size,troubles[i].time);
    document.addEventListener("load",moveObstacle(arr[0], arr[1], arr[2], arr[3]));
}  


