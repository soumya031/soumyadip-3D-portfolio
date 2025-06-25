class TicTacToe {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
  }

  init() {
    document.getElementById('game-container').innerHTML = `
      <div class="tic-tac-toe">
        <h3>Tic Tac Toe</h3>
        <p>Current Player: <span id="current-player">X</span></p>
        <div id="tic-tac-toe-board" class="board"></div>
        <div id="tic-tac-toe-result" class="result"></div>
        <button class="btn" id="reset-tic-tac-toe">Reset Game</button>
      </div>
    `;

    this.renderBoard();
    this.setupEventListeners();
  }

  renderBoard() {
    const boardElement = document.getElementById('tic-tac-toe-board');
    boardElement.innerHTML = '';
    
    this.board.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.index = index;
      cellElement.textContent = cell;
      boardElement.appendChild(cellElement);
    });
  }

  setupEventListeners() {
    document.getElementById('tic-tac-toe-board').addEventListener('click', (e) => {
      const cellIndex = e.target.dataset.index;
      if (cellIndex !== undefined && this.gameActive && !this.board[cellIndex]) {
        this.makeMove(parseInt(cellIndex));
      }
    });
    
    document.getElementById('reset-tic-tac-toe').addEventListener('click', () => this.resetGame());
  }

  makeMove(index) {
    this.board[index] = this.currentPlayer;
    this.renderBoard();
    
    if (this.checkWin()) {
      document.getElementById('tic-tac-toe-result').innerHTML = 
        `<p class="win">Player ${this.currentPlayer} wins!</p>`;
      this.gameActive = false;
      return;
    }
    
    if (this.board.every(cell => cell)) {
      document.getElementById('tic-tac-toe-result').innerHTML = 
        `<p class="draw">It's a draw!</p>`;
      this.gameActive = false;
      return;
    }
    
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('current-player').textContent = this.currentPlayer;
  }

  checkWin() {
    return this.winningCombos.some(combo => {
      return combo.every(index => {
        return this.board[index] === this.currentPlayer;
      });
    });
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    document.getElementById('current-player').textContent = 'X';
    document.getElementById('tic-tac-toe-result').innerHTML = '';
    this.renderBoard();
  }
}

// Initialize when games section is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('games')) {
    const ticTacToe = new TicTacToe();
    document.querySelector('[onclick*="startTicTacToe"]').addEventListener('click', () => {
      ticTacToe.init();
    });
  }
});