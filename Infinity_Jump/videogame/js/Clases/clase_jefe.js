class Jefe {
    constructor(x, y, width, height, vida, strength, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vida = vida;
        this.strength = strength;
        this.img = img;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    recibirDaño(cantidad) {
        this.vida -= cantidad;
        if (this.vida < 0) this.vida = 0;
    }

    atacar(jugador) {
        jugador.vida -= this.strength;
    }
}
