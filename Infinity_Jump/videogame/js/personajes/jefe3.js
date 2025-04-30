class Jefe3 extends Jefe {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, 1300, 40, img);

        // Hitboxes
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = this.height - 20;
        this.topHitboxHeight = 10;

        // Movimiento
        this.angle = 0;
        this.direction = 1;
        this.speedX = 8;

        // Disparo
        this.proyectiles = [];
        this.cooldown = 0;
        this.maxCooldown = 100;

        this.visible = true;
    }

    update(jugador) {
        // Movimiento horizontal con rebote
        this.x += this.speedX * this.direction * deltaTime * 60;
        if (this.x <= 0 || this.x + this.width >= canvasWidth) {
            this.direction *= -1;
        }

        // Movimiento vertical en onda seno
        this.angle += 0.02 * deltaTime * 60;
        this.y += Math.sin(this.angle) * 2 * deltaTime * 60;

        // Disparo con cooldown
        if (this.cooldown <= 0) {
            this.disparar(jugador);
            this.cooldown = this.maxCooldown;
        } else {
            this.cooldown -= deltaTime * 60;
        }

        // Update proyectiles
        this.proyectiles = this.proyectiles.filter(p => {
            p.update();
            if (p.colisionaCon(jugador)) {
                if (!jugador.invulnerable) {
                    if (jugador.escudoActivo) {
                        jugador.escudoActivo = false;
                    } else {
                        jugador.vida -= 7;
                        playSound("throw");
                    }
                    jugador.activarInvulnerabilidad();
                }
                return false;
            }
            return p.tiempoVida > 0;
        });
    }

    disparar(jugador) {
        const proyectil = new Proyectil(
            this.x + this.width / 2,
            this.y + this.height / 2,
            jugador,
            125,
            proyectilJefe3
        );
        this.proyectiles.push(proyectil);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        ctx.strokeStyle = "red";
        ctx.strokeRect(
            this.x + this.hitboxOffsetX,
            this.y + this.hitboxOffsetY,
            this.hitboxWidth,
            this.hitboxHeight
        );

        ctx.strokeStyle = "green";
        ctx.strokeRect(
            this.x,
            this.y,
            this.width - 5,
            this.topHitboxHeight
        );

        for (let p of this.proyectiles) {
            p.draw(ctx);
        }
    }

    detectarColisionConJugador(jugador) {
        const jugadorBottom = jugador.y + jugador.height;
        const jugadorTop = jugador.y;
        const jugadorCenterX = jugador.x + jugador.width / 2;
        const dentroX = jugadorCenterX > this.x && jugadorCenterX < this.x + this.width;
        const estaCayendo = jugador.velocityY > 0;

        const golpeaCabeza = estaCayendo &&
            dentroX &&
            jugadorBottom <= this.y + this.topHitboxHeight + 10 &&
            jugadorBottom >= this.y;

        const golpeNormal = dentroX &&
            jugadorBottom > this.y + this.hitboxOffsetY &&
            jugadorTop < this.y + this.hitboxOffsetY + this.hitboxHeight;

        if (golpeaCabeza) {
            this.vida -= jugador.strength;
            jugador.bounce();
            playSound("hitEnemy");
        } else if (golpeNormal && !jugador.invulnerable) {
            if (jugador.escudoActivo) {
                jugador.escudoActivo = false;
            } else {
                jugador.vida -= this.strength;
                playSound("attack");
            }
            jugador.activarInvulnerabilidad();
        }
    }
}
