import {gameBoard, createShip} from './factories.js';

// Select the grid and all game pieces
const grid = document.querySelector('.grid');
const pieces_container = document.querySelector('#game-pieces')

// Create the grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div')
  cell.classList.add('grid-cell')
  grid.appendChild(cell)
}

const pieces = [
  {
    name: 'carrier',
    size: 5
  },
  {
    name: 'destroyer',
    size: 4
  },
  {
    name: 'battleship',
    size: 3
  },
  {
    name: 'submarine',
    size: 3
  },
  {
    name: 'patrol-boat',
    size: 2
  }
]

// Create the game pieces 
pieces.forEach(piece => {
  const piece_div = document.createElement('div')
  piece_div.classList.add(`${piece.name}`)
  piece_div.style.display = 'flex'
  piece_div.setAttribute('draggable', 'true')

  for(let i = 0; i<piece.size; i++) {
    const piece = document.createElement('div')
    piece.className = 'game-piece'
    piece_div.appendChild(piece)
    pieces_container.appendChild(piece_div)
  }
})


