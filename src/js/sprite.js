import { canvas, c } from "./index";

export default class Sprite {
    constructor(imgSrc, {position}){
        this.canvas = canvas;
        this.c = c;
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
    }

    draw() {
        this.c.drawImage(
            this.image,
            this.position.x,
            this.position.y
        )
    }
}
