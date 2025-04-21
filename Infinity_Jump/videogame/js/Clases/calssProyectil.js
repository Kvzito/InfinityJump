class Proyectil {
    constructor(x, y, target, tiempoVida, img) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.target = target;
        this.tiempoVida = tiempoVida;
        this.velocidad = 2;
        this.img = img;
    }

    update() {
        if (this.tiempoVida > 0) {
            const dx = this.target.x + this.target.width / 2 - this.x;
            const dy = this.target.y + this.target.height / 2 - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            this.x += (dx / dist) * this.velocidad;
            this.y += (dy / dist) * this.velocidad;
            this.tiempoVida--;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);

        // Hitbox circular (para depuración)
        ctx.strokeStyle = "purpule";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }

    colisionaCon(jugador) {
        const dx = jugador.x + jugador.width / 2 - this.x;
        const dy = jugador.y + jugador.height / 2 - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.size + jugador.width / 2;
    }
}
