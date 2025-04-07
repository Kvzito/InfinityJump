class MainCharacter {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.velocityX = 0;
        this.velocityY = -3.5;
        this.inicialVelY = -3.5;
        this.gravedad = 0.05;

        this.hitboxWidth = 20;
        this.hitboxHeight = 40;
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;

        this.vida = 100;
        this.strength = 50
        this.money = 0;

        // Variables para controlar invulnerabilidad
        this.invulnerable = false;
        this.invTimer = 0;
    }

    // controles del maincharacter
    listenControls() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "d") {
                this.velocityX = 1.5;
            } else if (e.key === "ArrowLeft" || e.key === "a") {
                this.velocityX = -1.5;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (["ArrowRight", "ArrowLeft", "d", "a"].includes(e.key)) {
                this.velocityX = 0;
            }
        });
    }

    // fisicas que tendra el main character 
    applyPhysics() {
        this.velocityY += this.gravedad;
        this.y += this.velocityY;
        this.x += this.velocityX;

        // Invulnerabilidad para que no reciba tanto daño en un solo contacto 
        if (this.invulnerable) {
            this.invTimer--;
            if (this.invTimer <= 0) {
                this.invulnerable = false; // Ya puede recibir daño de nuevo
            }
        }
    }

    // rebote en plataformas
    bounce() {
        this.velocityY = this.inicialVelY;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        // Hitbox del jugador
        ctx.strokeStyle = "red"; 
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.x + this.hitboxOffsetX,
            this.y + this.hitboxOffsetY,
            this.hitboxWidth,
            this.hitboxHeight
        );
    }

    // colicion con plataformas y jefes
    detectCollision(plataform) {
        let hitboxX = this.x + this.hitboxOffsetX;
        let hitboxY = this.y + this.hitboxOffsetY;
        let isFalling = this.velocityY >= 0;

        let isInsideX = hitboxX + this.hitboxWidth > plataform.x && hitboxX < plataform.x + plataform.width;
        let isTouchingTop = hitboxY + this.hitboxHeight >= plataform.y && hitboxY + this.hitboxHeight <= plataform.y + 10;

        let isAbove = this.y + this.height <= plataform.y + 10;
        return isFalling && isInsideX && isTouchingTop && isAbove;
    }

    activarInvulnerabilidad(duracion = 100) {
        this.invulnerable = true;
        this.invTimer = duracion; 
    }
}
