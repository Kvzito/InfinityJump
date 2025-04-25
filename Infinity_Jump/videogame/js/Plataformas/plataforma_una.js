class OnePlataform extends Plataform {
    constructor(x, y, width, height, img, name) {
        super(x, y, width, height, img, name);
        this.visible = true;
    }

    move(dy) {
        super.move(dy);
    }

    checkCollision(player) {
        if (
            this.visible &&
            player.x + player.hitboxOffsetX < this.x + this.width &&
            player.x + player.hitboxOffsetX + player.hitboxWidth > this.x &&
            player.y + player.hitboxOffsetY + player.hitboxHeight > this.y &&
            player.y + player.hitboxOffsetY + player.hitboxHeight < this.y + 10 &&
            player.velocityY > 0 
        ) {
            return true;
        }
        return false;
    }
}
