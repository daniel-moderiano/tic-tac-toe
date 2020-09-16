const gameBoard = (function() {
    const board = ["", "", "",
                   "", "", "",            
                   "", "", ""];

    return { board };
})();

const player = function(name, symbol) {
    const _playerNameCapitalise = (name) => name.toUpperCase();
    const playerNameDisplay = () => console.log(_playerNameCapitalise(name));
    return { name, symbol, playerNameDisplay };
}   