
//constants and variables
let gameRunning = false;
let cellState = 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


//DOM constants
const difficulty = document.querySelector("#difficulty");
const newGameButton = document.querySelector("#newGame");
const playingField = document.querySelector("#playingField");
const mineCounter = document.querySelector("#mineCounter");
const cells = document.querySelectorAll(".cell");

// event listeners
newGameButton.addEventListener("click", function(evt) {
    console.log(evt.target);
});
playingField.addEventListener("click",function(evt) {
    if(evt.target.tagName !== "BUTTON") return;
    if(!gameRunning) return;
    const index = evt.target.parentElement.id.slice(1);
    if(cellState[index] === "x") {
        gameLost(index);
        return;
    }
    const adjacentMines = calculateAdjacent(index);
    if(adjacentMines === 0) {
        cells[index].innerHTML = "";
    }

});
//functions

function newGame() {
    cellState.forEach(function(element, index) { //clear the board
        cellState[index] = 0;                   
    });
    mineCounter.value = 0;                      // reset counter
    let numberOfMines = 0;                      // reset global variable
    if(difficulty.value === "easy") numberOfMines = 15;
    if(difficulty.value === "medium") numberOfMines = 30;   //calculate#ofmines based on difficulty
    if (difficulty.value === "hard") numberOfMines = 45;
    for(let i = 0; i < numberOfMines; i++) {        //place mines on board
        let rand = Math.random() * 100;
        rand = Math.floor(rand);
        cellState[rand] = "x";
    }
    cellState.forEach(function(element, index) {    //place numbers on board(adjacent mines)
        if(element === "x") return;
        cellState[index] = calculateAdjacent(index);
    });
    cellState.forEach(element => {
        if(element === "x")mineCounter.value ++
        
    });
    cells.forEach(function(element, index) {
        element.style.backgroundColor = "lightgray";
        const newButton = document.createElement("button");
        newButton.style.width = "100%";
        newButton.style.height = "100%";
        newButton.style.background = "darkgray";
        cells[index].appendChild(newButton);
        //cells[index].innerHTML = "<button></button>";
        //console.log(element.innerHTML === cells[0].innerHTML);
        gameRunning = true;
        console.log(gameRunning);
    });
    //cells[0].innerHTML = "calamardo";
}
function gameLost(index) {

}
function gameWon() {

}
function calculateAdjacent(index) {return 0;}