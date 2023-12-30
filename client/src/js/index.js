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

    if(boxCollision(player, floor)) {
        player.velocity.y = 0;
    }
}

// collision detection
function boxCollision(obj1, obj2) {
    if (obj1.position.y + obj1.height <= obj2.position.y &&
        obj1.position.y + obj1.height + obj1.velocity.y >= obj2.position.y &&
        obj1.position.x + obj1.width >= obj2.position.x &&
        obj1.position.x <= obj2.position.x + obj2.width) {
        return true;
    }
}

init();
animate();