const game_pieces_container = document.querySelector('.pieces-container')
const gameboards_container = document.querySelector('.gameboards-container')
const game_pieces = Array.from(game_pieces_container.children)

// Rotate pieces
game_pieces.forEach(piece => {
  piece.addEventListener('click', (e) => {
    if(!e.target.classList.contains('horizontal')) {
      e.target.classList.add('horizontal')
    } else {
      e.target.classList.remove('horizontal')
    }
  })
})


// Create game boards

function createBoard(user) {
  const gameboard_container = document.createElement('div')
  gameboard_container.classList.add('game-board')
  gameboard_container.id = user
  gameboards_container.appendChild(gameboard_container)
  
  for(let i = 0; i < 100; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.id = i
    gameboard_container.appendChild(cell)
  }
}

createBoard('player')
createBoard('computer')