var userClickedPattern = [];
var gamePattern = [];
var buttonColors =["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.indexOf(userChosenColour));
});

function nextSequence(){
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColors[randomNumber];
  $("#" + randomChosenColour).fadeOut(75).fadeIn(75).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  }

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("succes");
    if(userClickedPattern.length == gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    wrong();
  }
}
function wrong(){
  console.log("wrong");
  playSound("wrong")
  $("body").addClass("game-over")
  setTimeout(function(){
    $("body").removeClass("game-over")
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}
function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}
