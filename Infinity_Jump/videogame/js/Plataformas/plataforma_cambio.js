class PlataformCambio extends Plataform {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img);
    }

    checkCollision(player) {
        if (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        ) {
            return true; 
        }
        return false;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}