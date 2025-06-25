class CricketGame {
  constructor() {
    this.runs = 0;
    this.balls = 0;
    this.wickets = 0;
    this.overComplete = false;
    this.shotTypes = ['Defensive', 'Drive', 'Cut', 'Pull', 'Sweep'];
    this.outcomes = {
      0: 'Dot ball',
      1: 'Single',
      2: 'Double',
      4: 'Boundary!',
      6: 'Sixer!',
      'WICKET': 'Out!'
    };
  }

  init() {
    document.getElementById('game-container').innerHTML = `
      <div class="cricket-game">
        <h3>Cricket Challenge</h3>
        <div class="scoreboard">
          <p>Runs: <span id="cricket-runs">0</span></p>
          <p>Balls: <span id="cricket-balls">0</span>/6</p>
          <p>Wickets: <span id="cricket-wickets">0</span>/3</p>
        </div>
        <div class="shot-options">
          ${this.shotTypes.map((shot, i) => 
            `<button class="btn shot-btn" data-shot="${i}">${shot}</button>`
          ).join('')}
        </div>
        <div id="cricket-commentary" class="commentary"></div>
        <button class="btn" id="reset-cricket">Reset Game</button>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll('.shot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.playShot(parseInt(e.target.dataset.shot)));
    });
    document.getElementById('reset-cricket').addEventListener('click', () => this.resetGame());
  }

  playShot(shotType) {
    if (this.overComplete || this.wickets >= 3) return;

    this.balls++;
    const shotPower = Math.random() * (shotType * 0.3 + 0.7);
    let result;

    if (shotPower > 0.9) {
      result = 6;
    } else if (shotPower > 0.7) {
      result = 4;
    } else if (shotPower > 0.5) {
      result = 2;
    } else if (shotPower > 0.3) {
      result = 1;
    } else if (shotPower > 0.1) {
      result = 0;
    } else {
      result = 'WICKET';
    }

    this.updateGame(result);
  }

  updateGame(result) {
    const commentary = document.getElementById('cricket-commentary');
    
    if (result === 'WICKET') {
      this.wickets++;
      commentary.innerHTML = `<p class="out">${this.outcomes[result]} Wicket ${this.wickets}!</p>`;
    } else {
      this.runs += result;
      commentary.innerHTML = `<p>${this.shotTypes[Math.floor(Math.random() * this.shotTypes.length)]} shot - ${this.outcomes[result]}</p>`;
    }

    document.getElementById('cricket-runs').textContent = this.runs;
    document.getElementById('cricket-balls').textContent = this.balls;
    document.getElementById('cricket-wickets').textContent = this.wickets;

    if (this.balls >= 6 || this.wickets >= 3) {
      this.overComplete = true;
      commentary.innerHTML += `<p class="game-over">Game over! Final score: ${this.runs}/${this.wickets} in ${this.balls} balls</p>`;
    }
  }

  resetGame() {
    this.runs = 0;
    this.balls = 0;
    this.wickets = 0;
    this.overComplete = false;
    
    document.getElementById('cricket-runs').textContent = '0';
    document.getElementById('cricket-balls').textContent = '0';
    document.getElementById('cricket-wickets').textContent = '0';
    document.getElementById('cricket-commentary').innerHTML = '';
  }
}

// Initialize when games section is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('games')) {
    const cricketGame = new CricketGame();
    document.querySelector('[onclick*="startCricketGame"]').addEventListener('click', () => {
      cricketGame.init();
    });
  }
});