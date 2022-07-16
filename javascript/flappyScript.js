var pipes1 = document.getElementById("pipes1");
var pipes2 = document.getElementById("pipes2");
var pipes3 = document.getElementById("pipes3");
var pipes4 = document.getElementById("pipes4");
var character = document.getElementById("character");
var logo = document.getElementById("flappy-logo");
var scoreDisplay = document.getElementById("cur-score");
var pointSound = new Audio("../audio/sfx_point.mp3");
var themeSong = new Audio("../audio/flappy_bird_theme_song.mp3");
var jumping = 0; //boolean
var score = 0; 
var gameStart = 0;

pointSound.volume = 0.05;
themeSong.volume = 0.2;
themeSong.play();
setInterval(function(){ themeSong.play(); }, 39000);

//prevents img dragging
pipes1.ondragstart = function() { return false; }; 
pipes2.ondragstart = function() { return false; };
pipes3.ondragstart = function() { return false; };
pipes4.ondragstart = function() { return false; };
logo.ondragstart = function() { return false; };
character.ondragstart = function() { return false; };

pipes1.addEventListener('animationiteration', function(){ pipeRandomizer(pipes1); });
pipes2.addEventListener('animationiteration', function(){ pipeRandomizer(pipes2); });
pipes3.addEventListener('animationiteration', function(){ pipeRandomizer(pipes3); });
pipes4.addEventListener('animationiteration', function(){ pipeRandomizer(pipes4); });

setInterval(function(){ //runs every 10ms
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    
    if(jumping==0 && gameStart==1){ //while not jumping
        character.style.top = (characterTop+3)+"px"; // Gravity
    }

    deathCheck(pipes1);
    deathCheck(pipes2);
    deathCheck(pipes3);
    deathCheck(pipes4);
    
    scoreDisplay.innerHTML = "Score: " + score; // current score
},10);

function jump(){ //runs once per click
    jumping = 1;
    if(!gameStart){ start(); }
    let jumpCount = 0;
    var jumpInterval = setInterval(function () { //starts upward jumping motion
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if (characterTop > 130 && jumpCount < 15) { //stops if at top of screen or after 15 iterations(150ms)
            character.style.top = characterTop - 5 + "px"; //moves character upward
        } //float for 5 iterations(50ms)
        if (jumpCount > 20) { 
            clearInterval(jumpInterval); //interval ends after 20 iterations(200ms)
            jumping = 0; //resumes falling
            jumpCount = 0; //resets interval iterations
        }
        jumpCount++; //add iteration
    }, 10);
}


function start(){
    gameStart = 1;
    pipes1.style.animationName = 'pipes';
    pipes2.style.animationName = 'pipes';
    pipes3.style.animationName = 'pipes';
    pipes4.style.animationName = 'pipes';

    pipes1.style.animationPlayState = 'running';
    pipes2.style.animationPlayState = 'running';
    pipes3.style.animationPlayState = 'running';
    pipes4.style.animationPlayState = 'running';
    logo.style.animationPlayState = 'running';

    pipes1.style.top = -((Math.random()*250)-130) + "px";
    pipes2.style.top = -((Math.random()*250)-130) + "px";
    pipes3.style.top = -((Math.random()*250)-130) + "px";
    pipes4.style.top = -((Math.random()*250)-130) + "px";
}

function gameReset(){
    gameStart = 0;
    pipes1.style.animationPlayState = 'paused';
    pipes2.style.animationPlayState = 'paused';
    pipes3.style.animationPlayState = 'paused';
    pipes4.style.animationPlayState = 'paused';

    resetAnimation(logo);
    pipes1.style.animationName = 'none';
    pipes2.style.animationName = 'none';
    pipes3.style.animationName = 'none';
    pipes4.style.animationName = 'none';
    character.style.top = 250 + "px"; // respawn at top
    score=0; // reset score
    //alert("Game over. Score: "+(score));
}

function pipeRandomizer(pipes){ 
    var random = -((Math.random()*250)-130);
    pipes.style.top = random + "px";
    pointSound.play();
    score++;
}

function deathCheck(pipes){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var pipeLeft = parseInt(window.getComputedStyle(pipes).getPropertyValue("left"));
    var openingTop = parseInt(window.getComputedStyle(pipes).getPropertyValue("top"));

    if((characterTop>550)||((pipeLeft<98)&&(pipeLeft>-7)&&((characterTop<openingTop+311)||(characterTop>openingTop+420)))){ //hitboxes ((floor)||(leftPipe)&&(rightPipe)||(openingTop)||(openingBottom))
        gameReset();
    }
}

function resetAnimation(anime) {
    const el = anime;
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = null;
}

/*
function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform")||st.getPropertyValue("-moz-transform")||st.getPropertyValue("-ms-transform")||st.getPropertyValue("-o-transform")||st.getPropertyValue("transform")||"none";
    if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
        return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    }
    return 0;
}
*/