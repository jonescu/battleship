// Select the grid and all game pieces
const player_grid = document.querySelector('#player-grid')
const enemy_grid = document.querySelector('#enemy-grid')
const ships_container = document.querySelector('#game-pieces')
const player_ships = document.querySelectorAll('.game-piece')

// Create the player grid
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 10; col++) {
    // Create a new div element for the grid cell
    const cell = document.createElement("div")
    cell.classList.add('grid-cell')
    // Check if the cell is an edge piece
    if (row === 0 || col === 0 || row === 9 || col === 9) {
      // Set a unique identifier for the edge pieces
      cell.id = `edge-${row}-${col}`;
    }
    // Add the cell to the container
    player_grid.appendChild(cell)
  }
}

// Create enemy grid
for (let i = 0; i < 100; i++) {
  const enemy_cell = document.createElement('div')
  enemy_cell.classList.add('enemy-cell')
  enemy_cell.id = `${i}`
  enemy_grid.appendChild(enemy_cell)
}

// Get all grid cells
const grid_cells = player_grid.querySelectorAll('.grid-cell')
const enemy_cells = enemy_grid.querySelectorAll('.enemy-cell')

// Implement drag & drop functionality
player_ships.forEach(ship => {
  ship.addEventListener('dragstart', dragStart)
  ship.addEventListener('click', (e) => {
   const shipToRotate = e.target.parentElement
   shipToRotate.classList.toggle('vertical')
  })
})

grid_cells.forEach(cell => {
  cell.addEventListener('drop', drop)
  cell.addEventListener('dragover', dragOver)
})

function dragStart(e) {
  // Store the IDs of the game piece and its sub-pieces in the dataTransfer object
  const pieceId = e.target.id
  const subPieceIds = Array.from(e.target.querySelectorAll('.sub-piece')).map(subPiece => subPiece.id)
  e.dataTransfer.setData('text/plain', JSON.stringify({ pieceId, subPieceIds }))
}

function dragOver(e) {
  e.preventDefault()
}

function drop(e) {
  e.preventDefault()
  const { pieceId, subPieceIds } = JSON.parse(e.dataTransfer.getData('text/plain'))
  const gamePiece = document.getElementById(pieceId)
  const gamePieceSize = subPieceIds.length
  const dropTarget = e.target.closest('.grid-cell')

  // Check that the drop target has enough cells to accommodate the game piece 
  const cells = Array.from(dropTarget.parentElement.querySelectorAll('.grid-cell'))
  const cellIndex = Array.from(cells).indexOf(dropTarget)

  // Prevent pieces from being placed directly next to one another
  let cellsToCheck = cells.slice(cellIndex - 1, cellIndex + gamePieceSize + 1)
  const rowsToCheck = []

  // Allows user to place piece on left side of board without piece wrapping to line above
  if (+cellIndex.toString().slice(1) === 0) {
    cellsToCheck = cells.slice(cellIndex, cellIndex + gamePieceSize + 1)
  }

  for (let i = 0; i < cellsToCheck.length - 1; i++) {
    if (cellsToCheck[i].id != '') {
      rowsToCheck.push(+cellsToCheck[i].id.slice(5, 6))
    }
  }

  // Allows user to place piece on left side of board when a piece occupies the furthest right cell one row above
  if (+cellsToCheck.at(-1).id.slice(5,6) !== cellsToCheck.at(-2).id.slice(5,6) &&
  cellsToCheck.at(-1).classList.contains('occupied')) {
    cellsToCheck.pop()
  }
  
  // Check if cells aren't occupied, or on different rows
  if (cellsToCheck.every(cell => !cell.classList.contains('occupied')) &&
    rowsToCheck.every(row => row === rowsToCheck[0])) {
    // Occupy the cells with the game piece and its sub-pieces
    dropTarget.classList.add('occupied')
    for (let i = 0; i < gamePieceSize; i++) {
      cells[cellIndex + i].classList.add('occupied')
    }
    gamePiece.style.display = 'none'
  }
}

// Add red background
enemy_cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.style.backgroundColor = 'red'
    cell.classList.add(' ')
  })
})

