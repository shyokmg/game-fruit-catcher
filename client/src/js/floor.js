import {canvas, c} from './index'

export default class Floor {
    constructor() {
        this.canvas = canvas;
        this.c = c;
        this.position = {
            x: 0,
            y: 516
        };
        this.width = 1024;
        this.height = 60;
    }

    draw() {
        this.c.fillStyle = 'blue';
        this.c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}
