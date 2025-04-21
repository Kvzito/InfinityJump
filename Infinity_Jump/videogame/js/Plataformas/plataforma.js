class Plataform{
    constructor(x, y, width, height, img, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.name = name || "plataforma"
    }

    move(dy) {
        this.y += dy;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}