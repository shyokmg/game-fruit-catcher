import '../css/style.css';
import Player from './player';
import Floor from './floor';
import Fruit from './fruit';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;
const button = document.querySelector('button');

canvas.width = 1024;
canvas.height = 576;
export { canvas, c, gravity };

let player = new Player()
let floor = new Floor();
let hearts;
let score;
let fruitCounter;
let lastKey
let fruits = []

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

function init() {
  // initialize
  player = new Player();
  floor = new Floor();
  hearts = 10;
  score = 0;
  fruits = [];
  fruitCounter = 30
  spawnFruit(fruitCounter);
}


function update() {
  requestAnimationFrame(update)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height);

  floor.draw();
  // console.log(hearts);
  player.update();

  fruits.forEach((fruit, i) => {
    fruit.update();
    if (boxCollision(fruit, floor)) {
      // fruit.velocity.y = 0;
      fruits.splice(i, 1);
      --fruitCounter;
      --hearts;
    }
    if (boxCollision(fruit, player)) {
      fruits.splice(i, 1);
      --fruitCounter;
      ++score;
    }
  });

  console.log(score);

  if (hearts <= 0) {
    console.log(`Game over, your score is ${score}`);
    // init();
    fruits = [];
    button.style.display = 'block';
  } else if (fruitCounter <= 0) {
    console.log(`Game over, your score is ${score}`)
    // init();
    button.style.display = 'block';
  }

  

  // If right or left keys are pressed move right or left in 5px
  if (keys.right.pressed && player.position.x < 977) {
    player.velocity.x = player.speed;

  } else if (keys.left.pressed && player.position.x > 0) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
  }


  if (boxCollision(player, floor)) {
    player.velocity.y = 0;
  }
}

update();

function spawnFruit(fruitCount) {
  for (let i = 1; i < fruitCount + 1; i++) {
    const yOffset = i * (-500);
    let xPosition = Math.floor(Math.random() * 1000);
    fruits.push(
      new Fruit({ position: { x: xPosition, y: yOffset } })
    )
  }
}

// spawnFruit(30);


// collision detection
function boxCollision(obj1, obj2) {
  if (obj1.position.y + obj1.height <= obj2.position.y &&
    obj1.position.y + obj1.height + obj1.velocity.y >= obj2.position.y &&
    obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width) {
    return true;
  }
}

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

button.addEventListener('click', (event) => {
  button.style.display = 'none';
  init();
  // spawnFruit(30);
})

