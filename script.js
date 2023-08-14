const boardGrid = (() => {
  //Create grid array
  const grid = ["", "", "", "", "", "", "", "", ""];
  const gameGrid = document.getElementById("gameGrid");
  //Function to render the grid
  const renderGrid = () => {
    let squarediv = "";
    grid.forEach((square, index) => {
      squarediv += `<div class="square" id="square-${index}">${square}</div>`;
      gameGrid.innerHTML = squarediv;
    });

    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.addEventListener("click", gameFlow.handleClick);
    });
  };

  const gameOver = () => {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      square.removeEventListener("click", gameFlow.handleClick);
    });
  };

  const getGameboard = () => grid;

  const placeMark = (index, mark) => {
    grid[index] = mark;
    renderGrid();
  };

  return { renderGrid, placeMark, getGameboard, gameOver };
})();

// Fucntion to create players
const createPlayer = (name, mark) => {
  return { name, mark };
};

const gameFlow = (() => {
  // Get players names
  const firstPlayerName = document.getElementById("player1");
  const secondPlayerName = document.getElementById("player2");
  // Add players names and marks to array
  const players = [];
  let currentIndexPlayer = 0;

  //Function to start game
  const startGame = () => {
    players.length = 0;
    if (!firstPlayerName.value && !secondPlayerName.value) {
      alert("Fill the names of players");
    } else {
      boardGrid.renderGrid();

      players.push(createPlayer(firstPlayerName.value, "X"));
      players.push(createPlayer(secondPlayerName.value, "O"));
    }
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);

    if (boardGrid.getGameboard()[index] !== "") {
      return;
    }
    boardGrid.placeMark(index, players[currentIndexPlayer].mark);

    if (checkWin(boardGrid.getGameboard(), players[currentIndexPlayer].mark)) {
      gameOver = true;
    } else if (checkTie(boardGrid.getGameboard())) {
      gameOver = true;
    }

    currentIndexPlayer = currentIndexPlayer === 0 ? 1 : 0;
  };

  const showWinner = (info) => {
    info = `${players[currentIndexPlayer].name} you win! Congratulations!`;
    const winInfo = document.getElementById("winInfo");

    winInfo.innerHTML = info;
  };

  const restartGame = () => {
    for (let i = 0; i < 9; i++) {
      boardGrid.placeMark(i, "");
    }
    boardGrid.renderGrid();
    winInfo.innerHTML = "";
    currentIndexPlayer = 0;
    firstPlayerName.value = "";
    secondPlayerName.value = "";
    players.length = 0;
  };

  const resetRound = () => {
    for (let i = 0; i < 9; i++) {
      boardGrid.placeMark(i, "");
    }
    boardGrid.renderGrid();
    winInfo.innerHTML = "";
    currentIndexPlayer = 0;
  };

  return { startGame, handleClick, restartGame, showWinner, resetRound };
})();

function checkWin(board) {
  const winCombination = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //Diagonals
    [2, 4, 6],
  ];

  for (let i = 0; i < winCombination.length; i++) {
    const [a, b, c] = winCombination[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameFlow.showWinner();
      boardGrid.gameOver();
      return true;
    }
  }
  return false;
}

function checkTie(board) {
  board.every((cell) => cell !== "");
}

// Get the button to start game
const startGame = document.getElementById("startGame");
// Add event listener to start the game
startGame.addEventListener("click", gameFlow.startGame);

// Get the button to reset game
const resetGame = document.getElementById("resetGame");
// Add event listener to start the game
resetGame.addEventListener("click", gameFlow.restartGame);

const resetRound = document.getElementById("resetRound");

resetRound.addEventListener("click", gameFlow.resetRound);
