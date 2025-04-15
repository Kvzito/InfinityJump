class MainCharacter {
    constructor(x, y, width, height, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
        this.velocityX = 0;
        this.velocityY = -6;
        this.inicialVelY = -6;
        this.gravedad = 0.12;

        this.hitboxWidth = 20;
        this.hitboxHeight = 40;
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;

        this.vida = 100;
        this.strength = 500
        this.money = 0;

        // Variables para controlar invulnerabilidad
        this.invulnerable = false;
        this.invTimer = 0;

        // condiciones para e power up de escudo
        this.escudoActivo = false;
        this.imgEscudo = EscudoImg; 
    }

    // controles del maincharacter
    listenControls() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "d") {
                this.velocityX = 2;
            } else if (e.key === "ArrowLeft" || e.key === "a") {
                this.velocityX = -2;
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
if ( plataform.name == "plataformaPiso"){
    console.log(this.velocityY, this.hitboxHeight, this.hitboxWidth, this.x, this.y );
    console.log(plataform.x, plataform.y, plataform.height, plataform.width);
    
    
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
