const gameBoard = (function() {
    const board = ["", "", "",
                   "", "", "",            
                   "", "", ""];

    return { board };
})();

const player = function(name, symbol) {
    
    return { name, symbol };
}