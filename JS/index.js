// variables and constants
let inputDir = { x: 0, y: 0 };

const FoodSound = new Audio("/Assets/foodeatingsound.mp3");
const GameOverSound = new Audio("/Assets/gameoversound.mp3");
const SnakeMovesound = new Audio("/Assets/movingsidesound.mp3");
const BgSound = new Audio("/Assets/bgmusic.mp3");
let Speed = 5;
let lastPaintTime = 0;
let score = 0;
let SnakeArray1 = [{ x: 1, y: 1 }];
let food = { x: 5, y: 6 };

//// Game function logic

function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastPaintTime) / 1000 < 1 / Speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

// // if snake collide with itself
function isCollision(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    
  // check for wall collision 
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

//  // update snake location and food
function gameEngine() {
    if (isCollision(SnakeArray1)) {
        GameOverSound.play();
        BgSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("GameOver. Press any key to start again.");
        SnakeArray1 = [{ x: 1, y: 1 }];
        BgSound.play();
        score = 0;
    }
//  // after eating food update score and regenerate food
    if (SnakeArray1[0].y === food.y && SnakeArray1[0].x === food.x) {
        FoodSound.play();
        score += 1;
        if (score > highscorevalue) {
            highscorevalue = score;
            localStorage.setItem("highscore", JSON.stringify(highscorevalue));
            HighscoreTank.innerHTML = "Highscore: " + highscorevalue;
        }
        scoreTank.innerHTML = "score: " + score;
        SnakeArray1.unshift({ x: SnakeArray1[0].x + inputDir.x, y: SnakeArray1[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
// moving snake
    for (let i = SnakeArray1.length - 2; i >= 0; i--) {
        SnakeArray1[i + 1] = { ...SnakeArray1[i] };
    }
    SnakeArray1[0].x += inputDir.x;
    SnakeArray1[0].y += inputDir.y;
// render snake location and food
    board.innerHTML = "";
    SnakeArray1.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
// logic parts for storing high score and conditional statement for key functions
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscorevalue = 0;
    localStorage.setItem("highscore", JSON.stringify(highscorevalue));
} else {
    highscorevalue = JSON.parse(highscore);
    HighscoreTank.innerHTML = "Highscore: " + highscorevalue;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    SnakeMovesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
