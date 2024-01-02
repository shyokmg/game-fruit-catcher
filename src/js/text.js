import {canvas, c} from './index'

export default class Text {
    constructor(text, textColor, fontSize, align, x, y) {
        this.canvas = canvas;
        this.c = c;
        this.text = text
        this.textColor = textColor
        this.fontSize = fontSize
        this.align = align
        this.x = x
        this.y = y
    }
    draw() {
        // text
        this.c.fillStyle = this.textColor;
        this.c.textAlign = this.align;
        this.c.textBaseline = 'middle';
        this.c.font = `${this.fontSize}px sans-serif`;
        this.c.fillText(this.text, this.x, this.y);
    }
}
