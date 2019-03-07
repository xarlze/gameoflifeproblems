let circusTheme = ["#D44343","#FFB400","#9068D4","#4BB1DF","#9ED450","#FF9980", "#E58E73","#FF7F49", "#FFFF66", "#CCFF00", "#FDFF00", "#BEE64B"]

let letterDivs = document.querySelectorAll(".p>div, .r>div, .o>div, .b>div, .l>div, .e>div, .m>div, .s>div");

let alive = true;

let maxLevel = 1;

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

setInterval(function(){
    if(alive){
    character.classList.toggle("blink");
    setTimeout(() => {
        character.classList.toggle("blink");
        setTimeout(() => {
            character.classList.toggle("blink");
            setTimeout(() => {
                character.classList.toggle("blink");
            }, 100);
        }, 100);
    }, 100);
}
}, 3000);



function moveChar (e){
    let currTop = parseInt(character.style.top.toString().replace("px", ""));
    let currLeft = parseInt(character.style.left.replace("px", ""));
    switch(e.keyCode){
         case 38:
         if(character.getBoundingClientRect().y>160 && alive){
            character.style.top = currTop - 70 + "px";
            character.className = "lookup";
         } else if (alive){
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
            
         }
         break;
         case 40:
         if(character.getBoundingClientRect().y<(innerHeight-250) && alive){
            character.style.top = currTop + 70 + "px";
            character.className = "lookdown";
         } else if (alive) {
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
         }
         break;
         case 37:
         if(character.getBoundingClientRect().x>160 && alive){
            character.style.left = currLeft - 70 + "px";
            character.className = "lookleft";
         } else if (alive) {
            let warning = document.createElement("h1");
            warning.innerText = "Please stay within bounds!"
            document.body.appendChild(warning);
            setTimeout(function(){
                warning.remove();},2000);
         }
         break;
         case 39:
         if(character.getBoundingClientRect().x<(innerWidth-200) && alive){
            character.style.left = currLeft + 70 + "px";
            character.className = "lookright";
         } else if (alive) {
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
     topNav.style.top="68px";
     let arrows = document.querySelector("#arrs");
     arrows.style.opacity = "0";
 }

const createObstacle = function(text, size, time){
    let ob = document.createElement("div");
    let obText = document.createElement("h2");
    ob.style.background = circusTheme[Math.floor(Math.random()*circusTheme.length)];
    obText.style.fontSize = Math.floor(size/6) +"px";
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
    if(document.querySelector("#obstacles")){
        document.querySelector("#obstacles").appendChild(ob);
    }
    ob.style.left = innerWidth-startX;
    ob.style.top = innerHeight-startY;
    return [ob, startX, startY, time];
}

const gameOver = function(){
    alive = false;
    let allObs = document.querySelector("#obstacles");
    character.className = "dead";
    if(allObs){
        allObs.remove();
    }
    if(!document.querySelector("h4")){
        let over = document.createElement("h4");
        over.innerText = "GAME OVER, YOU DIED.";
        if(!document.querySelector("#gameover>h4")&&!document.querySelector("#reset>a")){
            document.querySelector("#gameover").appendChild(over);
            let reset = document.createElement("a");
                reset.innerText = "Restart";
                document.querySelector("#reset").appendChild(reset);
            setTimeout(function(){
                over.remove();
            },4000);
        }
        document.querySelector("#levelnotice").remove();
    }
}

const detectCollision = function(obs, size, interval){
    let dy = (character.getBoundingClientRect().y+47) - (obs.getBoundingClientRect().y + size/2);
    let dx = (character.getBoundingClientRect().x+47) - (obs.getBoundingClientRect().x + size/2);
    let distance = Math.sqrt(dx * dx + dy * dy);
    let disRef = ((size/2) + 47);
    if (distance < disRef){
        gameOver();
        clearInterval(interval);
    }
}

function level (troubles){
    for(let i = 0; i<troubles.length; i++){
        let arr = createObstacle(troubles[i].text,troubles[i].size,troubles[i].time);
        let obstacleInMove = arr[0];
        let obstacleStartX = arr[1];
        let obstacleStartY = arr[2];
        let interval;
        setTimeout(() => {
            obstacleInMove.style.left = innerWidth-obstacleStartX +"px";
            obstacleInMove.style.top = innerHeight-obstacleStartY +"px";
            interval = setInterval(function(){
                detectCollision(arr[0], troubles[i].size, interval);
            },100);
        }, (i*1000));
        setTimeout(function(){
            obstacleInMove.remove();
        },(troubles[i].time*1000+i*1000));
        setTimeout(function(){
            clearInterval(interval);
        },(troubles[i].time*1000+i*1000));
    }
}

const levelNotice = function(level){
    let notice = document.createElement("h3");
    notice.innerText = `Level ${level}`;
    if(document.querySelector("#levelnotice")){
        document.querySelector("#levelnotice").appendChild(notice);
        }
    setTimeout(() => {
        notice.remove();
    }, 2000);
}

const beginObs = [
    {
        text: "MOM FORGOT YOUR MILK",
        size: 300,
        time: 35
    },
    {
        text: "DAD ",
        size: 100,
        time: 30
    },
    {
        text: "MOM",
        size: 500,
        time: 30
    },
    {
        text: "MOM",
        size: 70,
        time: 34
    },
    {
        text: "MOM",
        size: 120,
        time: 40
    },
    {
        text: "MOM",
        size: 600,
        time: 26
    },
    {
        text: "MOM",
        size: 100,
        time: 20
    },
    {
        text: "MOM",
        size: 25,
        time: 22
    },
    {
        text: "MOM",
        size: 50,
        time: 25
    },
    {
        text: "MOM",
        size: 1000,
        time: 35
    },
    {
        text: "MOM",
        size: 200,
        time: 26
    },
    {
        text: "MOM",
        size: 500,
        time: 25
    },
    {
        text: "MOM",
        size: 600,
        time: 18
    }
];

document.addEventListener('keydown', function(e){
    switch(e.keyCode){
        case 38:
        case 40:
        case 37:
        case 39:
        startGame();
        let levelUpObs = beginObs;
        let allLev = [];
        for(let i = 0; i<=maxLevel; i++){
            if(i<maxLevel){
                setTimeout(function(){
                    for(let c=0;c<levelUpObs.length;c++){
                        levelUpObs[c].time = Math.round(levelUpObs[c].time*0.8);
                    }
                    allLev.push(levelUpObs);
                    if(alive){
                        levelNotice((i+1));
                        level(allLev[i]);
                    }
                }, ((i*0.7)*33000+700));
            }else if (i === maxLevel &&alive){
                setTimeout(function(){
                    if(alive){
                        let win = document.createElement("h4");
                        win.innerText = "YOU WON!";
                        document.querySelector("#gameover").appendChild(win);
                        let reset = document.createElement("a");
                        setTimeout(function(){
                            reset.innerText = "PLAY AGAIN";
                            document.querySelector("#reset").appendChild(reset);
                        },4000)}
                    },((i*0.6)*33000+900)) 
                }
            }
        };
},{once : true});

document.addEventListener('keydown', moveChar);