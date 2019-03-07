let circusTheme = ["#D44343","#FFB400","#9068D4","#4BB1DF","#9ED450","#FF9980", "#E58E73","#FF7F49", "#FFFF66", "#CCFF00", "#FDFF00", "#BEE64B"]
let letterDivs = document.querySelectorAll(".p>div, .r>div, .o>div, .b>div, .l>div, .e>div, .m>div, .s>div");
const character = document.querySelector("#insch");

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

setInterval(function(){
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
}, 3000);

const talk = function (words){
    let say = document.createElement("h6");
    say.innerText = words;
    document.body.appendChild(say);
    setTimeout(function(){
        say.remove();},2500);
}

window.addEventListener("load", function(){
    character.style.top = "45px";
    character.style.left = "-190px";

    setTimeout(function(){
        character.className = "lookright";
    }, 1000)

    setInterval(function(){
        character.className = "lookleft";
        setTimeout(function(){
            character.className = "lookright";
        }, 600)
    }, 6000)

    setTimeout(function(){
        talk("Herroooo");
        setTimeout(function(){
            talk("I'm... you");
            setTimeout(function(){
                talk("or you're me");
                setTimeout(function(){
                    talk("it doesn't matter");
                    setTimeout(function(){
                        talk("you need to save me");
                        setTimeout(function(){
                            talk("from like... problems");
                            setTimeout(function(){
                                talk("for example...");
                                character.style.top = "170px";
                                character.style.left = "-110px";
                                setTimeout(function(){
                                    talk("Use your arrow keys");
                                    character.style.top = "45px";
                                    character.style.left = "-190px";
                                    setTimeout(function(){
                                        talk("move me away from them");
                                        setTimeout(function(){
                                            talk("Good luck");
                                            setTimeout(function(){
                                                let back = document.createElement("a");
                                                back.innerText = "Play Game";
                                                back.setAttribute("href","index.html");
                                                document.querySelector("#home").appendChild(back);
                                            }, 2500);
                                        }, 2500);
                                    }, 2500);
                                }, 2500);
                            }, 2500);
                        }, 2500);
                    }, 2500);
                }, 2500);
            }, 2500);
        }, 2500);
    }, 1600);
    setTimeout(function(){
        let ob = document.createElement("div");
        ob.style.background = circusTheme[Math.floor(Math.random()*circusTheme.length)];
        let startX = -400;
        let startY = 2000;
        ob.style.position = "fixed";
        ob.style.width = "300px";
        ob.style.height = "300px";
        ob.style.top = startY+"px";
        ob.style.left = startX+"px";
        ob.style.transition=`top 7s ease-in-out, left 7s ease-in-out`;
        document.querySelector("#obstacles").appendChild(ob);
        setTimeout(function(){
            ob.style.left = "1000px";
            ob.style.top = "-1000px";
        },100);
    },13600)
})
