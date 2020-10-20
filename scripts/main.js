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
        return false;
    };

    const boardWinValue = function(winningArray) {
        let winMarker = board[winningArray[0]];
        if (winMarker === "\u2715") {
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
        } else if (!findWinner()){
            return true;
        }
    }

    const winningPlayer = function() {
        let winLocation = findWinner();
        let winMarker = board[winLocation[0]];
        let winner;
        displayController.currentPlayers().forEach(player => {
            if (player.marker === winMarker) {
                winner = player;
            }
        });
        return winner;
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
        checkTie, 
        checkOccupied, 
        findWinner,
        colourWinningSquares,
        clearColours,
        selectCompSquare,
        boardWinValue,
        winningPlayer,
        indexFilter
    };           
})();

const displayController = (function() {

    const restartBtn = document.querySelector(".button--restart");
  

    const playerInput1 = document.querySelector(".players__input--p1");
    const playerInput2 = document.querySelector(".players__input--p2");
    const modalPlayers = document.querySelector(".modal--players");
    const modalGame = document.querySelector(".modal--game");
    const singlePlayerBtn = document.querySelector(".game__button--1p");
    const multiplayerBtn = document.querySelector(".game__button--2p");
    const menuBtn = document.querySelector(".button--menu");
    const startBtn = document.querySelector(".players__btn");

    const playerTwoLabel = document.querySelector(".players__label--p2");



    const playerOneNameDisplay = document.querySelector(".player-display__name--p1");
    const playerTwoNameDisplay = document.querySelector(".player-display__name--p2");
    const playerOneSymbolDisplay = document.querySelector(".player-display__symbol--p1");
    const playerTwoSymbolDisplay = document.querySelector(".player-display__symbol--p2");
    const playerDisplayContOne = document.querySelector(".player-display__container--p1");
    const playerDisplayContTwo = document.querySelector(".player-display__container--p2");
    const playerOneWinText = document.querySelector(".player-display__win--p1");
    const playerTwoWinText = document.querySelector(".player-display__win--p2");
    const playerWinText = document.querySelectorAll(".player-display__win");
    const playerFields = document.querySelector(".players__fields");


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
        const player1 = Player(playerNames[0], "\u2715");
        const player2 = Player(playerNames[1], "O");
        return [player1, player2];
    };

    startBtn.addEventListener("click", () => {
        players = createPlayers(pullNameInputs());
        modalPlayers.style.display = "none";
        playerOneNameDisplay.textContent = `${currentPlayers()[0].name}`;
        playerOneSymbolDisplay.textContent = `${currentPlayers()[0].marker}`;
        playerTwoNameDisplay.textContent = `${currentPlayers()[1].name}`;
        playerTwoSymbolDisplay.textContent = `${currentPlayers()[1].marker}`;
        game.gameMode();
    });
        
    const currentPlayers = function() {
        return players;
    };

    const fullClear = function() {
        gameBoard.clearBoard();
        gameBoard.clearColours();
        displayController.clearWinner();
        gameBoard.render();
        game.resetTurn();
    }

    restartBtn.addEventListener('click', fullClear);
    
    const onePlayerInput = () => {
        playerFields.classList.add("players__fields--1p");
    };

    const twoPlayerInput = () => {
        playerFields.classList.remove("players__fields--1p");
    };

    menuBtn.addEventListener('click', function() {
        modalGame.style.display = "block";
        modalPlayers.style.display = "block";
        playerInput2.value = "";
        twoPlayerInput();
        showElement(playerInput2);
        showElement(playerTwoLabel);
        game.removeGameModeEvent();
        fullClear();
    })

    multiplayerBtn.addEventListener('click', function() {
        modalGame.style.display = "none";
        twoPlayerInput();
    })

    singlePlayerBtn.addEventListener('click', function() {
        modalGame.style.display = "none";
        playerInput2.value = "Computer";
        hideElement(playerTwoLabel);
        hideElement(playerInput2);
        onePlayerInput();
    })

    const showElement = function(element) {
        element.style.display = "block";
    }

    const hideElement = function(element) {
        element.style.display = "none";
    }

    const clearWinner = function() {
        playerOneWinText.textContent = "";
        playerTwoWinText.textContent = "";
    }

    const displayTie = function() {
        playerWinText.forEach(display => {
            display.textContent = "Tie!"
        });
    }
  
    return { currentPlayers, startBtn, showElement, hideElement, restartBtn, playerInput2, playerInput1,
    playerOneNameDisplay, playerTwoNameDisplay, playerDisplayContOne, playerDisplayContTwo, playerOneSymbolDisplay, playerTwoSymbolDisplay, playerOneWinText, playerTwoWinText, clearWinner, displayTie };

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

    const removeGameModeEvent = function() {
        gameBoard.boardSquares.forEach(function(square) {
            square.removeEventListener('click', onePlayerEvents);
            square.removeEventListener('click', twoPlayerEvents);
        });
    };

    const onePlayerEvents = function(e) {
        playTurnOnePlayer(e);
        gameOutcomeSinglePlayer();
    }

    const twoPlayerEvents = function(e) {
        playTurnTwoPlayer(e);
        gameOutcome();
    }


    const twoPlayer = function() {
        gameBoard.boardSquares.forEach(function(square) {
            square.addEventListener('click', twoPlayerEvents);
        });
    };

    
    const onePlayer = function() {
        gameBoard.boardSquares.forEach(function(square) {
            square.addEventListener('click', onePlayerEvents);
        });
    }

    const gameMode = function() {
        if (displayController.currentPlayers()[1].name === "Computer") {
            onePlayer();
        } else {
            twoPlayer();
        }
    }
    
  
    const playTurnTwoPlayer = function(e) {

        gameBoard.clearColours();
        displayController.clearWinner();        
        if (gameBoard.checkOccupied(e) === false) {
            currentPlayer().placeMarker(e);
            changeTurn();
            gameBoard.render();
        } else {
            // pass
        }
    };

    const minimax = function(player) {
        // Base case for recursion should return +10 for AI win and -10 for human win, and 0 for a tie.
        if (gameBoard.findWinner() != false) {
            if (gameBoard.winningPlayer().name != "Computer") {
                return { evaluation: -10 };
            } else {
                return { evaluation: +10 }
            }
        } else if (gameBoard.checkTie(gameBoard.board) === true) {
            return { evaluation: 0 }
        }
    
        // Analyse current board to identify empty spaces
        let emptySpaces = gameBoard.indexFilter(gameBoard.board);
    
        // Create an array to store all of the moves tested by the AI, which should be objects that list the index where the marker was played, and the evaluation of the board as a result of that placement. 
        let moves = [];
    
        // Go through each empty space available and try putting the current player's marker in that space. Then we have to check for win/tie, and if not then go through empty spaces again, select one, etc, etc. The recursion loop should be here. 
        for (let i = 0; i < emptySpaces.length; i++) {
            let id = emptySpaces[i];
            let move = {};
            move.id = id;
            let savedBoardSpace = gameBoard.board[id];
            gameBoard.board[id] = player.marker;
    
            if (player.name === "Computer") {
                move.evaluation = minimax(displayController.currentPlayers()[0]).evaluation;
            } else {
                move.evaluation = minimax(displayController.currentPlayers()[1]).evaluation;
            }
    
            gameBoard.board[id] = savedBoardSpace;
            moves.push(move);
        }
    
        let bestMove;
        if (player.name === "Computer") {
            let bestEvaluation = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].evaluation > bestEvaluation) {
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
    
        } else {
            let bestEvaluation = +Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].evaluation < bestEvaluation) {
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;
    }


    const compTurn = function() {
        if (gameBoard.findWinner()) {
            // pass
        } else {
            if (minimax(currentPlayer()).id != undefined) {
                gameBoard.board[minimax(currentPlayer()).id] = currentPlayer().marker
            } else {
                // pass
            }
            gameBoard.render();   
            changeTurn(); 
        }
        
    }
    
    const playTurnOnePlayer = function(e) {


        gameBoard.clearColours();     
        displayController.clearWinner();   
        if (gameBoard.checkOccupied(e) === false) {
            currentPlayer().placeMarker(e);
            changeTurn();
            gameBoard.render();
            compTurn();
        } else {
            // pass
        }
        
    };

    const gameWinMultiplayer = function() {
        gameBoard.colourWinningSquares(gameBoard.findWinner());
 
        if (findWinningPlayer().name === "Computer") {
            changeTurn();
        } 
        if (findWinningPlayer() === displayController.currentPlayers()[0]) {
            displayController.playerOneWinText.textContent = "Winner!";
        } else if (findWinningPlayer() === displayController.currentPlayers()[1]) {
            displayController.playerTwoWinText.textContent = "Winner!";
        }
        gameBoard.clearBoard();
       
    };

    const gameWinSinglePlayer = function() {
        gameBoard.colourWinningSquares(gameBoard.findWinner());
        if (findWinningPlayer().name === "Computer") {
            changeTurn();
            displayController.playerTwoWinText.textContent = "Winner!";
        } 
        gameBoard.clearBoard();
       
    };

    const gameTie = function() {
        gameBoard.clearBoard();
    };

    const gameOutcome = function() {
        if (gameBoard.findWinner()) {
            gameWinMultiplayer();    
      
        } else if (gameBoard.checkTie()) {
            gameTie();
            displayController.displayTie();
        } else {
            // pass
        }
        
    }
    
    const gameOutcomeSinglePlayer = function() {
        if (gameBoard.findWinner()) {
            gameWinSinglePlayer();  
            changeTurn();   
        } else if (gameBoard.checkTie()) {
            gameTie();   
            displayController.displayTie(); 
        } else {
            // pass
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
        findWinningPlayer,
        gameMode, 
        minimax,
        removeGameModeEvent,
        gameOutcome,
        playTurnTwoPlayer, 
        onePlayerEvents,
        twoPlayerEvents
    };
})();



