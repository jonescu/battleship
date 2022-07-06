import { drop } from "lodash"
import { shipFactory } from "./ship"

const playerBoard = document.querySelector('.player-board')
const computerBoard = document.querySelector('.computer-board')

export const gameBoard = (function() {
    return {
        createPlayerBoard: function(){
            const board = 100
            for(let i = 0; i<board; i++) {
                const newDiv = document.createElement('div')
                newDiv.classList.add('player-square')
                newDiv.id = `square-${i}`
                playerBoard.appendChild(newDiv)
            }
        },

        createComputerBoard: function(){
            const board = 100
            for(let i = 0; i<board; i++) {
                const newDiv = document.createElement('div')
                newDiv.classList.add('ai-square')
                newDiv.id = `square-${i}`
                computerBoard.appendChild(newDiv)
            }
        },

        setCurrentShip: function(){
            let count = 0
            const currentShip = shipsArray[count]
            count++
            return currentShip
        },

        getCurrentShip: () => {
            return gameBoard.setCurrentShip()
        },

        receiveAttack: (coor0, coor1) => {
        }
    }
})()

const shipsArray = [
     {
        name: 'carrier',
        length: 5
    },
    {
        name: 'battleship',
        length: 4
    },
    {
        name: 'destroyer',
        length: 3
    },
    {
        name: 'submarine',
        length: 3
    },
    {
        name: 'patrol',
        length: 2
    }
]

