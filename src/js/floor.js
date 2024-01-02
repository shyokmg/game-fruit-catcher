import {canvas, c} from './index'

export default class Floor {
    constructor() {
        this.canvas = canvas;
        this.c = c;
        this.width = 1024;
        this.height = 80;
        this.position = {
            x: 0,
            y: canvas.height - this.height
        };
    }

    draw() {
        // this.c.fillStyle = 'blue';
        this.c.fillStyle = 'rgba(0, 0, 255, 0)';
        this.c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}