var canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 300;
var c = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
document.documentElement.style.overflow = 'hidden';

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    return false;
})

window.addEventListener('mousemove', function (event) {

    mouse.x = event.x-rect.left;
    mouse.y = event.y-rect.top;
})

window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rect = canvas.getBoundingClientRect();
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
})

function init() {
    state = new GamePlay(new Board(100), c);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    state.update();
    state.render(c);
    if (state.switchGameMode) {
        state = new GameOver(state.board, c, state.turn);
    }
}
init();
animate();