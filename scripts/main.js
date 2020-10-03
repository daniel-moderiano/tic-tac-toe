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
        displayController.hideElement(displayController.resultsInstructions);
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

    const boardWinValue = function(winningArray) {
        let winMarker = board[winningArray[0]];
        if (winMarker === "X") {
            return +10;
        } else if (winMarker === "O") {
            return -10;
        } else {
            return 0;
        }
    }
    
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

    let indexFilter = function(array) {
        let emptyIndicies = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "") {
                emptyIndicies.push(i);
            }
        }
        return emptyIndicies;
    }
    
    const randomSquare = function(array) {
        let index = Math.round(Math.random() * (array.length - 1));
        return array[index];
    }
    
    
    const selectCompSquare = function() {
        return randomSquare(indexFilter(gameBoard.board));
    }

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
        selectCompSquare,
        boardWinValue
    };           
})();

const displayController = (function() {

    const clearBtn = document.querySelector(".button--clear");
    const resultsText = document.querySelector(".results__text");

    const playerInput1 = document.querySelector(".players__input--p1");
    const playerInput2 = document.querySelector(".players__input--p2");
    const modalPlayers = document.querySelector(".modal--players");
    const modalGame = document.querySelector(".modal--game");
    const singlePlayerBtn = document.querySelector(".game__button--1p");
    const multiplayerBtn = document.querySelector(".game__button--2p");
    const menuBtn = document.querySelector(".button--menu");
    const startBtn = document.querySelector(".players__btn");
    const resultsInstructions = document.querySelector(".results__instructions");
    const playerTwoLabel = document.querySelector(".players__label--p2");

    const playerDisplay = document.querySelector(".player-display");
    const playerTurnDisplay = document.querySelector(".player-display__first-turn");
    const playerOneDisplay = document.querySelector(".player-display__symbols--p1");
    const playerTwoDisplay = document.querySelector(".player-display__symbols--p2");

    let players;

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
    };
    
    const createPlayers = function(playerNames) {
        const player1 = Player(playerNames[0], "X");
        const player2 = Player(playerNames[1], "O");
        return [player1, player2];
    };

    startBtn.addEventListener("click", () => {
        players = createPlayers(pullNameInputs());
        modalPlayers.style.display = "none";
        playerTurnDisplay.textContent = `${currentPlayers()[0].name} starts!`;
        playerOneDisplay.textContent = `${currentPlayers()[0].name} playing ${currentPlayers()[0].marker}`;
        playerTwoDisplay.textContent = `${currentPlayers()[1].name} playing ${currentPlayers()[1].marker}`;
        game.gameMode();
    });
        
    const currentPlayers = function() {
        return players;
    };

    const fullClear = function() {
        gameBoard.clearBoard();
        gameBoard.clearColours();
        gameBoard.render();
        game.resetTurn();
    }

    clearBtn.addEventListener('click', fullClear);

    const showResult = () => resultsText.classList.remove("results__text--invisible");
    const hideResult = () => resultsText.classList.add("results__text--invisible");   
    
    menuBtn.addEventListener('click', function() {
        modalPlayers.style.display = "block";
        modalGame.style.display = "block";
        playerInput2.value = "";
        showElement(playerInput2);
        showElement(playerTwoLabel);
        fullClear();
    })

    multiplayerBtn.addEventListener('click', function() {
        modalGame.style.display = "none";
    })

    singlePlayerBtn.addEventListener('click', function() {
        modalGame.style.display = "none";
        playerInput2.value = "Computer";
        hideElement(playerTwoLabel);
        hideElement(playerInput2);
    })

    const showElement = function(element) {
        element.style.display = "block";
    }

    const hideElement = function(element) {
        element.style.display = "none";
    }

    const displayPlayAgain = function(player) {
        resultsInstructions.textContent = `Press 'Clear Board' to restart, or ${player} can select a square to restart!`;
        showElement(resultsInstructions);
    }
  
    return { resultsText, showResult, hideResult, currentPlayers, startBtn, showElement, hideElement, clearBtn, displayPlayAgain, resultsInstructions, playerTurnDisplay, playerInput2, playerInput1 };

})();



const Player = function(name, marker) {

    const placeMarker = (event) => {
        let squareSelected = event.target.getAttribute("data-id");
        gameBoard.board[squareSelected] = marker;
    };

    return { placeMarker, name, marker };

};

