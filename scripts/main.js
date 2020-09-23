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
    // const getName = () => name;
    // const getMarker = () => marker;
    const placeMarker = (event) => {
        let squareSelected = event.target.getAttribute("data-id");
        gameBoard.board[squareSelected] = marker;
    };

    return { playerNameDisplay, name, marker, placeMarker };
};

const player1 = Player('Dan', "O");

const player2 = Player('Sam', "X");

players = [player1, player2];

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

    // Consider abstraction to playTurn function below; not a great deal of functions and adds perhaps needless step.
  
    // const playTurn = (e) => {
    //     console.log(`${currentPlayer().name} places ${currentPlayer().marker}`);
    //     currentPlayer().placeMarker(e);
    //     changeTurn();
        
    //     return "Turn complete";
    // };

    return { players, changeTurn, currentTurn, turn, currentPlayer, resetGame };
})();




// Logic below for rendering game board should be able to go inside gameBoard module potentially? Or a displayController module?

// Displaycontroller module is probably better suited to contain the buttons to update/clear board.
// const boardSquares = document.querySelectorAll(".board__square");
const updateBtn = document.querySelector(".button--update");
const clearBtn = document.querySelector(".button--clear");


// Create this function in the game module as a 'playTurn' type function
gameBoard.boardSquares.forEach(function(square) {
    square.addEventListener('click', function(e) {
        console.log(game.currentPlayer().marker);
        game.currentPlayer().placeMarker(e);
        game.changeTurn();
        gameBoard.render();
    });
    

    square.addEventListener('click', function(e) {

        
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

