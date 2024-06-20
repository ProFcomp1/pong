// Selecionando o canvas e configurando o contexto
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Variáveis do jogo
let player1Score = 0;
let player2Score = 0;
const paddleWidth = 10;
const paddleHeight = 100;
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    radius: 10
};
let player1 = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 8
};
let player2 = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 8
};

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar os jogadores
function drawPlayers() {
    ctx.fillStyle = '#000';
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

// Função para desenhar o placar
function drawScore() {
    ctx.font = '30px Arial';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
}

// Função para movimentar os jogadores
function movePlayers() {
    if (player1.y + player1.dy > 0 && player1.y + player1.dy < canvas.height - player1.height) {
        player1.y += player1.dy;
    }
    if (player2.y + player2.dy > 0 && player2.y + player2.dy < canvas.height - player2.height) {
        player2.y += player2.dy;
    }
}

// Função para movimentar a bola
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão com as bordas superior e inferior
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    // Colisão com as raquetes
    if (ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) {
        ball.dx = -ball.dx;
    }
    if (ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height) {
        ball.dx = -ball.dx;
    }

    // Verificando se a bola passou das raquetes (ponto para o adversário)
    if (ball.x - ball.radius < 0) {
        player2Score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1Score++;
        resetBall();
    }
}

// Função para reiniciar a bola no centro
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx; // Invertendo a direção inicial da bola
}

// Função principal de desenho e atualização do jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlayers();
    drawScore();
    movePlayers();
    moveBall();
    requestAnimationFrame(draw);
}

// Event listener para capturar movimentos do jogador 1
document.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        player1.dy = -8; // Movimento para cima
    } else if (event.key === 's') {
        player1.dy = 8; // Movimento para baixo
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'w' || event.key === 's') {
        player1.dy = 0; // Parar movimento
    }
});

// Iniciando o jogo
draw();
