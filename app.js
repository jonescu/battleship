// import {gameBoard, createShip} from './factories.js';
// Select the grid and all game pieces
const player_grid = document.querySelector('#grid')
const ships_container = document.querySelector('#game-pieces')
const player_ships = document.querySelectorAll('.game-piece')
// Create the grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div')
  cell.classList.add('grid-cell')
  player_grid.appendChild(cell)
}

const grid_cells = player_grid.querySelectorAll('.grid-cell')

// Implement drag & drop functionality
player_ships.forEach(ship => {
  ship.addEventListener('dragstart', dragStart)
  ship.addEventListener('dragenter', dragEnter)
})

grid_cells.forEach(cell => {
  cell.addEventListener('drop', drop)
  cell.addEventListener('dragover', dragOver);
})

function dragStart(e) {
  // Store the IDs of the game piece and its sub-pieces in the dataTransfer object
  const pieceId = e.target.id
  const subPieceIds = Array.from(e.target.querySelectorAll('.sub-piece')).map(subPiece => subPiece.id)
  e.dataTransfer.setData('text/plain', JSON.stringify({pieceId, subPieceIds}))
}

function dragEnter(e) {
  e.preventDefault()
  console.log('enter')
}

function dragOver(e) {
  e.preventDefault();
  console.log('over')
}

function drop(e) {
  e.preventDefault();
  // Get the IDs of the dropped game piece and its sub-pieces from the dataTransfer object
  const {pieceId, subPieceIds} = JSON.parse(e.dataTransfer.getData('text/plain'));
  // Get the dropped game piece element
  const gamePiece = document.getElementById(pieceId);
  // Move the game piece to the drop target
  e.target.appendChild(gamePiece);
  // Move the sub-pieces of the dropped game piece to the drop target
  subPieceIds.forEach(subPieceId => {
    const subPiece = document.getElementById(subPieceId);
    e.target.appendChild(subPiece);
  });
}

