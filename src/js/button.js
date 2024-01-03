import { canvas, c } from './index'
import Sprite from './sprite'

export default class Button extends Sprite {
    constructor({ position = { x: 0, y: 0 }, imgSrc }) {
        super({position, imgSrc})
        this.position = position
    }
    draw() {
        super.draw()
    }
        // boolean to check if mouse is inbounds of button
    inBounds(mouseX, mouseY) {
        return !(mouseX < this.position.x || mouseX > this.position.x + this.width || mouseY < this.position.y || mouseY > this.position.y + this.height);
    }
}



// export default class Button {
//     constructor(text, fillColor, textColor) {
//         this.canvas = canvas;
//         this.c = c;

//         this.text = text
//         this.fillColor = fillColor
//         this.textColor = textColor
//     }
//     // set button position on canvas
//     setPosition(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     // set button size
//     setSize(width, height) {
//         this. width = width;
//         this. height = height;
//     }

//     // Draw button
//     draw() {
//         // button
//         this.c.fillStyle = this.fillColor;
//         this.c.fillRect(this.x, this.y, this.width, this.height);
//         this.c.strokeRect(this.x, this.y, this.width, this.height);
//         // text
//         this.c.fillStyle = this.textColor;
//         this.c.textAlign = 'center';
//         this.c.textBaseline = 'middle';
//         this.c.font = '25px sans-serif';
//         this.c.fillText(
//             this.text,
//             this.x + this.width /2,
//             this.y + this.height /2,
//             this.width
//         );
//     }

//     // boolean to check if mouse is inbounds of button
//     inBounds(mouseX, mouseY) {
//         return !(mouseX < this.x || mouseX > this.x + this.width || mouseY < this.y || mouseY > this.y + this.height);
//     }
// }
