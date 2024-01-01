import { canvas, c } from './index';

export default class Fruit {
  constructor({ position = { x: 0, y: 0 } }) {
    this.canvas = canvas;
    this.c = c;
    this.gravity = 0.05;
    this.position = position;
    this.velocity = {
      x: 0,
      y: 5, // Set a constant y velocity for the fruit's fall
    };
    this.width = 20;
    this.height = 20;
  }

  draw() {
    this.c.fillStyle = 'green';
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
  }
}