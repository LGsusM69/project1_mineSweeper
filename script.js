
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
    if(evt.target.tagName !== "BUTTON") return;  //make sure its a button
    if(!gameRunning) return;            // game is running?
    const index = evt.target.parentElement.id.slice(1);
    if(cellState[index] === "x") {      //check if its a mine
        gameLost(index);
        return;
    }
    //if(cellState[index].class) return;
    console.log(cellState[index] + "calamardo:  ");

    const adjacentMines = calculateAdjacent(index);
    if(adjacentMines === 0) {
        cells[index].innerHTML = "";
    }
    else {
        const newH1 = document.createElement("h1");
        newH1.style.width = "100%";
        newH1.style.height = "100%";
        newH1.innerText = adjacentMines;
        cells[index].innerHTML = "";
        cells[index].appendChild(newH1);
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
    cellState.forEach(element => {      // update the mine counter
        if(element === "x")mineCounter.value ++
        
    });
    cells.forEach(function(element, index) {        //populate cells with buttons
        const newButton = document.createElement("button");
        newButton.style.width = "100%";
        newButton.style.height = "100%";
        newButton.style.background = "darkgray";
        cells[index].innerHTML = "";
        cells[index].appendChild(newButton);
        //cells[index].innerHTML = "<button></button>";
        //console.log(element.innerHTML === cells[0].innerHTML);
        gameRunning = true;
        //console.log(gameRunning);

    });
    //cells[0].innerHTML = "calamardo";
    console.log(cellState);
}
function gameLost(index) {

}
function gameWon() {

}
function calculateAdjacent(index) {
    const adjacentCells = new Set();
    let adjacentMines = 0;
    adjacentCells.add(index-11);
    adjacentCells.add(index-10);
    adjacentCells.add(index-9);
    adjacentCells.add(index-1);
    adjacentCells.add(index+1);
    adjacentCells.add(index+9);
    adjacentCells.add(index+10);
    adjacentCells.add(index+11);
    if(index%10 === 0) {
        adjacentCells.delete(index-11);
        adjacentCells.delete(index-1);
        adjacentCells.delete(index+9);
    }
    if(index%10 === 9) {
        adjacentCells.delete(index-9);
        adjacentCells.delete(index+1);
        adjacentCells.delete(index+11);
    }
    if(index < 10) {
        adjacentCells.delete(index-11);
        adjacentCells.delete(index-10);
        adjacentCells.delete(index-9);
    }
    if(index > 89) {
        adjacentCells.delete(index+9);
        adjacentCells.delete(index+10);
        adjacentCells.delete(index+11);
    }
    for(const value of adjacentCells) {
        if(cellState[value] === "x") adjacentMines ++;
    }
    return adjacentMines;}