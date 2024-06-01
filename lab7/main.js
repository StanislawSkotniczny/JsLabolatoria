const numBallsInput = document.getElementById('numBalls');
const distanceInput = document.getElementById('distance');
const forceInput = document.getElementById('force');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('linesCanvas');
const ctx = canvas.getContext('2d');

let balls = [];
let animationId;
let mouseX = null;
let mouseY = null;
let forceStrength = 1;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('click', onMouseClick);

function startGame() {
    resetGame();
    const numBalls = parseInt(numBallsInput.value);
    const distance = parseInt(distanceInput.value) / 100 * window.innerWidth;
    forceStrength = parseFloat(forceInput.value);
    createBalls(numBalls);
    animateBalls(distance);
}

function resetGame() {
    cancelAnimationFrame(animationId);
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ballElements = document.querySelectorAll('.ball');
    ballElements.forEach(ball => ball.remove());
}

function createBalls(numBalls) {
    for (let i = 0; i < numBalls; i++) {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
        ball.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
        gameContainer.appendChild(ball);

        balls.push({
            element: ball,
            x: parseFloat(ball.style.left),
            y: parseFloat(ball.style.top),
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2
        });
    }
}

function animateBalls(distance) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x <= 0 || ball.x >= window.innerWidth - 20) ball.dx *= -1;
        if (ball.y <= 0 || ball.y >= window.innerHeight - 20) ball.dy *= -1;

        if (mouseX !== null && mouseY !== null) {
            const dist = Math.sqrt(Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2));
            if (dist < 100) {
                const angle = Math.atan2(ball.y - mouseY, ball.x - mouseX);
                ball.dx += Math.cos(angle) * forceStrength / dist;
                ball.dy += Math.sin(angle) * forceStrength / dist;
            }
        }

        ball.element.style.left = `${ball.x}px`;
        ball.element.style.top = `${ball.y}px`;
    });

    drawLines(distance);
    animationId = requestAnimationFrame(() => animateBalls(distance));
}

function drawLines(distance) {
    balls.forEach((ball1, index) => {
        for (let i = index + 1; i < balls.length; i++) {
            const ball2 = balls[i];
            const dist = Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2));
            if (dist < distance) {
                ctx.beginPath();
                ctx.moveTo(ball1.x + 10, ball1.y + 10);
                ctx.lineTo(ball2.x + 10, ball2.y + 10);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    });
}

function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseClick(event) {
    balls.forEach((ball, index) => {
        const rect = ball.element.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
            gameContainer.removeChild(ball.element);
            balls.splice(index, 1);
            createBalls(2);
        }
    });
}
