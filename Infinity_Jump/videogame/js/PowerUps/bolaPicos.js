class BolaPicos extends PowerUp {
    constructor(x, y, img,) {
        super(x, y, 40, 40, img);
        this.originX = x;
        this.range = 100;
        this.speed = 1;
        this.direction = 1;
        this.cooldown = 0; // tiempo de espera entre daños
    }

    applyEffect(player) {
        if (this.cooldown <= 0 && !player.invulnerable) {
            if (player.escudoActivo) {
                player.escudoActivo = false;
            } else {
                player.vida -= 5;
                if (player.vida < 0) player.vida = 0;
                playSound("attack"); // mismo sonido del jefe
            }
            player.activarInvulnerabilidad();
            this.cooldown = 60;
        }
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
            this.direction =1;
        }

        if (this.cooldown > 0) {
            this.cooldown--; // reducir cooldown
        }
    }
}
