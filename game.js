var buttonColors = ['red', 'blue', 'green', 'yellow']; //names of the button colors

var gamePattern = [];   //pattern that computer generates
userClickedPattern = []; //pattern that user clicks on

var randomNumber 
var keyPressed
var startedGame = false;
var level = 0;

$(document).on('keypress', function(){  //to start the game via keyboard press
    if(!startedGame){
        nextSequence(); //calling the function once key is pressed.
        console.log(keyPressed)
        startedGame = true; //changing the bool to true to stop other keypresses from starting the game after the first one.        
    }
});

$('.btn').on("click", function(){ //detecting click event on button(user clicks) 
    
var userChosenColor = this.id; //recognizing the and storing the id of the button where click has occured using this keyword.

userClickedPattern.push(userChosenColor);//pushing the clicked button to array of user clicks.
console.log(userClickedPattern); 

playSound(userChosenColor); //calling playSound()so respective sound is played
animatePress(userChosenColor); //calling animatePress()so click is animated.

checkAnswer(userClickedPattern.length-1); //... no ...using length to find the last index and calling the checkAnswer() to match the answer.
// length = userClickedPattern.length; //finding length of the array.
});

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        
        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        
        console.log("wrong");
        $('h1').text('game over, press any key to restart.');
        playSound('wrong');
        $('body').addClass("game-over")
        
        setTimeout(function(){
            $('body').removeClass("game-over");
        },200);

        startOver()
    }
}

function startOver(){
    startedGame = false;
    level = 0;
    gamePattern = [];
    
}
// const compareArrays = (a,b) => a.length === b.length && a.every((element, index) => element === b[index]);

// function checkAnswer(){
//     if (compareArrays(userClickedPattern, gamePattern) == true){
//         console.log('matched');
//         setTimeout(nextSequence(), 1000);
//     } else if(compareArrays(userClickedPattern, gamePattern) != true) {
//         console.log('unmatched')
//         $('.btn').off('click'); // Disable click event listener
//         $('h1').text('over');
//     }
// }

function nextSequence(){   //function to generate pattern
    userClickedPattern = []
    randomNumber = Math.round(Math.random()*3); //to generate a random number from 3, as arr.len = 4 
    var randomChosenColor = buttonColors[randomNumber]; //to get the color in the pattern each by each based on randomised numbers.
    gamePattern.push(randomChosenColor); //pushing the color randomised to the array
    makeFlash(randomChosenColor); //creating flash pattern for colors clicked.
    $("h1").text('Level '+ level); //changing the level texts
    level++; //incrementing levels
}


function makeFlash(color){ //function to get button to flash when chosen
    $("#"+color).fadeOut(150).fadeIn(150); //selecting id of the color to flash.
    playSound(color); //calling playSound()so respective sound is played 
}


// if(result == 'unmatched'){
//         $('.btn').click( function(){ //detecting click event on button(user clicks) 
//         var userChosenColor = this.id; //recognizing the and storing the id of the button where click has occured using this keyword.
//         userClickedPattern.push(userChosenColor);//pushing the clicked button to array of user clicks.
//         console.log(userClickedPattern); 
//         playSound(userChosenColor); //calling playSound()so respective sound is played
//         animatePress(userChosenColor); //calling animatePress()so click is animated.
//         // length = userClickedPattern.length; //finding length of the array.
//         if(userClickedPattern.length == gamePattern.length){
//             checkAnswer(); //using length to find the last index and calling the checkAnswer() to match the answer.
//         }
//     });
// }


function playSound(name){
    var sound = new Audio("sounds/"+ name +".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}




// function checkAnswer(currentLevel){
//     if(userClickedPattern == gamePattern){
//         if(userClickedPattern[currentLevel] == gamePattern[currentLevel] ){
//             console.log('win');
//         } else {
//             console.log('wrong');
//         }
//     } else {
//         console.log('pattern is wrong')
//     }
//     setTimeout(nextSequence(), 1000);
// }

// function checkAnswer(){
//     for( let i =0; i<gamePattern.length; i++){
//         if(gamePattern[i] !== userClickedPattern[i]){
//             // result = 'unmacthed'; 
//             console.log('unmatched');
//             $('h1').text('over');
//             $('.btn').off('click'); // Disable click event listener
//             return; // Exit the function early on mismatch
//         } else if((gamePattern[i] == userClickedPattern[i])){
//         console.log('matched');
//         // result = 'matched';
//         setTimeout(nextSequence(), 1000);
//         // userClickedPattern = [];
//         } 
//     }
// }
//         else {
//         if (userClickedPattern[currentLevel] == gamePattern[currentLevel] ){
//             console.log('win');
//         } else {
//             console.log('wrong');
//         }
//     }
// }
