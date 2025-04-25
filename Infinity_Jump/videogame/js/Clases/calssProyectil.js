class Proyectil {
    constructor(x, y, target, tiempoVida, img) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.target = target;
        this.tiempoVida = tiempoVida;
        this.velocidad = 1.7;
        this.img = img;
    }

    update() {
        if (this.tiempoVida > 0) {
            const dx = (this.target.x + this.target.width / 2) - this.x;
            const dy = (this.target.y + this.target.height / 2) - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
    
            if (dist !== 0) {
                this.x += (dx / dist) * this.velocidad * deltaTime * 60;
                this.y += (dy / dist) * this.velocidad * deltaTime * 60;
            }
    
            this.tiempoVida -= deltaTime * 60;
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