const game = (function() {
    let turn = 0;

    const changeTurn = () => {
        turn++;
        if (turn === displayController.currentPlayers().length) {
            turn = 0;
        }
    };

    const currentTurn = function() {
        return(turn);
    };

    const currentPlayer = function() {
        return displayController.currentPlayers()[turn];
    }

    const resetTurn = function() {
        turn = 0;
    }

    const findWinningPlayer = function() {
        if (currentTurn() === 0) {
            return displayController.currentPlayers()[1];
        } else {
            return displayController.currentPlayers()[0];
        }
    };

    // Consider abstraction to playTurn function below; not a great deal of functions and adds perhaps needless step.
  
    const playTurnTwoPlayer = function(e) {
        if (displayController.playerTurnDisplay.textContent != "") {
            displayController.playerTurnDisplay.textContent = "";
        }

        gameBoard.clearColours();
        if (!displayController.resultsText.classList.contains("results__text--invisible")) {
            displayController.hideResult();
            displayController.hideElement(displayController.resultsInstructions);
        }
        
        if (gameBoard.checkOccupied(e) === false) {
            currentPlayer().placeMarker(e);
            changeTurn();
            gameBoard.render();
        } else {
            // pass
        }
    };

    const compTurn = function() {
        if (gameBoard.checkWin()) {
            // pass
        } else {
            gameBoard.board[gameBoard.selectCompSquare()] = currentPlayer().marker
            gameBoard.render();   
            changeTurn(); 
        }
        
    }
    
    const playTurnOnePlayer = function(e) {
        if (displayController.playerTurnDisplay.textContent != "") {
            displayController.playerTurnDisplay.textContent = "";
        }

        gameBoard.clearColours();
        if (!displayController.resultsText.classList.contains("results__text--invisible")) {
            displayController.hideResult();
            displayController.hideElement(displayController.resultsInstructions);
        }
        
        if (gameBoard.checkOccupied(e) === false) {
            currentPlayer().placeMarker(e);
            changeTurn();
            gameBoard.render();
            compTurn();
        } else {
            // pass
        }
        
    };

    const gameWin = function() {
        gameBoard.colourWinningSquares(gameBoard.findWinner());
        console.log(gameBoard.boardWinValue(gameBoard.findWinner()));
        let winText = `${findWinningPlayer().name} wins!`;
        if (findWinningPlayer().name === "Computer") {
            changeTurn();
        } 
        gameBoard.clearBoard();
        displayController.resultsText.textContent = winText;        
    };

    const gameTie = function() {
        gameBoard.clearBoard();
        displayController.resultsText.textContent = "It's a Tie!";
    };

    const gameOutcome = function() {
        if (gameBoard.checkWin()) {
            gameWin();    
            displayController.showResult();
            displayController.displayPlayAgain(currentPlayer().name);        
        } else if (gameBoard.checkTie()) {
            gameTie();
            displayController.showResult();
            displayController.displayPlayAgain(currentPlayer().name); 
        } else {
            // pass
        }
        
    }
    
    const gameOutcomeSinglePlayer = function() {
        if (gameBoard.checkWin()) {
            gameWin();
            displayController.showResult();
            displayController.displayPlayAgain(displayController.currentPlayers()[0].name);    
            changeTurn();   
        } else if (gameBoard.checkTie()) {
            gameTie();   
            displayController.showResult();
            displayController.displayPlayAgain(displayController.currentPlayers()[0].name);    
        } else {
            // pass
        }
        
    }

    const twoPlayer = function() {
        gameBoard.boardSquares.forEach(function(square) {
            square.addEventListener('click', function(e) {
                playTurnTwoPlayer(e);
                gameOutcome();
            });
        });
    };

    const onePlayer = function() {
        gameBoard.boardSquares.forEach(function(square) {
            square.addEventListener('click', function(e) {
                playTurnOnePlayer(e);
                gameOutcomeSinglePlayer();
            });
        });
    }

    const gameMode = function() {
        if (displayController.currentPlayers()[1].name === "Computer") {
            onePlayer();
        } else {
            twoPlayer();
        }
    }
    
    


    

    return { 
        changeTurn, 
        currentTurn, 
        turn, 
        currentPlayer, 
        resetTurn, 
        playTurnTwoPlayer,
        playTurnOnePlayer,
        gameTie,
        gameWin,
        findWinningPlayer,
        gameMode
    };
})();




