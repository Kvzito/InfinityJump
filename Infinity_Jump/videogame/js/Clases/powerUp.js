class PowerUp {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.active = false;
    }

    draw(ctx) {
        if (!this.active) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

         // Dibuja la hitbox más chica para depuración
        // ctx.strokeStyle = "purple";
        // ctx.lineWidth = 1;
        // ctx.strokeRect(
        //     this.x + 8, // offset X
        //     this.y + 8, // offset Y
        //     this.width - 16, // ancho reducido
        //     this.height - 16 // alto reducido
        // );
    }

    detectCollision(player) {
        return !this.active &&
               player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    move(dy) {
        this.y += dy;
    }
}
