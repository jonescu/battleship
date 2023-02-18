// import {gameBoard, createShip} from './factories.js';
// Select the grid and all game pieces
const player_grid = document.querySelector('#player-grid')
const enemy_grid = document.querySelector('#enemy-grid')
const ships_container = document.querySelector('#game-pieces')
const player_ships = document.querySelectorAll('.game-piece')
// Create the grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div')
  cell.classList.add('grid-cell')
  player_grid.appendChild(cell)
}

for(let i = 0; i< 100; i++) {
  const enemy_cell = document.createElement('div')
  enemy_cell.classList.add('enemy-cell')
  enemy_grid.appendChild(enemy_cell)
}

const grid_cells = player_grid.querySelectorAll('.grid-cell')

// Implement drag & drop functionality
player_ships.forEach(ship => {
  ship.addEventListener('dragstart', dragStart)
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

function dragOver(e) {
  e.preventDefault();
  // console.log('over')
}

function drop(e) {
  e.preventDefault();
  const {pieceId, subPieceIds} = JSON.parse(e.dataTransfer.getData('text/plain'))
  const gamePiece = document.getElementById(pieceId)
  const gamePieceSize = subPieceIds.length
  const dropTarget = e.target.closest('.grid-cell')
  // Check that the drop target has enough cells to accommodate the game piece
  const cells = Array.from(dropTarget.parentElement.querySelectorAll('.grid-cell'))
  const cellIndex = Array.from(cells).indexOf(dropTarget)
  const cellsToCheck = cells.slice(cellIndex, cellIndex + gamePieceSize)
  if (cellsToCheck.every(cell => !cell.classList.contains('occupied'))) {
    // Occupy the cells with the game piece and its sub-pieces
    dropTarget.classList.add('occupied')
    for (let i = 0; i < gamePieceSize; i++) {
      cells[cellIndex + i].classList.add('occupied')
    }
    gamePiece.style.display = 'none'
    gamePiece.previousElementSibling.style.display = 'none'
  }
}


