class FootballGame {
  constructor() {
    this.score = 0;
    this.attempts = 0;
    this.directions = ['left', 'center', 'right'];
    this.commentary = [
      "Great save by the keeper!",
      "What a goal!",
      "Just wide of the post...",
      "The keeper guessed right!",
      "Top corner! Amazing shot!"
    ];
  }

  init() {
    document.getElementById('game-container').innerHTML = `
      <div class="football-game">
        <h3>Penalty Shootout</h3>
        <div class="scoreboard">
          <p>Score: <span id="football-score">0</span>/5</p>
          <p>Attempts: <span id="football-attempts">0</span>/5</p>
        </div>
        <div class="shot-direction">
          <button class="btn direction-btn" data-dir="left">Shoot Left</button>
          <button class="btn direction-btn" data-dir="center">Shoot Center</button>
          <button class="btn direction-btn" data-dir="right">Shoot Right</button>
        </div>
        <div id="football-commentary" class="commentary"></div>
        <div class="goal-visual">
          <div class="goal-post"></div>
          <div class="ball" id="football-ball"></div>
        </div>
        <button class="btn" id="reset-football">Reset Game</button>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelectorAll('.direction-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.takeShot(e.target.dataset.dir));
    });
    document.getElementById('reset-football').addEventListener('click', () => this.resetGame());
  }

  takeShot(direction) {
    if (this.attempts >= 5) return;

    this.attempts++;
    const keeperDirection = this.directions[Math.floor(Math.random() * 3)];
    const isGoal = direction !== keeperDirection || (direction === 'center' && Math.random() > 0.5);
    
    // Animate ball
    this.animateShot(direction, isGoal);

    // Update score
    if (isGoal) {
      this.score++;
      document.getElementById('football-score').textContent = this.score;
    }

    // Update commentary
    const commentary = document.getElementById('football-commentary');
    commentary.innerHTML = `<p>You shot ${direction}, keeper went ${keeperDirection}</p>
                           <p>${this.commentary[Math.floor(Math.random() * this.commentary.length)]}</p>`;

    document.getElementById('football-attempts').textContent = this.attempts;

    if (this.attempts >= 5) {
      commentary.innerHTML += `<p class="game-over">Game over! Final score: ${this.score}/5</p>`;
    }
  }

  animateShot(direction, isGoal) {
    const ball = document.getElementById('football-ball');
    const goalWidth = document.querySelector('.goal-post').offsetWidth;
    let xPosition;
    
    switch(direction) {
      case 'left': xPosition = goalWidth * 0.2; break;
      case 'right': xPosition = goalWidth * 0.8; break;
      default: xPosition = goalWidth * 0.5;
    }

    // Reset animation
    ball.style.transition = 'none';
    ball.style.transform = 'translate(0, 0) scale(1)';
    ball.style.opacity = '1';
    void ball.offsetWidth; // Trigger reflow

    // Animate
    ball.style.transition = 'all 0.5s ease-out';
    ball.style.transform = `translate(${xPosition}px, -150px) scale(${isGoal ? 0.5 : 0.8})`;
    ball.style.opacity = isGoal ? '0' : '1';

    // Reset position after animation
    setTimeout(() => {
      ball.style.transition = 'none';
      ball.style.transform = 'translate(0, 0) scale(1)';
      ball.style.opacity = '1';
    }, 1000);
  }

  resetGame() {
    this.score = 0;
    this.attempts = 0;
    document.getElementById('football-score').textContent = '0';
    document.getElementById('football-attempts').textContent = '0';
    document.getElementById('football-commentary').innerHTML = '';
  }
}

// Initialize when games section is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('games')) {
    const footballGame = new FootballGame();
    document.querySelector('[onclick*="startFootballGame"]').addEventListener('click', () => {
      footballGame.init();
    });
  }
});