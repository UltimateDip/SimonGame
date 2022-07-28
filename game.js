var buttonColors = ["red","blue","green","yellow"];
var level = 0,pointer=0,delayTime = 500;
var gamePattern = [];
var isCorrect=true,isStarted=false;


// After resetting only this will work
$(document).keypress(function(){
    if(level==0){
        setTimeout(function(){
            nextSequence();
        },delayTime);
        isStarted=true;
    }
    
});


$(".btn").click(function(event){
    if(!isStarted)return;

    // If color is same then ++ else wrong
    var userChosenColor = event.target.id;
    if(userChosenColor==gamePattern[pointer]){
        animatePress(userChosenColor);
        playSound(userChosenColor);
        pointer++;
    }else{
        playSound("wrong");
        isCorrect=false;
        console.log("wrong");
    }
    
    if(isCorrect &&  pointer==gamePattern.length)
    {
        console.log("next");
        setTimeout(function(){
            nextSequence();
        },delayTime);
    }else if(!isCorrect){
        gameOver();
    }
});

function generateRandomColor(){
    var randomNumber  = Math.floor(Math.random()*4)
    return buttonColors[randomNumber];
}

function nextSequence(){
    $("h1").text("Level "+ (++level));
    pointer=0;
    randomChosenColor = generateRandomColor();
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor)
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(id){
    $("#"+id).addClass("pressed");
    setTimeout(function(){
        $("#"+id).removeClass("pressed");
    },100);
}

function gameOver(){
    console.log("false");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    
    gamePattern=[];
    level=0;
    pointer=0;
    isCorrect=true;
}