
//constants and variables
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

// event listeners
newGameButton.addEventListener("click", function(evt) {
    console.log(evt.target);
});
playingField.addEventListener("click",function(evt) {
    console.log(evt.target);

});
//functions

function newGame() {
    cellState.forEach(function(element, index) {
        cellState[index] = 0;
    });
    mineCounter.value = 0;
    let numberOfMines = 0;
    if(difficulty.value === "easy") numberOfMines = 15;
    if(difficulty.value === "medium") numberOfMines = 30;
    if (difficulty.value === "hard") numberOfMines = 45;
    for(let i = 0; i < numberOfMines; i++) {
        let rand = Math.random() * 100;
        rand = Math.floor(rand);
        cellState[rand] = "x";
    }
    cellState.forEach(function(element, index) {
        if(element === "x") return;
        let nearbyMines = 0;
        if(cellState[index-11] === "x") nearbyMines ++;
        if(cellState[index-10] === "x") nearbyMines ++;
        if(cellState[index-9] === "x") nearbyMines ++;
        if(cellState[index-1] === "x") nearbyMines ++;
        if(cellState[index+1] === "x") nearbyMines ++;
        if(cellState[index+9] === "x") nearbyMines ++;
        if(cellState[index+10] === "x") nearbyMines ++;
        if(cellState[index+11] === "x") nearbyMines ++;
        cellState[index] = nearbyMines;
    });
    cellState.forEach(element => {
        if(element === "x")mineCounter.value ++
    });
}
function calculateNumber() {}