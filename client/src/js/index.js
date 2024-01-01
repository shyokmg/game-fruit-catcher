import '../css/style.css';
import Player from './player';
import Floor from './floor';
import Fruit from './fruit';
import Button from './button';
import {fruitType} from './fruitType';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;
// const button = document.querySelector('button');

canvas.width = 1024;
canvas.height = 576;
export { canvas, c, gravity };

let player = new Player()
let floor = new Floor();
let hearts = 10;
let score = 0;
let fruitCounter;
let fruits = []
let buttons = []
let startGame;
let restartGame;
let lastKey;
let animationId;

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

const buttonState = {
  pressed: false
}

startGame = new Button('Start Game', 'yellow', 'black');
startGame.setPosition(canvas.width/2 - 100, 250);
startGame.setSize(200, 75);
buttons.push(startGame);

restartGame = new Button('Play again', 'yellow', 'black');
restartGame.setPosition(canvas.width/2 - 100, 250);
restartGame.setSize(200, 75);
buttons.push(restartGame);

function init() {
  // initialize
  setBackground();
  buttonState.pressed = false;
  startGame.draw();
  console.log('heollow');
  // console.log(fruitType.length);
// let fruitLists = getRandomFruits(30);
// console.log(fruitLists);
}

init();

function startState() {
  player = new Player();
  floor = new Floor();
  hearts = 10;
  score = 0;
  fruits = getRandomFruits(30)
  fruitCounter = fruits.length;
  // spawnFruit(fruitCounter);
}

function endState() {
  buttonState.pressed = false;
  restartGame.draw();
}

function update() {
  animationId = requestAnimationFrame(update)
  setBackground();
  buttonState.pressed = true;
  // Score counter
  c.fillStyle = 'black'
  c.font = "30px sans-serif";
  c.fillText(`Score: ${score}`, 70, 31);

  // Heart counter
  c.fillStyle = 'black'
  c.font = "30px sans-serif";
  c.fillText(`Hearts: ${hearts}`, 870, 31);

  floor.draw();
  player.update();

  fruits.forEach((fruit, i) => {
    fruit.update();
    if (boxCollision(fruit, floor)) {
      fruits.splice(i, 1);
      --fruitCounter;
      // --hearts;
    }
    if (boxCollision(fruit, player)) {
      fruits.splice(i, 1);
      --fruitCounter;
      score += fruit.points;
      hearts -= fruit.damage;
    }
  });

  if (hearts <= 0 || fruitCounter <= 0) {
    c.fillStyle = 'black'
    c.font = "50px sans-serif";
    c.fillText(`Game Over Your Score is: ${score}`, 512, 220);
    fruits = [];
    endState();
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

function setBackground() {
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.textAlign = 'center';
}

// Spawn fruit
// function spawnFruit(fruitCount) {
//   for (let i = 1; i < fruitCount + 1; i++) {
//     const yOffset = i * (-500);
//     let xPosition = Math.floor(Math.random() * 1000);
//     fruits.push(
//       new Fruit({ position: { x: xPosition, y: yOffset } })
//     )
//   }
// }

function getRandomFruits(num) {
  let fruitList = []
  let randomFruits = []
  fruitType.forEach(fruit => {
    let count = Math.round(num * fruit.probability)
    for (let i = 0; i < count; i++) {
      fruitList.push(fruit);
    }
  });

  // Shuffle the fruits
  for (let i = fruitList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruitList[i], fruitList[j]] = [fruitList[j], fruitList[i]];
  }

  fruitList.forEach((fruit, i) => {
    const yOffset = i * (-500);
    let xPosition = Math.floor(Math.random() * 1000);
    randomFruits.push(
      new Fruit(
        fruit.color, 
        fruit.size.width, 
        fruit.size.height, 
        fruit.speed, 
        fruit.points,
        fruit.damage, 
        {position: {
          x: xPosition, 
          y: yOffset
        }
      })
    )
  })
  return randomFruits;
}

// Usage

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

canvas.addEventListener('click', (event) => {

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  buttons.forEach(button => {
    if (button.inBounds(x, y) && !buttonState.pressed){
      console.log('Click');
      cancelAnimationFrame(animationId);
      startState();
      update();
    }
  });
});