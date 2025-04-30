class Jefe2 extends Jefe {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, 1000, 20, img);
        
        // Parámetros internos
        this.proyectiles = [];
        this.cooldown = 0;
        this.maxCooldown = 100; 

        // Hitboxes
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = this.height - 20;
        this.topHitboxHeight = 10;

        // Movimiento
        this.direccion = 1;
        this.velocidadX = 4.5;

        this.visible = true;
    }

    update(jugador) {
        // Movimiento horizontal con rebote usando deltaTime
        this.x += this.velocidadX * this.direccion * deltaTime * 60;

        if (this.x <= 0) {
            this.x = 0;
            this.direccion = 1;
        } else if (this.x + this.width >= canvasWidth) {
            this.x = canvasWidth - this.width;
            this.direccion = -1;
        }
        // Disparo con cooldown usando deltaTime
        if (this.cooldown <= 0) {
            this.disparar(jugador);
            this.cooldown = this.maxCooldown;
        } else {
            this.cooldown -= deltaTime * 60;
        }

        this.proyectiles = this.proyectiles.filter(p => {
            p.update();
    
            if (p.colisionaCon(jugador)) {
                if (!jugador.invulnerable) {
                    if (jugador.escudoActivo) {
                        jugador.escudoActivo = false;
                    } else {
                        jugador.vida -= 7; // daño al jugador
                        playSound("throw")
                    }
                    jugador.activarInvulnerabilidad();
                }
                return false; // Elimina el proyectil tras hacer daño
            }
    
            return p.tiempoVida > 0; // Mantiene proyectiles vivos
        });
    }

    disparar(jugador) {
        const proyectil = new Proyectil(
            this.x + this.width / 2,
            this.y + this.height / 2,
            jugador,
            125,
            proyectilImg // ← imagen global definida fuera
        );
        this.proyectiles.push(proyectil);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        // Dibujar hitbox principal (rojo)
        ctx.strokeStyle = "red";
        ctx.strokeRect(
            this.x + this.hitboxOffsetX,
            this.y + this.hitboxOffsetY,
            this.hitboxWidth,
            this.hitboxHeight
        );

        // Dibujar hitbox superior (verde)
        ctx.strokeStyle = "green";
        ctx.strokeRect(
            this.x,
            this.y,
            this.width - 5,
            this.topHitboxHeight
        );

        // Dibujar proyectiles
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
            this.recibirDaño(jugador.strength);
            jugador.bounce();
            playSound("hitEnemy");
            this.x = 50 + Math.random() * (canvasWidth - 100);

            // Se empuja al jefe en X según la dirección del jugador
            this.x += 50 * (jugador.x < this.x ? 1 : -1);
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