class PlataformaOff extends Plataform {
    constructor(x, y, width, height, img, name = "plataformaOff") {
        super(x, y, width, height, img, name);
        this.visible = true;

        setInterval(() => {
            this.visible = !this.visible;
        }, 2000);
    }

    checkCollision(player) {
        if (!this.visible) return false;

        return (
            player.x + player.hitboxOffsetX < this.x + this.width &&
            player.x + player.hitboxOffsetX + player.hitboxWidth > this.x &&
            player.y + player.hitboxOffsetY + player.hitboxHeight > this.y &&
            player.y + player.hitboxOffsetY + player.hitboxHeight < this.y + 10 &&
            player.velocityY > 0
        );
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx);
        }
    }
}
