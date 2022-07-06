import { shipFactory } from "./ship"

export const gameBoard = (function() {
    const playerBoard = document.querySelector('.player-board')
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
        receiveAttack: (coor0, coor1) => {
        }
    }
})()

