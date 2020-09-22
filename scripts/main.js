const gameBoard = (function() {
    const board = ["", "", "",
                   "", "", "",            
                   "", "", ""];

    const boardSquares = document.querySelectorAll(".board__square");

        
    const render = function() {
        for (let i = 0; i < board.length; i++) {
            boardSquares[i].textContent = board[i];
        }
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

const Player = function(name, marker) {
    const _playerNameCapitalise = (name) => name.toUpperCase();
    const playerNameDisplay = () => console.log(_playerNameCapitalise(name));

    const placeMarker = (event) => {
        let squareSelected = event.target.getAttribute("data-id");
        gameBoard.board[squareSelected] = marker;
    };

    return { name, marker, playerNameDisplay, placeMarker };
};

const player1 = Player('Dan', "X");

const player2 = Player('Sam', "O");


// The currentTurn method should be called and not the turn property. Currently the turn property has been left public in case it needs to be reassigned to zero for a game reset, however this will end up being a separate method and so will switch to private later
const game = (function() {
    let turn = 0;
    // For single player, the comp should be assigned as player2
    const players = [player1, player2];
    
    const changeTurn = () => {
        turn++;
        if (turn === players.length) {
            turn = 0;
        }
    };

    const currentTurn = function() {
        return(turn);
    };

    const currentPlayer = function() {
        return players[turn];
    }

    const resetGame = function() {
        turn = 0;
    }
  
    const playTurn = () => {
        console.log(`${currentPlayer().name} places ${currentPlayer().marker}`);
        changeTurn();
        
        return "Turn complete";
    };

    return { playTurn, players, changeTurn, currentTurn, turn, currentPlayer, resetGame };
})();




// Logic below for rendering game board should be able to go inside gameBoard module potentially? Or a displayController module?

// Displaycontroller module is probably better suited to contain the buttons to update/clear board.
// const boardSquares = document.querySelectorAll(".board__square");
const updateBtn = document.querySelector(".button--update");
const clearBtn = document.querySelector(".button--clear");

const placeMarker = (event) => {
    let squareSelected = event.target.getAttribute("data-id");
    gameBoard.board[squareSelected] = "X";
};

// Create this function in the game module as a 'playTurn' type function
gameBoard.boardSquares.forEach(function(square) {
    square.addEventListener('click', game.currentPlayer().placeMarker);
    square.addEventListener('click', function() {
        game.playTurn();
        gameBoard.render();
    });
    square.addEventListener('click', function() {
        if (gameBoard.checkWin()) {
       
            console.log("You win!");
            gameBoard.clearBoard();
            // render(gameBoard.board, boardSquares);
        }
        
    });
    
});

const targetDisplay = (event) => console.log(event.target);

updateBtn.addEventListener('click', targetDisplay);

clearBtn.addEventListener('click', () => {
    gameBoard.clearBoard();
    gameBoard.render();
    game.resetGame();
});

