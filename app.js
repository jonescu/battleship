import {gameBoard, createShip} from './factories.js';

const gameboard = gameBoard()
// Select the grid and all game pieces
const grid = document.querySelector('.grid');
const gamePieces = document.querySelectorAll('.game-piece');

// Create the grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement('div')
  grid.appendChild(cell)
}

