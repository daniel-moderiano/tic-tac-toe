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
        displayController.hideResult();
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
                return [0, 1, 2];
    
            case (board[3] === board[4] && board[3] === board[5] && board[3] != ""):
                return [3, 4, 5];
    
            case (board[6] === board[7] && board[6] === board[8] && board[6] != ""):
                return [6, 7, 8];
           
            case (board[0] === board[3] && board[0] === board[6] && board[0] != ""):
                return [0, 3, 6];
    
            case (board[1] === board[4] && board[1] === board[7] && board[7] != ""):
                return [1, 4, 7];
    
            case (board[2] === board[5] && board[2] === board[8] && board[2] != ""):
                return [2, 5, 8];
    
            case (board[0] === board[4] && board[0] === board[8] && board[0] != ""):
                return [0, 4, 8];
    
            case (board[2] === board[4] && board[2] === board[6] && board[2] != ""):
                return [2, 4, 6];
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
        clearColours,
    };           
})();

const Player = function(name, marker) {

    const placeMarker = (event) => {
        let squareSelected = event.target.getAttribute("data-id");
        gameBoard.board[squareSelected] = marker;
    };

    return { placeMarker, name, marker };

};

// const player1 = Player('Dan', "O");
// const player2 = Player('Sam', "X");


const game = (function() {
    let turn = 0;

    // For single player, the comp should be assigned as player2
    let players = [];

    
    


    
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

    const findWinningPlayer = function() {
        if (currentTurn() === 0) {
            return player2;
        } else {
            return player1;
        }
    };

    // Consider abstraction to playTurn function below; not a great deal of functions and adds perhaps needless step.
  
    const playTurn = function(e) {

        gameBoard.clearColours();
        if (!displayController.resultsText.classList.contains("results__text--invisible")) {
            displayController.hideResult();
        }
        
        if (gameBoard.checkOccupied(e) === false) {
            currentPlayer().placeMarker(e);
            changeTurn();
            gameBoard.render();
        } else {
            // pass
        }
    };

    const gameWin = function() {
        gameBoard.colourWinningSquares(gameBoard.findWinner());
        let winText = `${findWinningPlayer().name} wins!`
        gameBoard.clearBoard();
        displayController.resultsText.textContent = winText;
        displayController.showResult();
        
    };

    const gameTie = function() {
        gameBoard.clearBoard();
        displayController.resultsText.textContent = "It's a Tie!";
        displayController.showResult();
      
    };

    const gameOutcome = function() {
        if (gameBoard.checkWin()) {
            gameWin();            
        } else if (gameBoard.checkTie()) {
            gameTie();
        } else {
            // pass
        }
    }
    
    gameBoard.boardSquares.forEach(function(square) {
        square.addEventListener('click', function(e) {
            playTurn(e);
            gameOutcome();
        });
    });

    return { 
        players, 
        changeTurn, 
        currentTurn, 
        turn, 
        currentPlayer, 
        resetGame, 
        playTurn,
        gameTie,
        gameWin,
        findWinningPlayer
    };
})();



const displayController = (function() {

    const clearBtn = document.querySelector(".button--clear");
    const resultsText = document.querySelector(".results__text");

    let players;

    const currentPlayers = () => {
        return players;
    }

    const playerInput1 = document.querySelector(".players__input--p1");
    const playerInput2 = document.querySelector(".players__input--p2");
    const pullNameInputs = function() {
        let playerName1;
        let playerName2;
        if (playerInput1.value === "") {
            playerName1 = "Player 1";
        } else {
            playerName1 = playerInput1.value;
        }
    
        if (playerInput2.value === "") {
            playerName2 = "Player 2";
        } else {
            playerName2 = playerInput2.value;
        }
    
        return [playerName1, playerName2];
    }
    
    
    
    const createPlayers = function(playerNames) {
        const player1 = Player(playerNames[0], "X");
        const player2 = Player(playerNames[1], "O");
        return [player1, player2];
    }
    
    
    const startBtn = document.querySelector(".players__btn");
    
    
    
    startBtn.addEventListener("click", () => {
        players = createPlayers(pullNameInputs())
    });

    clearBtn.addEventListener('click', () => {
        gameBoard.clearBoard();
        gameBoard.clearColours();
        gameBoard.render();
        game.resetGame();
    });

    // need to upgrade to show which player has won
    const showResult = () => resultsText.classList.remove("results__text--invisible");
    const hideResult = () => resultsText.classList.add("results__text--invisible");   
    

    


    return { resultsText, showResult, hideResult, players, currentPlayers };

})();

