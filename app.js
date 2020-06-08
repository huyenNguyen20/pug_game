/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var winningScoreButton = document.querySelector("#submit");
var newButton = document.querySelector(".btn-new");
var rollButton = document.querySelector(".btn-roll");
var holdButton = document.querySelector(".btn-hold");
var dice = document.querySelector(".dice");
var dice1 = document.querySelector(".dice1");
var currentPlayer = 0;
var currentScore1 =  document.querySelector("#current-0");
var currentScore2 =  document.querySelector("#current-1");
var player1 = document.querySelector(".player-0-panel");
var player2 = document.querySelector(".player-1-panel");
var globalScorePlayer1 = document.querySelector("#score-0");
var globalScorePlayer2 = document.querySelector("#score-1");
var name1 = document.querySelector("#name-0");
var name2 = document.querySelector("#name-1");
var globalScore1 = 0;
var globalScore2 = 0;
var rollTotal = 0;
var isPlaying = true;
var previousDiceRoll = 0;
var winningScore = 100;
/*Initialize Game*/
player1.classList.add("active");
/*Roll Event*/
rollButton.addEventListener("click",function(){
  var totalDice = rollDice() + rollDice1();
  (totalDice === 12 && totalDice === previousDiceRoll)?
    totalDice = 2
    : previousDiceRoll = totalDice;
  displayCurrentScore(totalDice);
})
/*HoldEvent*/
holdButton.addEventListener("click", function(){
  if(currentPlayer === 0){
    globalScore1 += rollTotal;
    globalScorePlayer1.textContent = globalScore1;
  } else {
    globalScore2 += rollTotal;
    globalScorePlayer2.textContent = globalScore2;
  }
  isWinner();
  if(isPlaying){
    resetAfterChangeTurn();
  }

})
/*New Game Event*/
newButton.addEventListener("click", function(){
  reset();
})
/*Winning Score Button*/
winningScoreButton.addEventListener("click", function(event){
  event.preventDefault();
  winningScore = document.querySelector("#setScore").value;
})
/*reset Function*/
function reset(){
  globalScore1 = 0;
  globalScorePlayer1.textContent = 0;
  globalScore2 = 0;
  globalScorePlayer2.textContent = 0;
  name1.textContent = "Player 1";
  player1.classList.remove("winner");
  name2.textContent = "Player 2";
  player2.classList.remove("winner");
  resetAfterChangeTurn();
}
/*roll Dice*/
function rollDice (){
  var diceNum = Math.floor(Math.random()*6+1);
  var newImage = "images/dice-" + diceNum + ".png"
  dice.setAttribute("src", newImage);
  return diceNum;
}
function rollDice1 (){
  var diceNum = Math.floor(Math.random()*6+1);
  var newImage = "images/dice-" + diceNum + ".png"
  dice1.setAttribute("src", newImage);
  return diceNum;
}
/*Display Current Score*/
function displayCurrentScore(diceNum){
  if (diceNum !== 2){
    rollTotal += diceNum;
    (currentPlayer === 0) ?
      currentScore1.textContent = rollTotal
      :currentScore2.textContent = rollTotal;
  } else {
    resetAfterChangeTurn();
  }
}
/*Reset after changing current player*/
function resetAfterChangeTurn(){
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  rollTotal = 0;
  previousDiceRoll = 0;
  changeCurrentPlayer();
}
/*Change current player*/
function changeCurrentPlayer(){
  (currentPlayer === 0) ? currentPlayer = 1 : currentPlayer = 0;
    player1.classList.toggle("active");
    player2.classList.toggle("active");
}
/*Check Winner*/
function isWinner(){
  if(globalScore1 >= winningScore && globalScore2 < winningScore ){
    name1.textContent = "winner!";
    player1.classList.add("winner");
    isPlaying = false;
  }
  else if (globalScore1 < winningScore && globalScore2 >= winningScore){
    name2.textContent = "winner!";
    player2.classList.add("winner");
    isPlaying = false;
  }
}
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row.
After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning
score, so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript.
This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice,
so take a look at the CSS code for the first one.)
*/
