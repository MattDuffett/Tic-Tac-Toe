var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var board = [0, 0, 0,
    0, 0, 0,
    0, 0, 0];

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    return false;
})

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})
leftMouseDown = false;
rightMouseDown = false;
window.addEventListener('mousedown', function (event) {
    if (event.which == 1) {
        leftMouseDown = true;
    } else if (event.which == 3) {
        rightMouseDown = true;
    }
})
window.addEventListener('mouseup', function (event) {
    leftMouseDown = false;
    rightMouseDown = false;
    coolDown = false;
})

turn = false;
coolDown = false;
function init() {
}
gameOver = false;
function checkForEndGame() {
    sum=0;
    if(checkWin(1)){
        gameOver = true;
        return 1;
    }
    if(checkWin(2)){
        gameOver = true;
        return 2;
    }
        
    for(var i = 0; i < board.length;i++){
        if(board[i] == 0){
            sum++;
        }
    }
    if(sum==0){
        gameOver = true;
        return 0;
    }
    return -1;
}

function checkWin(player){
    if(board[0]==player & board[1]==player&board[2]==player){
        return true;
    }
    if(board[0+3]==player & board[1+3]==player&board[2+3]==player){
        return true;
    }
    if(board[0+2*3]==player & board[1+2*3]==player&board[2+2*3]==player){
        return true;
    }
    if(board[0]==player & board[0+3]==player&board[0+2*3]==player){
        return true;
    }
    if(board[1]==player & board[1+3]==player&board[1+2*3]==player){
        return true;
    }
    if(board[2]==player & board[2+3]==player&board[2+2*3]==player){
        return true;
    }
    if(board[0]==player & board[1+1*3]==player&board[2+2*3]==player){
        return true;
    }
    if(board[2]==player & board[1+1*3]==player&board[0+2*3]==player){
        return true;
    }

    return false;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    c.beginPath();
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            c.rect(100 + 100 * x, 100 + 100 * y, 100, 100);
        }
    }
    c.strokeStyle = '#F0A202';
    c.stroke();

    for (var i = 0; i < board.length; i++) {
        x = i % 3;
        y = parseInt(i / 3);
        if (board[i] == 1) {
            c.beginPath();
            c.arc(150 + 100 * x, 150 + 100 * y, 50, 0, Math.PI * 2);
            c.strokeStyle = '#ff0000';
            c.stroke()
        } else if (board[i] == 2) {
            c.beginPath();
            c.moveTo(100 + x * 100, 100 + y * 100);
            c.lineTo(200 + x * 100, 200 + y * 100);
            c.moveTo(200 + x * 100, 100 + y * 100);
            c.lineTo(100 + x * 100, 200 + y * 100);
            c.strokeStyle = '#000000'
            c.stroke();
        }
    }

    if (leftMouseDown & !coolDown & !gameOver) {
        x = (mouse.x - 100) / 100;
        x = Math.floor(x);
        y = (mouse.y - 100) / 100;
        y = Math.floor(y);

        if (x < 3 & x >= 0 & y < 3 & y >= 0 & board[x+y*3]==0) {
            if (turn) {
                board[x + y * 3] = 2;
                turn = !turn;
                coolDown=true;
            } else if (!turn) {
                board[x + y * 3] = 1;
                turn = !turn;
                coolDown=true;

            }
        }
        
    }
    state = checkForEndGame();
    if(state == 1){
        c.beginPath()
        c.fillText("Player 1 Wins!!", 50,50)
        c.fillStyle = '#000000';
        c.fill();
    } else if(state == 2){
        c.beginPath()
        c.fillText("Player 2 Wins!!", 50,50)
        c.fillStyle = '#000000';
        c.fill();
    } else if(state==0){
        c.beginPath()
        c.fillText("Draw Game", 50,50)
        c.fillStyle = '#000000';
        c.fill();
    }
}

init();
animate();