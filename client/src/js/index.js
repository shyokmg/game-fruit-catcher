import '../css/style.css';
import Player from './player';
import Floor from './floor';
import Fruit from './fruit';
import Button from './button';
import Text from './text';
import { fruitType } from './fruitType';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;

canvas.width = 1024;
canvas.height = 576;
export { canvas, c, gravity };

let score = 0;
let hearts = 10;
let level = 1;
let player = new Player()
let floor = new Floor();
let scoreText;
let levelText;
let healthText;
let gameOverText;
let fruitCounter;
let fruits = []
let buttons = []
let startGame;
let restartGame;
let nextLevel;
let nextLevelState;
let lastKey;
let animationId;

// check movement state
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

// check button ui state
const buttonState = {
  pressed: false
}

// initialize button ui
startGame = new Button('Start Game', 'yellow', 'black');
startGame.setPosition(canvas.width / 2 - 100, 250);
startGame.setSize(200, 75);
buttons.push(startGame);

nextLevel = new Button('Next Level', 'yellow', 'black');
nextLevel.setPosition(canvas.width / 2 - 100, 250);
nextLevel.setSize(200, 75);
buttons.push(nextLevel);

restartGame = new Button('Play again', 'yellow', 'black');
restartGame.setPosition(canvas.width / 2 - 100, 250);
restartGame.setSize(200, 75);
buttons.push(restartGame);

// initialize game
function init() {
  setBackground();
  let gameTitle = new Text('FRUIT CATCHER', 'black', 50, 'center', canvas.width/2, canvas.height/3);
  buttonState.pressed = false;
  startGame.draw();
  gameTitle.draw();
  score = 0;
}

init();

// start state when button is pressed
function startState() {
  player = new Player();
  floor = new Floor();
  fruits = [];
  hearts = 10;
  if (level === 1) score = 0;
  isLevel(level);
  fruitCounter = fruits.length;
}

// update function to animate canvas
function update() {
  animationId = requestAnimationFrame(update)
  setBackground();
  buttonState.pressed = true;

  // Set up game meters
  scoreText = new Text(`Score: ${score}`, 'black', 30, 'left', 30, 31);
  levelText = new Text(`Level: ${level}`, 'black', 30, 'center', canvas.width / 2, 31);
  healthText = new Text(`Hearts: ${hearts}`, 'black', 30, 'right', canvas.width - 30, 31);
  gameOverText = new Text(`Game Over Your Score is: ${score}`, 'black', 50, 'center', canvas.width / 2, 220);
  
  // Draw meters
  scoreText.draw();
  levelText.draw();
  healthText.draw();
  
  // Draw the floor and the player
  floor.draw();
  player.update();

  // loop through fruit list and check for collisions
  fruits.forEach((fruit, i) => {
    fruit.update();
    if (boxCollision(fruit, floor)) {
      fruits.splice(i, 1);
      --fruitCounter;
    }
    if (boxCollision(fruit, player)) {
      player.color = 'red'
      setTimeout(() => {
        player.color = 'purple'
      }, 250);

      fruits.splice(i, 1);
      score += fruit.points;
      hearts -= fruit.damage;
      --fruitCounter;
    }
  });

  // Game conditions when game is over, or proceeds to next level
  
  // check if out of hearts restarts the game
  if (hearts <= 0) {
    buttonState.pressed = false;
    nextLevelState = false;
    fruits = [];
    gameOverText.draw();
    restartGame.draw();

  // check if pass procced to next level
  } else if (fruitCounter <= 0 && level < 5) {
    // endState(true);
    buttonState.pressed = false;
    nextLevelState = true;
    nextLevel.draw();

// check if current level is 5 and restarts the game
  } else if (fruitCounter <= 0 && level >= 5) {
    buttonState.pressed = false;
    nextLevelState = false;
    gameOverText.draw();
    restartGame.draw();
  }

  // condition for basic player movement
  if (keys.right.pressed && player.position.x < canvas.width - player.width) {
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

// Default background
function setBackground() {
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.textAlign = 'center';
}

// Logic to spawn fruits
function getRandomFruits(num, addSpeed, addPoints, addDamage) {
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

  // Add fruit properties based on level
  fruitList.forEach((fruit, i) => {
    const yOffset = i * (-300);
    let xPosition = Math.floor(Math.random() * 1000);
    randomFruits.push(
      new Fruit(
        fruit.color,
        fruit.size.width,
        fruit.size.height,
        fruit.speed + addSpeed,
        fruit.points * addPoints,
        fruit.damage * addDamage,
        {
          position: {
            x: xPosition,
            y: yOffset
          }
        })
    )
  })
  return randomFruits;
}

// collision detection
function boxCollision(obj1, obj2) {
  let obj1Right = obj1.position.x + obj1.width;
  let obj1Bottom = obj1.position.y + obj1.height;
  let obj2Right = obj2.position.x + obj2.width;
  let obj2Bottom = obj2.position.y + obj2.height;

  if (obj1.position.x < obj2Right &&
    obj1Right > obj2.position.x &&
    obj1.position.y < obj2Bottom &&
    obj1Bottom > obj2.position.y) {
    return true;
  } return false;
}

// create fruits based on level
function isLevel(level) {
  switch (level) {
    // level 1
    case 1:
      fruits = getRandomFruits(15, 0, 1, 1)
      break;
    // level 2
    case 2:
      fruits = getRandomFruits(20, 2, 2, 1)
      break;
    // level 3
    case 3:
      fruits = getRandomFruits(25, 3, 3, 2)
      break;
    // level 4
    case 4:
      fruits = getRandomFruits(30, 4, 4, 2.5)
      break;
    // level 5
    case 5:
      fruits = getRandomFruits(35, 5, 5, 3)
      break;
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

// Button click event
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // loop through button list and check level state
  buttons.forEach(button => {
    if (button.inBounds(x, y) && !buttonState.pressed) {
      cancelAnimationFrame(animationId);
      if (nextLevelState) {
        ++level
      } else {
        level = 1
      }
      startState();
      update();
    }
  });
});

