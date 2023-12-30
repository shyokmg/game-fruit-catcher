class Floor {
    constructor(canvas, c) {
        this.canvas = canvas;
        this.c = c;
        this.position = {
            x: 0,
            y: 964
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

module.exports = Floor;