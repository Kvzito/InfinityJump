class MovingPlataform extends Plataform {
    constructor(x, y, width, height, img, range, speed) {
        super(x, y, width, height, img);
        this.originX = x;
        this.range = range;
        this.speed = speed;
        this.direction = 1;
    }

    move(dy) {
        super.move(dy);
    }

    moveX() {
        this.x += this.speed * this.direction;
        if (this.x > this.originX + this.range || this.x < this.originX - this.range) {
            this.direction *= -1;
        }
    }
}