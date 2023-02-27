// Get html elements
const game_pieces_container = document.querySelector('.pieces-container')
const gameboards_container = document.querySelector('.gameboards-container')
const game_pieces = Array.from(game_pieces_container.children)
const width = 10

// Rotate pieces
let rotation
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

// Place ships randomly on enemy board
function placeEnemyPieces(ship) {
  const allBoardCells = document.querySelectorAll('#computer div')
  // Randomly vertical or horizontal
  let horizontal = Math.random() < 0.5
  let randomCell = Math.floor(Math.random() * width * width)  
  // let validCell
  let cellsToOccupy = []
  
  // Make sure ships don't over flow outside the board
  if (horizontal) {
    if (randomCell <= width * width - ship.length) {
      validCell = randomCell;
    } else {
      validCell = width * width - ship.length;
    }
    //Check vertical
  } else {
    if (randomCell <= width * width - width * ship.length) {
      validCell = randomCell;
    } else {
      validCell = width * width - width * ship.length;
    }
  }

  for(let i = 0; i<ship.length; i++) {
    // Occupy horizontal
    if(horizontal) {
      cellsToOccupy.push(allBoardCells[+validCell + i])
    }
    // Occupy vertical
    else {
      cellsToOccupy.push(allBoardCells[+validCell + i * 10])
    }
  }
  
  cellsToOccupy.forEach(cell => {
    cell.classList.add(ship.name)
    cell.classList.add('occupied')
  })
}

ships.forEach(ship => placeEnemyPieces(ship))