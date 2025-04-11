class Jefe1 extends Jefe {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, 500, 15, img); // vida = 100, daño = 20

        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = this.height - 20;

        this.topHitboxHeight = 10; 
        this.angle = 0; 
        this.direction = 1; 
        this.speedX = 4.3; 
        this.visible = true;    
    }

    update() {
        // Movimiento horizontal con rebote en bordes
        this.x += this.speedX * this.direction;
        if (this.x <= 0 || this.x + this.width >= canvasWidth) {
            this.direction *= -1;
        }
        
        if (this.direction > 0) {
            this.img = jefeImgDer; // Imagen mirando a la derecha
        } else {
            this.img = jefeImgIzq; // Imagen mirando a la izquierda
        }

        // Movimiento vertical tipo onda seno
        this.angle += 0.02;
        this.y += Math.sin(this.angle) * 2;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        // Hitbox principal que hace daño al main character
        ctx.strokeStyle = "red";
        ctx.strokeRect(
            this.x + this.hitboxOffsetX,
            this.y + this.hitboxOffsetY,
            this.hitboxWidth,
            this.hitboxHeight
        );

        // Hitbox superior el cual recibe daño si el maincharacter salta sobre el
        ctx.strokeStyle = "green";
        ctx.strokeRect(
            this.x,
            this.y,
            this.width - 5,
            this.topHitboxHeight
        );
    }

    // colisiones y como afectan sus estadisticas
    detectarColisionConJugador(jugador) {
        const jugadorBottom = jugador.y + jugador.height;
        const jugadorTop = jugador.y;
        const jugadorCenterX = jugador.x + jugador.width / 2;

        const dentroX = jugadorCenterX > this.x && jugadorCenterX < this.x + this.width;

        const estaCayendo = jugador.velocityY > 0;

        const golpeaCabeza = estaCayendo &&
            dentroX &&
            jugadorBottom <= this.y + this.topHitboxHeight + 10&&
            jugadorBottom >= this.y;

        const golpeNormal = dentroX &&
            jugadorBottom > this.y + this.hitboxOffsetY &&
            jugadorTop < this.y + this.hitboxOffsetY + this.hitboxHeight;

            if (golpeaCabeza) {
                this.vida -= jugador.strength; // quítale vida al jefe
                jugador.bounce(); // el jugador rebota
            } else if (golpeNormal && !jugador.invulnerable) {
                if (jugador.escudoActivo) {
                    jugador.escudoActivo = false;
                } else {
                    jugador.vida -= this.strength;
                }
                jugador.activarInvulnerabilidad();
            }
            
        
    }
}
