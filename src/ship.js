// ship factory 
export const shipFactory = (function(length, shipName){

    return {
        shipName: shipName,
        length: null,
        hits: [],
        sunk: null,

        hit: function(x,y) {
           shipFactory.hits.push([x,y])
           return shipFactory.hits
        },
        isSunk: function(){
            if(shipFactory.length === shipFactory.hits.length) {
                shipFactory.sunk = true
                return shipFactory.sunk
            }
        }
    }
})()


