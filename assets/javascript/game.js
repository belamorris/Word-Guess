//create variables

var $placeholders = document.getElementById("placeholders");
var $lettersGuessed = document.getElementById("lettersGuessed");
var $guessesRemaining = document.getElementById("remaining");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

var wordBank = ["Dude", "Walter", "Lebowski", "Bunny", "Donnie"];
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var pickedword = " ";
var lettersGuessedBank = [];
var incorectLettersBank = [];
var gameRunning = false;
var placeholdersArr =[];

//new game function

function newGame (){

    gameRunning = true;
    guessesLeft = 10;
    lettersGuessedBank = [];
    incorectLettersBank = [];
    placeholdersArr = [];

    pickedword = wordBank[Math.floor(Math.random() * wordBank.length)];

  for (var i = 0; i < pickedword.length; i++){
      if (pickedword[i] === " ") {
          placeholdersArr.push(" ");
      }else {
          placeholdersArr.push("_");
      }
  }
  $guessesRemaining.textContent = guessesLeft;
  $placeholders.textContent = placeholdersArr.join(" ");
  $lettersGuessed.textContent = incorectLettersBank.join(" ");
}


//function for what letter was guessed

  function letterGuess (letter) {
      console.log(letter);

      if (gameRunning === true && lettersGuessedBank.indexOf(letter) === -1) {
            lettersGuessedBank.push(letter);

        for (var i = 0; i < pickedword.length; i++){
            if (pickedword[i].toLowerCase() === letter.toLowerCase()) {
                placeholdersArr[i] = pickedword[i];
            }
           
        }

       $placeholders.textContent = placeholdersArr.join(" "); 
       checkIncorrect(letter);

      }
      else {
         if (gameRunning === false){
            alert ("press any key to start");
         } 
         else {
             alert ("guess a new letter");
         }
      }
    
    }


//function to check if letter was correct
function checkIncorrect(letter){



     if (
        placeholdersArr.indexOf(letter.toLowerCase) < 0 
       
     ){
        incorectLettersBank.push(letter);
        guessesLeft --;
         $lettersGuessed.textContent = incorectLettersBank.join(" ");
         $guessesRemaining.textContent = guessesLeft;
    
        }
        checkLost();
    }
    

//check if lost
function checkLost(){
    if (guessesLeft === 0){
        losses++;
        gameRunning= false;
        $losses.textContent = losses;
    }
    checkWin();
}


//check if win
function checkWin() {
    if (pickedword.toLowerCase() === placeholdersArr.join("").toLowerCase()){
       wins++;
       gameRunning = false;
       $wins.textContent = wins;
    }
}

//event to start new game

document.onkeyup = function (event) {
    // If finished, dump one keystroke and reset
    if (gameRunning === false) {
        newGame();
        gameRunning = true;
    } else {
        // Check to make sure a (65) - z (90) was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            letterGuess(event.key.toLowerCase());
        }
    }
};