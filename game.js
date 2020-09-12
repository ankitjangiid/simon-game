// helps to select an random colour
var buttonColours = ["red", "blue", "green", "yellow"];

// It'll store the random generated pattern
var gamePattern = [];

// It'll store the user clicked pattern
var userClickedPattern = [];

// To check if game has alreay started or not
var started = false;

var level = 0;

// This checks for keypress and only call nextSequence if game has not started yet
$(document).keypress(function (event) {
    if (started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


// It track the user clicked button and add that to userChosenColour array, 
// and adds animation, sound, lastly check the answer if user have clicked correct pattern
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


// This is main function because it generate an random pattern 
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


// It play sound corrosponding to the clicked colour
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// It animate the button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


// It check for the answer
function checkAnswer(currentLevel) {
    // It first check if the last clicked button is correct or not
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // if the last pressed button is correct then it check that if thw user input is on same level as of generated pattern
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    // if the last button is not correct it will stop the game 
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


// It resets all the variable to its initial stage
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}