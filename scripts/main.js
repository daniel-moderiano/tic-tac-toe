const gameBoard = (function() {
    const board = ["", "", "",
                   "", "", "",            
                   "", "", ""];
    
    const clearBoard = function() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    const checkWin = function() {
        if ((board[0] === board[1] && board[0] === board[2] && board[0] != "") || 
            (board[3] === board[4] && board[3] === board[5] && board[3] != "") || 
            (board[6] === board[7] && board[6] === board[8] && board[6] != "") || 
        
            (board[0] === board[3] && board[0] === board[6] && board[0] != "") || 
            (board[1] === board[4] && board[1] === board[7] && board[7] != "") || 
            (board[2] === board[5] && board[2] === board[8] && board[2] != "") ||
        
            (board[0] === board[4] && board[0] === board[8] && board[0] != "") || 
            (board[2] === board[4] && board[2] === board[6] && board[2] != "")) {
                return true;
        }
    }
    

    return { board, clearBoard, checkWin };           
})();

const player = function(name, symbol) {
    const _playerNameCapitalise = (name) => name.toUpperCase();
    const playerNameDisplay = () => console.log(_playerNameCapitalise(name));
    return { name, symbol, playerNameDisplay };
}   

const game = (function() {
    return {};
})();


const checkWin = function() {
    if ((gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[0] === gameBoard.board[2] && 
        gameBoard.board[0] != "") || 
        (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[3] === gameBoard.board[5] && 
        gameBoard.board[3] != "") || 
        (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[6] === gameBoard.board[8] && 
        gameBoard.board[6] != "") || 
    
        (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[0] === gameBoard.board[6] && 
        gameBoard.board[0] != "") || 
        (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[1] === gameBoard.board[7] && 
        gameBoard.board[7] != "") || 
        (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[2] === gameBoard.board[8] && 
        gameBoard.board[2] != "") ||
    
        (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[0] === gameBoard.board[8] && 
        gameBoard.board[0] != "") || 
        (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[2] === gameBoard.board[6] && 
        gameBoard.board[2] != "")) {
            return true;
    }
}







// Logic below for rendering game board should be able to go inside gameBoard module potentially? Or a displayController module?
const boardSquares = document.querySelectorAll(".board__square");
const updateBtn = document.querySelector(".button--update");


boardSquares.forEach(function(square) {
    square.addEventListener('click', function(e) {
        gameBoard.board[e.target.getAttribute("data-id")] = "X";
        render(gameBoard.board, boardSquares);
        if (gameBoard.checkWin()) {
       
            console.log("You win!");
            gameBoard.clearBoard();
            // render(gameBoard.board, boardSquares);
        }
        
    });
});


updateBtn.addEventListener('click', () => render(gameBoard.board, boardSquares));


const render = function(array, targetDivs) {
    for (let i = 0; i < array.length; i++) {
        targetDivs[i].textContent = array[i];
    }
    return ("done");
}