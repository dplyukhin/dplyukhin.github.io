// Defaults
let categories = ["Animal", "City", "Clothing", "Artist (Music)", "Artist (Visual)", 
    "Drink", "Country", "Food", "Boy's name", "Girl's name", "Insect", 
    "Breakfast", "Hobbies"];
let nextCategoryIndex = 0;
let MAX_TIME = 10;
let timeLeft = MAX_TIME;
var timeoutInterval = undefined;
let lettersLeft = 26;

// Initialization
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(categories);
console.log(categories)

// Main mode
const MainScreen = document.getElementById("main-screen");
const MaxTimeField = document.getElementById("max-time-field");
const IncreaseTime = document.getElementById("increase-time");
const DecreaseTime = document.getElementById("decrease-time");
const StartButton = document.getElementById("start-button");
// Play mode
const PlayScreen = document.getElementById("play-screen");
const CategoryField = document.getElementById("category-field");
const TimeField = document.getElementById("time-field");
const EndPlayButton = document.getElementById("end-play-button");
const NewGameButton = document.getElementById("new-game-button");
const Letters = document.getElementsByClassName("my-letter");


// CONFIGURE MAX TIME

function setMaxTime(n) {
    MAX_TIME = n;
    MaxTimeField.innerText = MAX_TIME;
}
setMaxTime(MAX_TIME)

IncreaseTime.onclick = function () {
    setMaxTime(MAX_TIME + 1);
}
DecreaseTime.onclick = function () {
    setMaxTime(MAX_TIME - 1);
}


// START THE GAME

StartButton.onclick = startGame;
EndPlayButton.onclick = returnHome;
NewGameButton.onclick = newGame;
for (Letter of Letters) {
    Letter.onclick = function () {
        if (this.disabled == true) 
            return;
        this.disabled = true;
        lettersLeft -= 1;
        clearInterval(timeoutInterval);
        if (lettersLeft <= 0) {
            clearInterval(timeoutInterval);
            TimeField.innerText = "YOU WIN!";
        }
        else {
            timeLeft = MAX_TIME;
            TimeField.innerText = MAX_TIME + " seconds left";
            timeoutInterval = setInterval(decrementTime, 1000);
        }
    }
}

function startGame() {
    clearInterval(timeoutInterval);
    for (Letter of Letters) {
        Letter.disabled = false;
    }
    MainScreen.hidden = true;
    PlayScreen.hidden = false;
    CategoryField.innerText = categories[nextCategoryIndex];
    TimeField.innerText = MAX_TIME + " seconds left";
    timeLeft = MAX_TIME;
    lettersLeft = 26;
    timeoutInterval = setInterval(decrementTime, 1000);
}

function decrementTime() {
    console.log('call')
    timeLeft -= 1;
    if (timeLeft > 0) {
        TimeField.innerText = timeLeft + " seconds left";
    }
    else {
        TimeField.innerText = "GAME OVER";
        clearInterval(timeoutInterval);
    }
}

function returnHome() {
    MainScreen.hidden = false;
    PlayScreen.hidden = true;
    clearInterval(timeoutInterval);
}

function newGame() {
    nextCategoryIndex = (nextCategoryIndex + 1) % categories.length;
    startGame();
}