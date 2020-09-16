const gameBoard = (function() {
    const board = ["X", "X", "O",
                   "X", "O", "O",            
                   "O", "X", "X"];

    return { board };           
})();

const player = function(name, symbol) {
    const _playerNameCapitalise = (name) => name.toUpperCase();
    const playerNameDisplay = () => console.log(_playerNameCapitalise(name));
    return { name, symbol, playerNameDisplay };
}   

const boardSquares = document.querySelectorAll(".board__square");


const render = function(array, targetDivs) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        targetDivs[i].textContent = array[i];
    }
    return ("done");
}