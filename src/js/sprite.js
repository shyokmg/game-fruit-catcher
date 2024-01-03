import { canvas, c } from "./index";

export default class Sprite {
    constructor({
        position = {x:0, y:0},
        imgSrc,
        
    }){
        this.canvas = canvas;
        this.c = c;
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.width = this.image.width,
            this.height = this.image.height
        }
        this.image.src = imgSrc
        
    }

    draw() {
        this.c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}
