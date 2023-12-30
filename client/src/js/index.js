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

let lastKey

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

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
    console.log(player.position.x)
  // If right or left keys are pressed move right or left in 5px
  if (keys.right.pressed && player.position.x < 977) {
    player.velocity.x = player.speed;
    
  } else if (keys.left.pressed && player.position.x > 0) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
  }


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

// Event listener for pressing down on a key 
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      // left key: A
      case 65:
        keys.left.pressed = true;
        lastKey = 'left'
        break;
      // down key: S
      case 83:
        break;
      // right key: D
      case 68:
        keys.right.pressed = true;
        lastKey = 'right'
  
        break;
      // up key: W
      case 87:
        break;
    }
  });
  
  // Event listener for releasing off of a key 
  addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
      // left key: A
      case 65:
        keys.left.pressed = false;
      // down key: S
      case 83:
        break;
      // right key: D
      case 68:
        keys.right.pressed = false;
        break;
      // up key: W
      case 87:
        break;
    }
  });