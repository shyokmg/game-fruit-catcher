import '../css/style.css';
import backgroundImg from '../images/background1.png';
import playButtomImg from '../images/play.png'
import playerIdleRight from "../images/playerIdleRight.png"
import playerIdleLeft from "../images/playerIdleLeft.png"
import Sprite from './sprite';
import Button from './button';
import Player from './player';
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;

canvas.width = 1024;
canvas.height = 576;
export { canvas, c, gravity };

let playButtonState = false;
let playButton;
let player;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imgSrc: backgroundImg
});

let lastKey

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

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

function init() {
  spawnPlayer();
  createPlayButton();
  update();
}

function update() {
  requestAnimationFrame(update)
  background.draw();
  player.update();

  // Start game:
  if (playButtonState) {
    // console.log('play button on')
    // setTimeout(() => {
    //   playButtonState = false
    // }, 5000);
    // init();

  } else {
    // console.log('play button off')
    // playButton.show();
    playButton.draw();
  }

  if (keys.right.pressed && player.position.x < canvas.width - player.width) {
    player.velocity.x = player.speed;
  } else if (keys.left.pressed && player.position.x > 0) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
  }

  if (keys.right.pressed && lastKey === 'right' && 
  player.currentSprite !== player.sprites.run.right) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width
  } else if (keys.left.pressed && lastKey === 'left' &&
  player.currentSprite !== player.sprites.run.left) {
    player.currentSprite = player.sprites.run.left;
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width
  } else if (!keys.left.pressed && lastKey === 'left' &&
  player.currentSprite !== player.sprites.stand.left) {
    player.currentSprite = player.sprites.stand.left;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width
  } else if (!keys.right.pressed && lastKey === 'right' &&
  player.currentSprite !== player.sprites.stand.right) {
    player.currentSprite = player.sprites.stand.right;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width
  }
}
init();

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

  if (!playButtonState && playButton.inBounds(x, y)) {
    if (playButtonState) {
      playButtonState = false;
    } else {
      playButtonState = true;
    }
  }
});