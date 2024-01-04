import '../css/style.css';
import backgroundImg from '../images/background1.png';
import playButtomImg from '../images/play.png'

import Sprite from './sprite';
import Button from './button';
import Player from './player';
import Fruit from './fruit';
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;

canvas.width = 1024;
canvas.height = 576;
export { canvas, c, gravity };

let playButtonState = false;
let playButton;
let player;
let fruits = [];

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imgSrc: backgroundImg
});

let lastKey
let isHit = false

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
  up: {
    pressed: false
  }
}



function init() {
  spawnPlayer();
  createPlayButton();
  update();
}

function update() {
  requestAnimationFrame(update)
  background.draw();
  // playButton.draw();
  player.update(keys, lastKey, isHit);

  if (fruits) {
    fruits.forEach((fruit, i) => {
      fruit.update();
      if (boxCollision(fruit, player)) {
        isHit = true;
        fruit.isHit = true;
        
        if(fruit.collected) {
          fruits.splice(i, 1);
        }
        // fruit.currentSprite = fruit.sprites.despawn
        // fruit.velocity = 0;
        // fruit.frames = 0;
        
       setTimeout( () => {
          isHit = false
        }, 250);

        // fruits.splice(i, 1);

      }

      if (fruit.position.y > canvas.height) {
        fruits.splice(i, 1);
      }
    })
  }

  // Play button pressed
  if (playButtonState) {
    spawnFruit(10)
    
    playButtonState = false
    // isHit = true
    // console.log('play button on')
    // setTimeout(() => {
    //   isHit = false
    // }, 250);
    

  } else {
    // console.log('play button off')
    // isHit = false
    playButton.draw();
  }

 
}
init();

// function playCollision() {
//   if (isHit) {
//     setTimeout(() => {
//       isHit = false
//     }, 500);
//     return true
//   } return false
// }


function createPlayButton() {
  playButton = new Button({
    position: {
      x: canvas.width / 2 - 50,
      y: canvas.height / 3
    },
    imgSrc: playButtomImg
  });
}

function spawnPlayer() {
  player = new Player()
}

function spawnFruit(num) {
  for (let i = 0; i < num; i++){
    fruits.push( new Fruit())
  }
}

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
      keys.up.pressed = true;
      // lastKey = 'up'
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
      keys.up.pressed = false;
      break;
  }
});

// Button click event
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (!playButtonState && playButton.inBounds(x, y)) {
    if (playButtonState) {
      playButtonState = false;
    } else {
      playButtonState = true;
    }
  }
});