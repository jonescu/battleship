// Get html elements
const game_pieces_container = document.querySelector('.pieces-container')
const gameboards_container = document.querySelector('.gameboards-container')
const game_pieces = Array.from(game_pieces_container.children)
const startButton = document.querySelector('#start-btn')
const width = 10

// Rotate pieces
let rotation = 0
game_pieces.forEach(piece => {
  piece.addEventListener('click', rotate)
})

function rotate() {
  rotation = rotation === 0 ? 90 : 0
  game_pieces.forEach(piece => {
    piece.style.transform = `rotate(${rotation}deg)`
  })
}

// Create game boards, assign unique id for player or computer
function createBoard(user) {
  const gameboard_container = document.createElement('div')
  gameboard_container.classList.add('game-board')
  gameboard_container.id = user
  gameboards_container.appendChild(gameboard_container)
  
  for(let i = 0; i < width * width; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.id = i
    gameboard_container.appendChild(cell)
  }
}

createBoard('player')
createBoard('computer')

// Create ships 
function createShip(name, length) {
  return {
    name: name,
    length: length
  }
}

const destroyer = createShip('destroyer', 4)
const battleship = createShip('battleship', 3)
const submarine = createShip('submarine', 3)
const patrol = createShip('patrol', 2)
const carrier = createShip('carrier', 5)

const ships = [carrier, destroyer, battleship, submarine, patrol]
let notDropped

function getValidity(board_cells, horizontal, startIndex, ship) {
  let validCell
  let cellsToOccupy = []

  // Make sure ships don't over flow outside the board
  if (horizontal) {
    // Check horizontal
    if (startIndex <= width * width - ship.length) {
      validCell = startIndex
    } else {
      validCell = width * width - ship.length
    }
    // Check vertical
  } else {
    if (startIndex <= width * width - width * ship.length) {
      validCell = startIndex
    } else {
      validCell = startIndex - ship.length * width + width
    }
  }
  
  for(let i = 0; i<ship.length; i++) {
    // Occupy horizontal
    if(horizontal) {
      cellsToOccupy.push(board_cells[+validCell + i])
    }
    // Occupy vertical
    else {
      cellsToOccupy.push(board_cells[+validCell + i * 10])
    }
  }

  // Check for ships crossing each other and ships overflowing to next row
  let valid
  
  if(horizontal) {
    cellsToOccupy.every((cell,index) => 
      valid = cellsToOccupy[0].id % width !== width - (cellsToOccupy.length - (index +1)))
    } else {
    cellsToOccupy.every((cell, index) => 
      valid = cellsToOccupy[0].id < 90 + (width * index + 1)
    )
  }

  const notOccupied = cellsToOccupy.every(cell => !cell.classList.contains('occupied'))

  return { cellsToOccupy, valid, notOccupied }
}

// Place ships randomly on enemy board
function placeShips(user, ship, startId) {
  const board_cells = document.querySelectorAll(`#${user} div`)
  // Randomly vertical or horizontal
  let horizontal = user === 'player' ? rotation === 0 : Math.random() < 0.5
  let randomCell = Math.floor(Math.random() * width * width)  
  let startIndex = startId ? startId : randomCell

  const { cellsToOccupy, valid, notOccupied } = getValidity(board_cells, horizontal, startIndex, ship)
 
  if(valid && notOccupied) {
    cellsToOccupy.forEach(cell => {
      cell.classList.add(ship.name)
      cell.classList.add('occupied')
    })
  } else {
    if(user === 'computer') placeShips('computer', ship, startId)
    if(user === 'player') notDropped = true
  }
}

ships.forEach(ship => placeShips('computer', ship))

// Implement drag & drop
let dragged

const player_pieces_array = Array.from(game_pieces_container.children)

player_pieces_array.forEach(piece => {
  piece.addEventListener('dragstart', dragStart)
})

const player_cells = document.querySelectorAll('#player div')
player_cells.forEach(cell => {
  cell.addEventListener('dragover', dragOver)
  cell.addEventListener('drop', drop)
})

function dragStart(e) {
  notDropped = false
  dragged = e.target
}

function dragOver(e) {
  e.preventDefault()
  const ship = ships[dragged.id]
  previewDrop(e.target.id, ship)
}

function drop(e) {
  const startId = e.target.id
  const ship = ships[dragged.id]
  placeShips('player', ship, startId)
  if(!notDropped) {
    dragged.remove()
  }
}

// Add preview drop
function previewDrop(startIndex, ship) {
  const allBoardCells = document.querySelectorAll('#player div')
  let horizontal = rotation === 0

  const { cellsToOccupy, valid, notOccupied } = getValidity(allBoardCells, horizontal, startIndex, ship)

  if(valid && notOccupied) {
    cellsToOccupy.forEach(cell => {
      cell.classList.add('hover')
      setTimeout(() => cell.classList.remove('hover'), 200)
    })
  }
}

// Game logic
let gameOver = false
let playerTurn

// Start game
function startGame() {
  if(game_pieces_container.children.length != 0) {
    alert('Please place all of your ships')
  } else {
    const allBoardCells = document.querySelectorAll('#computer div')
    allBoardCells.forEach(cell => cell.addEventListener('click', attack))
  }
}


function attack(e) {
  if(!gameOver) {
    if(e.target.classList.contains('occupied')) {
      attackMessage(e, 'hit')
    } else {
      attackMessage(e, 'miss')
   }
  } 
}

function attackMessage(e, message) {
  e.target.classList.add(message)
  const messageElement = document.createElement('h1')
  messageElement.textContent = `${message}`
  messageElement.classList.add(`${message}-message`)
  gameboards_container.append(messageElement)
  setTimeout(() => messageElement.remove(), 1000)
}

startButton.addEventListener('click', startGame)