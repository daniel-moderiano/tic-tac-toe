const gameBoard = ["X", "", "O",
                 "X", "", "X",
                 "O", "O", ""];

const Player = function(name, marker) {
    const placeMarker = (event) => {
        let squareSelected = event.target.getAttribute("data-id");
        gameBoard.board[squareSelected] = marker;
    };
    return { placeMarker, name, marker };
};

const player1 = Player("human", "O");
const player2 = Player("computer", "X");

const players = [player1, player2];

// Function to check for boardWin configuration

const checkWin = function(board) {
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

const findWinner = (board) => {
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

const winningPlayer = function(board) {
    let winLocation = findWinner(board);
    let winMarker = board[winLocation[0]];
    let winner;
    players.forEach(player => {
        if (player.marker === winMarker) {
            winner = player;
        }
    });
    return winner;
}

const boardWinValue = function(board, winningArray) {
    let winMarker = board[winningArray[0]];
    if (winMarker === "X") {
        return +10;
    } else if (winMarker === "O") {
        return -10;
    } else {
        return 0;
    }
}

const checkTie = function(board) {
    if (board.includes("")) {
        return false;
    } else if (!checkWin()){
        return true;
    }
}

// Return empty spaces and indices on the gameBoard
let indexFilter = function(array) {
    let emptyIndicies = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "") {
            emptyIndicies.push(i);
        }
    }
    return emptyIndicies;
}

// The main minimax function

const minimax = function(board, player) {

    // Base case for recursion should return +10 for AI win and -10 for human win, and 0 for a tie.
    if (findWinner(board) != false) {
        if (winningPlayer(board).name === "human") {
            return { evaluation: -10 };
        } else {
            return { evaluation: +10 }
        }
    } else if (checkTie(board) === true) {
        return { evaluation: 0 }
    }

    // Analyse current board to identify empty spaces
    let emptySpaces = indexFilter(board);

    // Create an array to store all of the moves tested by the AI, which should be objects that list the index where the marker was played, and the evaluation of the board as a result of that placement. 
    let moves = [];

    // Go through each empty space available and try putting the current player's marker in that space. Then we have to check for win/tie, and if not then go through empty spaces again, select one, etc, etc. The recursion loop should be here. 
    emptySpaces.forEach(space => {
        let move = {};
        board[space] = player.marker;
        move.id = space;
        if (player === player1) {
            console.log("Player 1");
            move.evaluation = minimax(board, player2).evaluation;
        } else {
            console.log("Player 2");
            move.evaluation = minimax(board, player1).evaluation;
        }        
        board[space] = "";
        moves.push(move);
    });

    return moves;

}