import { canvas, c } from './index';
// color, width, height, speed, points, 
export default class Fruit {
  constructor(color, width, height, speed, points, damage, { position = { x: 0, y: 0 } }) {
    this.canvas = canvas;
    this.c = c;
    this.gravity = 0.05;
    this.color = color;
    this.width = width;
    this.height = height;
    this.points = points;
    this.damage = damage;
    this.position = position;
    this.speed = speed;
    this.velocity = {
      x: 0,
      y: speed, // Set a constant y velocity for the fruit's fall
    };
    this.width = width;
    this.height = height;
  }

  draw() {
    this.c.fillStyle = this.color;
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