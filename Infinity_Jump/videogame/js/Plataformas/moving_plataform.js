class MovingPlataform extends Plataform{
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
        this.x += this.speed * this.direction * deltaTime * 60;
    
        const max = this.originX + this.range;
        const min = this.originX - this.range;
    
        if (this.x >= max) {
            this.x = max;
            this.direction = -1;
        } else if (this.x <= min) {
            this.x = min;
            this.direction = 1;
        }
    }
    
}