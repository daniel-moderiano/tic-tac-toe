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

    const clearColours = function() {
        boardSquares.forEach(function(square) {
            if (square.classList.contains("board__square--coloured")) {
                square.classList.toggle("board__square--coloured");
            }
        });
    };

    const checkOccupied = function(event) {
        let squareSelected = event.target.getAttribute("data-id");
        if (board[squareSelected] === "") {
            return false;
        } else {
            return true;
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

    const findWinner = () => {
        switch(true) {
            case (board[0] === board[1] && board[0] === board[2] && board[0] != ""):
                console.log("Case 1");
                return [0, 1, 2];
                // break;
    
            case (board[3] === board[4] && board[3] === board[5] && board[3] != ""):
                console.log("Case 2");
                return [3, 4, 5];
                // break;
    
            case (board[6] === board[7] && board[6] === board[8] && board[6] != ""):
                console.log("Case 3");
                return [6, 7, 8];
                // break;
           
            case (board[0] === board[3] && board[0] === board[6] && board[0] != ""):
                console.log("Case 4");
                return [0, 3, 6];
                // break;
    
            case (board[1] === board[4] && board[1] === board[7] && board[7] != ""):
                console.log("Case 5");
                return [1, 4, 7];
                // break;
    
            case (board[2] === board[5] && board[2] === board[8] && board[2] != ""):
                console.log("Case 6");
                return [2, 5, 8];
                // break;
    
            case (board[0] === board[4] && board[0] === board[8] && board[0] != ""):
                console.log("Case 7");
                return [0, 4, 8];
                // break;
    
            case (board[2] === board[4] && board[2] === board[6] && board[2] != ""):
                console.log("Case 8");
                return [2, 4, 6];
                // break;
        };
    };
    
    const checkTie = function() {
        if (board.includes("")) {
            return false;
        } else if (!checkWin()){
            return true;
        }
    }

    const colourWinningSquares = function(winArray) {
        winArray.forEach(element => {
            let square = document.querySelector(`[data-id='${element}']`);
            square.classList.toggle('board__square--coloured');
        });
    };

    return { 
        board, 
        boardSquares, 
        render, 
        clearBoard, 
        checkWin, 
        checkTie, 
        checkOccupied, 
        findWinner,
        colourWinningSquares,
        clearColours 
    };           
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
  
    const playTurn = function(e) {
        gameBoard.clearColours();  
        if (gameBoard.checkOccupied(e) === false) {
            currentPlayer().placeMarker(e);
            changeTurn();
            gameBoard.render();
        } else {
            // pass
        }
    };

    return { 
        players, 
        changeTurn, 
        currentTurn, 
        turn, 
        currentPlayer, 
        resetGame, 
        playTurn 
    };
})();



const displayController = (function() {

    const clearBtn = document.querySelector(".button--clear");

    clearBtn.addEventListener('click', () => {
        gameBoard.clearBoard();
        gameBoard.clearColours();
        gameBoard.render();
        game.resetGame();
    });

})();



// Create this function in the game module as a 'playTurn' type function
gameBoard.boardSquares.forEach(function(square) {
    square.addEventListener('click', function(e) {
        game.playTurn(e);
        gameBoard.render();
    });
    
    square.addEventListener('click', function() {
        if (gameBoard.checkWin()) {
            gameBoard.colourWinningSquares(gameBoard.findWinner());
            console.log("You win!");
            gameBoard.clearBoard();
            // alert("You win");
            // gameBoard.render();
        } else if (gameBoard.checkTie()) {
            console.log("It's a tie!");
            gameBoard.clearBoard();
        } else {
            // pass
        }
    });
});

