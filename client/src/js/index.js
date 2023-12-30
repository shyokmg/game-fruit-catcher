import '../css/style.css';
const Player = require('./player');
const Floor = require('./floor');

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;

canvas.width = 1024;
canvas.height = 576;


let player = new Player(canvas, c, gravity)
let floor = new Floor(canvas, c);

function init() {
    player = new Player(canvas, c, gravity);
    floor = new Floor(canvas, c);
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height);

    floor.draw();
    player.update();
}

init();
animate();