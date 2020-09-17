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

const game = (function() {
    return {};
})();



if ((gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[0] === gameBoard.board[2] && 
    gameBoard.board[0] != "") || 
    (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[3] === gameBoard.board[5] && 
    gameBoard.board[3] != "") || 
    (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[6] === gameBoard.board[8] && 
    gameBoard.board[6] != "") || 

    (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[0] === gameBoard.board[6] && 
    gameBoard.board[0] != "") || 
    (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[1] === gameBoard.board[7] && 
    gameBoard.board[6] != "") || 
    (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[2] === gameBoard.board[8] && 
    gameBoard.board[2] != "") ||

    (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[0] === gameBoard.board[8] && 
    gameBoard.board[0] != "") || 
    (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[2] === gameBoard.board[6] && 
    gameBoard.board[2] != "")) {
        alert ("You win!");
    };




// Logic below for rendering game board should be able to go inside gameBoard module potentially? Or a displayController module?
const boardSquares = document.querySelectorAll(".board__square");
const updateBtn = document.querySelector(".button--update");


boardSquares.forEach(function(square) {
    square.addEventListener('click', function(e) {
        console.log(e.target.getAttribute("data-id"));
        gameBoard.board[e.target.getAttribute("data-id")] = "X";
        render(gameBoard.board, boardSquares);

    });
});


updateBtn.addEventListener('click', () => render(gameBoard.board, boardSquares));


const render = function(array, targetDivs) {
    for (let i = 0; i < array.length; i++) {
        console.log(targetDivs[i].getAttribute("data-id"));
        targetDivs[i].textContent = array[i];
    }
    return ("done");
}