// Select the grid and all game pieces
const grid = document.querySelector('.grid');
const gamePieces = document.querySelectorAll('.game-piece');

// Create the grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div')
  grid.appendChild(cell)
}

function createShip(length, numOfHits, isSunk) {
  return {
    length, 
    numOfHits, 
    isSunk,
    hit() {
      numOfHits++
    },
    isSunk() {
      if(this.length === this.numOfHits) {
        this.isSunk = true
      }
    }
  }
}

// // Variables to keep track of the current game piece being dragged and its orientation
// let currentPiece;
// let currentOrientation = 'horizontal';

// // Allow game pieces to be dropped onto the grid
// grid.addEventListener('dragover', (e) => {
//   e.preventDefault();
// });

// // Handle the drag start event for game pieces
// gamePieces.forEach(gamePiece => {
//   gamePiece.addEventListener('dragstart', (e) => {
//     currentPiece = e.target;
//     currentOrientation = 'horizontal'; // or 'vertical'
//     e.dataTransfer.setData('text/plain', currentPiece.id);
//   });
// });

// // Handle the drop event for game pieces onto the grid
// grid.addEventListener('drop', (e) => {
//   e.preventDefault();
  
//   // Get the id of the game piece being dropped
//   const pieceId = e.dataTransfer.getData('text/plain');
//   const piece = document.querySelector(`#${pieceId}`);
//   const pieceSize = piece.dataset.size;

//   // Check if the placement of the game piece is valid
//   const cell = e.target;
  
//   // Place the game piece on the board
//   cells.forEach(c => c.appendChild(piece));
// });
