const gameBoard = ["X", "", "O",
                 "X", "X", "X",
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

// The main minimax function

const minimax = function(gameData, player) {



}