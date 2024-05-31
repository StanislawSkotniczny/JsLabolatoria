let ball = document.querySelector('.ball');
let timerDisplay = document.getElementById('timer');
let ballSize = 20;
let holeSize = 30;
let numHoles = 10;
let holes = [];
let ballPosition = { x: 50, y: 50 };
let startTime, timerInterval;
let bestTimes = [];

function createHoles() {
    const container = document.getElementById('game-container');
    holes.forEach(hole => container.removeChild(hole));
    holes = [];
    for (let i = 0; i < numHoles; i++) {
        let hole = document.createElement('div');
        hole.classList.add('hole');
        hole.style.left = Math.random() * (window.innerWidth - holeSize) + 'px';
        hole.style.top = Math.random() * (window.innerHeight - holeSize) + 'px';
        container.appendChild(hole);
        holes.push(hole);
    }
}

createHoles();

ball.style.left = ballPosition.x + 'px';
ball.style.top = ballPosition.y + 'px';

let counter = 0;
let lastTime = Date.now();

window.addEventListener('deviceorientation', onDeviceMove);

function onDeviceMove(event) {
    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 100);
    }

    let x = event.gamma;
    let y = event.beta;

    ballPosition.x += x * 0.1;
    ballPosition.y += y * 0.1;

    ballPosition.x = Math.max(0, Math.min(window.innerWidth - ballSize, ballPosition.x));
    ballPosition.y = Math.max(0, Math.min(window.innerHeight - ballSize, ballPosition.y));

    ball.style.left = ballPosition.x + 'px';
    ball.style.top = ballPosition.y + 'px';

    checkCollisions();
}

function updateTimer() {
    let currentTime = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = currentTime.toFixed(2) + 's';
}

function checkCollisions() {
    for (let i = 0; i < holes.length; i++) {
        let holePosition = {
            x: parseFloat(holes[i].style.left),
            y: parseFloat(holes[i].style.top)
        };
        if (checkCollision(ballPosition, holePosition)) {
            document.getElementById('game-container').removeChild(holes[i]);
            holes.splice(i, 1);
            break;
        }
    }
    if (holes.length === 0) {
        clearInterval(timerInterval);
        let timeTaken = (Date.now() - startTime) / 1000;
        bestTimes.push(timeTaken);
        bestTimes.sort((a, b) => a - b);
        if (bestTimes.length > 3) bestTimes.pop();
        alert('Ball in the hole!\nBest Times:\n' + bestTimes.map((time, index) => `${index + 1}. ${time.toFixed(2)}s`).join('\n'));
        resetGame();
    }
}

function checkCollision(ball, hole) {
    let distance = Math.sqrt(Math.pow(ball.x - hole.x, 2) + Math.pow(ball.y - hole.y, 2));
    return distance < (ballSize + holeSize) / 2;
}

function resetGame() {
    ballPosition = { x: 50, y: 50 };
    ball.style.left = ballPosition.x + 'px';
    ball.style.top = ballPosition.y + 'px';
    createHoles();
    startTime = null;
    timerDisplay.textContent = '0.00s';
}

function animate() {
    counter++;
    if (counter % 100 === 0) {
        const time = Date.now();
        const interval = time - lastTime;
        console.log(`Render 100 frames took: ${interval} [${1000 / (interval / 100)}fps]`);
        lastTime = time;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
