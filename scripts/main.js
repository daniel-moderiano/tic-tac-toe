const gameBoard = (function() {
    const board = ["", "", "",
                   "", "", "",            
                   "", "", ""];

    const boardSquares = document.querySelectorAll(".board__square");

        
    const render = function() {
        for (let i = 0; i < board.length; i++) {
            boardSquares[i].textContent = board[i];
        }
        return ("done");
    };

   
    const clearBoard = function() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

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
        } else {
            return false;
        }
    }

    const checkTie = function() {
        if (board.includes("")) {
            return false;
        } else if (!checkWin()){
            return true;
        }
    }

    return { board, boardSquares, render, clearBoard, checkWin, checkTie };           
})();

const player = function(name, symbol) {
    const _playerNameCapitalise = (name) => name.toUpperCase();
    const playerNameDisplay = () => console.log(_playerNameCapitalise(name));
    return { name, symbol, playerNameDisplay };
};

const game = (function() {
    return {};
})();


const turnTracker = () => {
    let turn = 0;
    return () => {
        console.log(turn);
        if (turn === 0) {
            turn = 1;
        } else {
            turn = 0;
        }
    };
};

let currentTurn = turnTracker();

// Logic below for rendering game board should be able to go inside gameBoard module potentially? Or a displayController module?

// Displaycontroller module is probably better suited to contain the buttons to update/clear board.
// const boardSquares = document.querySelectorAll(".board__square");
const updateBtn = document.querySelector(".button--update");
const clearBtn = document.querySelector(".button--clear");


gameBoard.boardSquares.forEach(function(square) {
    square.addEventListener('click', function(e) {
        gameBoard.board[e.target.getAttribute("data-id")] = "X";
        gameBoard.render();
        if (gameBoard.checkWin()) {
       
            console.log("You win!");
            gameBoard.clearBoard();
            // render(gameBoard.board, boardSquares);
        }
        
    });
});


updateBtn.addEventListener('click', () => gameBoard.render());

clearBtn.addEventListener('click', () => {
    gameBoard.clearBoard();
    gameBoard.render();
});

