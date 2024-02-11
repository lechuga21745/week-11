/* here i set the elements board restart status of the game and 
who's turn
*/

const board = document.getElementById('board');
const restartButton = document.getElementById('restart-btn');
const status = document.getElementById('status');
const turnDisplay = document.getElementById('turn');

/* have the current player header and the emptyy array to be able to start
clean slate 
also to see if the game is still going
*/

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

/* here is the different ways you can win */

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// this is how we know when a grid has been selected and what goes in

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  // if  there is somethiing in a grid then the game is active 
  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  // check if game is active after each click

  // also keeps track of who's turn it is
  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// this is how we figure out if we have a winner


function checkWin() {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      status.textContent = `${currentPlayer} wins!`;
      return;
    }
  }
}

// this checks if a draw has occured
function checkDraw() {
  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

//ths is how we get the restart button to work and what happens when clicked

function handleRestart() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.textContent = '';
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}


// this is clicking the restart button S
board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', handleRestart);
