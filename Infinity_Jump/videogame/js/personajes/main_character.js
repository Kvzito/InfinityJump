class MainCharacter {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.velocityX = 0;
        this.velocityY = -12;
        this.inicialVelY = -12;
        this.gravedad = 0.45;
        this.speed = 4; // Base speed for horizontal movement

        this.hitboxWidth = 20;
        this.hitboxHeight = 40;
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;

        this.vida = 100;
        this.strength = 50;
        this.money = 0;

        // Variables para controlar invulnerabilidad
        this.invulnerable = false;
        this.invTimer = 0;

        // condiciones para e power up de escudo
        this.escudoActivo = false;
        this.imgEscudo = EscudoImg; 

        this.pressingRight = false;
        this.pressingLeft = false;
    }

    setVelocityX(velocity){
        this.velocityX = velocity;
    }

    // controles del maincharacter
    listenControls() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "d") {
                this.pressingRight = true;
            } else if (e.key === "ArrowLeft" || e.key === "a") {
                this.pressingLeft = true;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowRight" || e.key === "d") {
                this.pressingRight = false;
                this.setVelocityX(0);
            } else if (e.key === "ArrowLeft" || e.key === "a") {
                this.pressingLeft = false;
                this.setVelocityX(0);
            }
        });
    }

    executeMoves() {
        if (this.pressingLeft && this.pressingRight) {
            this.velocityX = 0; 
        } else if (this.pressingLeft) {
            this.velocityX = -this.speed;
        } else if (this.pressingRight) {
            this.velocityX = this.speed;
        } else {
            this.velocityX = 0;
        }
    }

    // fisicas que tendra el main character 
    applyPhysics() {
        // Apply gravity with deltaTime
        this.velocityY += this.gravedad * deltaTime * 60;
        
        // Move character with deltaTime
        this.y += this.velocityY * deltaTime * 60;
        this.x += this.velocityX * deltaTime * 60;

        // Invulnerabilidad para que no reciba tanto daño en un solo contacto 
        if (this.invulnerable) {
            // Reduce timer based on real time not frames
            this.invTimer -= deltaTime * 60;
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
        // Hitbox del jugador
        ctx.strokeStyle = "red"; 
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.x + this.hitboxOffsetX,
            this.y + this.hitboxOffsetY,
            this.hitboxWidth,
            this.hitboxHeight
        );

        //dibuja la imagen del escudo que se pone al rededor del personaje
        if (this.escudoActivo && this.imgEscudo) {
            ctx.drawImage(
                this.imgEscudo,
                this.x - 25, this.y - 25,
                this.width + 50, this.height + 50
            );
        }

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // colicion con plataformas y jefes
    detectCollision(plataform) {
        if (plataform.name == "plataformaPiso") {
            // console.log code...
        }

        let hitboxX = this.x + this.hitboxOffsetX;
        let hitboxY = this.y + this.hitboxOffsetY;
        let isFalling = this.velocityY >= 0;

        let isInsideX = hitboxX + this.hitboxWidth > plataform.x && hitboxX < plataform.x + plataform.width;
        let isTouchingTop = hitboxY + this.hitboxHeight >= plataform.y && hitboxY + this.hitboxHeight <= plataform.y + 10;

        let isAbove = (this.y + this.height) <= (plataform.y+15);
        return isFalling && isInsideX && isTouchingTop && isAbove;
    }

    activarInvulnerabilidad(duracion = 75) {
        this.invulnerable = true;
        this.invTimer = duracion; 
    }
}