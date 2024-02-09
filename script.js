
//constants and variables
let coveredCells = 100;
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
    newGame();
});

playingField.addEventListener("click",function(evt) {
    if(evt.target.tagName !== "BUTTON") return;  //make sure its a button
    if(!gameRunning) return;            // game is running?
    const index = evt.target.parentElement.id.slice(1);
    if(cellState[index] === "x") {      //check if its a mine
        gameLost(index);
        return;
    }

    if(cellState[index] === 0) {
        clearEmpty(index);
    }
    else {
        const newH1 = document.createElement("h1");
        newH1.style.width = "100%";
        newH1.style.height = "100%";
        newH1.innerText = cellState[index];
        cells[index].innerHTML = "";
        coveredCells --;
        cells[index].appendChild(newH1);
    }
    updateState();
});

//functions

function newGame() {
    coveredCells = 100;
    cellState.forEach(function(element, index) { //clear the board
        cellState[index] = 0;                   
    });
    mineCounter.value = 0;                      // reset counter
    let numberOfMines = 0;                      // reset variable
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
        calculateAdjacent(index);
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

    });
    coveredCells = 100 - mineCounter.value;
}
function gameLost(dex) {
    cellState.forEach(function(element, index) {
        if(element === "x")cells[index].innerHTML = "💣"
    });
    cells[dex].innerHTML = "💥";
    gameRunning = false;
}
function gameWon() {
    cellState.forEach(function(element, index) {
        if(element === "x")cells[index].innerHTML = "🥳"
    });
    gameRunning = false;
}
function updateState() {
    if(coveredCells === 0) {
        gameRunning = false;
        gameWon();
    }
}
function calculateAdjacent(index) {
    index = parseInt(index);
    let adjacentCells = new Set();
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
        if(cellState[value] === "x") {adjacentMines ++;
        }
    }
    cellState[index] = adjacentMines;
    return adjacentCells;
}
function clearEmpty(index) {
    if(cellState[index] !== "x" & 
        cellState[index] === 0 & cells[index].innerHTML !== "")
        coveredCells --;
    cells[index].innerHTML = "";
    let adjacent = calculateAdjacent(index);
    adjacent.forEach(element => {
        if(cellState[element] === "x" || 
        cellState[element] !== 0 || cells[element].innerHTML === "")
        adjacent.delete(element);
    });
    adjacent.forEach(element => clearEmpty(element));
    updateState();
    
}

function boardTest() {
    for(let i= 0; i < cellState.length; i++) {
            if(cellState[i] === "x") continue;
            cells[i].innerHTML = i;
    }
}