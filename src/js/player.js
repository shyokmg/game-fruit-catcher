import { canvas, c, gravity } from "./index";

import playerRunLeft from '../images/playerRunLeft.png';
import playerRunRight from '../images/playerRunRight.png';
import playerIdleLeft from '../images/playerIdleLeft.png';
import playerIdleRight from '../images/playerIdleRight.png';

export default class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: canvas.width/2,
            y: canvas.height/2
        }
        this.velocity = {
            x:0,
            y:0,
        }
        this.gravity = gravity

        this.width = 96;
        this.height = 96;
        this.image = createImage(playerIdleRight);
        this.frames = 0;
        this.sprites = {
          stand: {
            right: createImage(playerIdleRight),
            left: createImage(playerIdleLeft),
            cropWidth: 96,
            width: 96
          },
          run: {
            right: createImage(playerRunRight),
            left: createImage(playerRunLeft),
            cropWidth: 96,
            width: 96
          }
        }
    
        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 96
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames, // x position, start from width of character * the frames
            0,                                   // y position
            this.currentCropWidth,               // width per frame
            96,                                 // height of sprite/ frame
            this.position.x,
            this.position.y,
            this.width,
            this.height
          )
    }
    update() {
        this.frames++;
        if (this.frames > 10 && 
          (this.currentSprite === this.sprites.stand.right ||
            this.currentSprite === this.sprites.stand.left)) {
          this.frames = 0;
        } else if (this.frames > 11 && 
          (this.currentSprite === this.sprites.run.right || 
            this.currentSprite === this.sprites.run.left )) {
          this.frames = 0;
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
          this.velocity.y += gravity;
        }
        if (this.position.y + this.height >= canvas.height - 80) {
            this.velocity.y = 0;
        }
      }

}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc;
    return image;
  }



// export default class Player extends Sprite{
//     constructor({imgSrc}){
//         super({position, imgSrc})
//         this.canvas = canvas;
//         this.c = c;
//         this.gravity = gravity;
//         this.speed = 12
//         this.position = {
//             x: 487,
//             y: 100
//         }
//         this.velocity = {
//             x: 0,
//             y: 0
//         }
//         this.width = 50;
//         this.height = 50;
//         this.color = 'purple';
//     }

//     draw() {
        
//         this.c.fillStyle = this.color;
//         this.c.fillRect(
//             this.position.x,
//             this.position.y,
//             this.width,
//             this.height
//         );
//     }

//     update() {
//         this.draw();
//         this.position.y += this.velocity.y;
//         this.position.x += this.velocity.x;

//         if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
//             this.velocity.y += this.gravity;
//         }
//     }
// }
