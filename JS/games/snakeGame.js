const gameState = {
    snake: [{ x: 200, y: 200 }],
    food: { x: 100, y: 100 },
    direction: { x: 20, y: 0 },
    score: 0,
    highScore: localStorage.getItem('snakeHighScore') || 0,
    gameRunning: false,
    gameInterval: null,
    gameSpeed: 200
};

function startSnakeGame() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    gameContainer.style.display = 'block';
    resetGame();
    
    gameState.gameRunning = true;
    gameState.gameInterval = setInterval(updateSnakeGame, gameState.gameSpeed);
    
    // Setup controls
    document.addEventListener('keydown', handleKeyPress);
    setupTouchControls();
}

function updateSnakeGame() {
    if (!gameState.gameRunning) return;
    
    // Move snake
    const head = { 
        x: gameState.snake[0].x + gameState.direction.x, 
        y: gameState.snake[0].y + gameState.direction.y 
    };
    
    // Check collisions
    if (checkWallCollision(head) || checkSelfCollision(head)) {
        gameOver();
        return;
    }
    
    gameState.snake.unshift(head);
    
    // Check food collision
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
        gameState.score += 10;
        updateScore();
        generateFood();
        
        // Increase speed slightly
        gameState.gameSpeed = Math.max(50, gameState.gameSpeed - 5);
        clearInterval(gameState.gameInterval);
        gameState.gameInterval = setInterval(updateSnakeGame, gameState.gameSpeed);
    } else {
        gameState.snake.pop();
    }
    
    renderSnakeGame();
}

// All other snake game functions (render, collision checks, etc.) would follow...