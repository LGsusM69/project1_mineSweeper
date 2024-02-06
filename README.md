This program is a minesweeper game.
The point of the game is to clear the whole field of any mines by uncovering all the cells not containing mines and marking the cells with mines.
The cells can be blank, they can have a number from 1 to 8, or they can have a mine.
For the cells with numbers, the number is defined by how many mined cells are adjacent to it.

![Minesweeper_wireframe](https://github.com/LGsusM69/project1_mineSweeper/assets/156034147/00d86fca-1996-44c0-b0ba-cde82badfa3e)


first thing to do is set up an html file with the main elements needed on screen.
Just a few buttons and playing field.
then linkl an external css stylesheet and an external javascript file to it.

all the logic of the game and the automation or animation will be done in the javascript file.
 
Next step after setting up the files is to add variables needed for the game.
some of the variables are:
	difficulty // could be a string
	numberOfMines // int
	cellCovered // boolean
	gameWon //boolean
	
Next step would be to actionListeners to the buttons and the playing field

after that some functions have to be implemented. Some of them are

	newGame()
	updateState()
	draw()
	gameWon()
	game active()
	setNumberOfMines()
Once done implemented the required functions debug
Done.

