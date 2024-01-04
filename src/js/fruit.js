import { canvas, c } from './index';
import cherry from '../images/cherries.png'
import fruitDespawn from '../images/fruitDespawn.png'
// color, width, height, speed, points, 


export default class Fruit {
  constructor() {
    this.isHit = false;
    this.collected = false;
    this.speed = 1
    this.position = {
      x: Math.floor(Math.random() * 1000),
      y:  Math.floor(Math.random() * 11) * -100
    }
    this.velocity = {
      x:0,
      y:this.speed,
    }
    this.gravity = 0.05
    this.width = 32
    this.height = 32
    this.image = createImage(cherry);
    this.frames = 0;
    this.sprites = {
      idle: createImage(cherry),
      despawn: createImage(fruitDespawn),
      cropWidth: 32,
      width: 32
    }
    this.currentCropWidth = 32
    this.currentSprite = this.sprites.idle
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      32,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    this.frames++;
    if (this.frames > 33 && this.currentSprite === this.sprites.idle ) {
      this.frames = 0;
    } else if (this.frames > 11 && this.currentSprite === this.sprites.despawn) {
      // this.frames = 0;
      this.collected = true;
    }
    this.draw()
    this.position.y += this.velocity.y;

    if (!this.isHit && this.currentSprite !== this.sprites.idle) {
        this.frames = 1;
        this.currentSprite = this.sprites.idle;
      } else if (this.isHit && this.currentSprite !== this.sprites.despawn) {
        this.frames = 1;
        this.currentSprite = this.sprites.despawn;
      }

  //   if (this.position.y + this.height >= canvas.height - 96) {
  //     this.velocity.y = 0;
  //     this.currentSprite = this.sprites.despawn
  //     // this.frames = 0;
  // }
  }



}


function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc;
  return image;
}




// export default class Fruit {
//   constructor(name, color, width, height, speed, points, damage, imgSrc, frames={max:17}, { position = { x: 0, y: 0 } }) {
//     this.canvas = canvas;
//     this.c = c;
//     this.gravity = 0.05;
//     this.name = name
//     this.color = color;
//     this.width = width;
//     this.height = height;
//     this.points = points;
//     this.damage = damage;
//     this.image = new Image()
//     this.image.src = imgSrc
//     this.frames = {
//       max: frames.max,
//       current: 0,
//       elapsed: 0,
//       hold: 3
//     }
//     this.position = position;
//     this.speed = speed;
//     this.velocity = {
//       x: 0,
//       y: speed, // Set a constant y velocity for the fruit's fall
//     };
//     this.width = width;
//     this.height = height;
//   }

//   draw() {
//     this.c.fillStyle = this.color;
//     this.c.fillRect(
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     );

//     const cropWidth = this.image.width / this.frames.max
//     const crop = {
//       position: {
//         x: cropWidth * this.frames.current,
//         y: 0
//       },
//       width: cropWidth,
//       height: this.image.height
//     }
//     this.c.drawImage(
//       this.image,
//       crop.position.x,
//       crop.position.y,
//       crop.width,
//       crop.height,
//       this.position.x,
//       this.position.y,
//       crop.width,
//       crop.height
//     )
//   }

//   update() {
//     this.frames.elapsed++
//     if (this.frames.elapsed % this.frames.hold === 0) {
//       this.frames.current++
//       if (this.frames.current >= this.frames.max) {
//         this.frames.current = 0
//       }
//     }
//     this.draw();
//     console.log(`THIS FRAME IS${this.frames.elapsed}`)
//     this.position.y += this.velocity.y;
//     this.position.x += this.velocity.x;
//   }
// }