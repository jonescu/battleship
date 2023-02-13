function createShip(length) {
  return {
    length, 
    hits: 0, 
    isSunk: false,
    hit() {
      this.hits++
    },
    isSunk() {
      if(this.length === this.hits) {
        this.isSunk = true
      }
    }
  }
}

function gameBoard() {
  const ships = []
  const missedAttacks = []

  return {
    recieveAttack(x, y) {
      for (const ship of ships) {
        for (const coord of ship.coords) {
          if (coord[0] === x && coord[1] === y) {
            ship.hit()
            return
          }
        }
      }
      missedAttacks.push([x, y])
    }, 

    allShipsSunk() {
      for (const ship of ships) {
        if (!ship.isSunk) {
          return false
        }
      }
      return true
    },

    placeShip(ship, x, y, isVertical) {
      const coords = []
      for (let i = 0; i < ship.length; i++) {
        if (isVertical) {
          coords.push([x, y + i])
        } else {
          coords.push([x + i, y])
        }
      }
      ship.coords = coords
      ships.push(ship)
      console.log(coords)
    }
  }
}


export { gameBoard, createShip }

