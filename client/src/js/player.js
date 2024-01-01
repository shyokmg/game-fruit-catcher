import { canvas, c, gravity } from "./index";


export default class Player {
    constructor(){
        this.canvas = canvas;
        this.c = c;
        this.gravity = gravity;
        this.speed = 15
        this.position = {
            x: 487,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50;
        this.height = 50;
    }

    draw() {
        
        this.c.fillStyle = 'red';
        this.c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            this.velocity.y += this.gravity;
        }
    }
}
