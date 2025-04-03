class Coche {
    constructor(x, y, width, height, imageSrc) {
        this.x = x; // Posición inicial en X
        this.y = y; // Posición inicial en Y
        this.width = width; // Ancho del coche
        this.height = height; // Altura del coche
        this.image = new Image(); // Imagen del coche
        this.image.src = imageSrc; // Ruta de la imagen

        this.imageLoaded = false; // Bandera para verificar si la imagen se cargó
        this.image.onload = () => {
            this.imageLoaded = true;
            console.log("Imagen del coche cargada correctamente.");
        };

        // Propiedades físicas
        this.xSpeed = 0; // Velocidad horizontal
        this.ySpeed = 0; // Velocidad vertical
        this.gravity = 0.7; // Fuerza de gravedad
        this.friction = 0.98; // Fricción para reducir la velocidad horizontal
        this.grounded = false; // Indica si el coche está en el suelo
        this.rot = 0; // Rotación del coche
        this.rSpeed = 0; // Velocidad de rotación
    }

    update(obstacles) {
        // Aplicar gravedad si el coche no está en el suelo
        if (!this.grounded) {
            this.ySpeed += this.gravity;
        }
    
        // Actualizar posición vertical
        this.y += this.ySpeed;
    
        // Detectar colisión con el terreno y obstáculos
        this.grounded = false; // Suponer que el coche no está en el suelo
        for (const obstacle of obstacles) {
            const obstacleHeight = obstacle.getHeightAt(this.x);
            const nextObstacleHeight = obstacle.getHeightAt(this.x + 1); // Altura en el siguiente punto (para calcular inclinación)
    
            if (obstacleHeight !== null && this.y + this.height / 2 >= obstacleHeight) {
                this.y = obstacleHeight - this.height / 2; // Ajustar posición al obstáculo
                this.grounded = true; // El coche está en el suelo
    
                // Calcular la inclinación del terreno
                if (nextObstacleHeight !== null) {
                    const dx = 1; // Diferencia en X
                    const dy = nextObstacleHeight - obstacleHeight; // Diferencia en Y
                    this.rot = Math.atan2(dy, dx); // Calcular el ángulo de inclinación
                }
    
                // Si el coche tiene suficiente velocidad, permitir que se despegue
<<<<<<< HEAD
                if (this.xSpeed > 20) { // Ajusta este valor según la velocidad mínima para saltar
=======
                if (this.xSpeed > 5) { // Ajusta este valor según la velocidad mínima para saltar
>>>>>>> 259530bb5c9ca020e3de34668a77777808bb326c
                    this.grounded = false; // El coche se despega
                    this.ySpeed = -this.xSpeed * 0.7; // Aplica un impulso vertical proporcional a la velocidad
                }
            }
        }
    
        // Aplicar fricción a la velocidad horizontal
        this.xSpeed *= this.friction;
    
        // Actualizar posición horizontal
        this.x += this.xSpeed;
    
        // Limitar la rotación
        if (this.rot > Math.PI) this.rot = -Math.PI;
        if (this.rot < -Math.PI) this.rot = Math.PI;
    }

    
    
    


    draw(ctx) {
        if (this.imageLoaded) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        } else {
            console.warn("La imagen del coche aún no se ha cargado.");
        }
    }

    move(dx) {
        // Aplicar fuerza horizontal
        this.xSpeed += dx;
    }

    getHitCircle() {
        const radius = Math.min(this.width, this.height) / 2 * 0.8; // Ajusta el 0.8 si quieres que sea más chico
        return {
            x: this.x,
            y: this.y,
            radius: radius
        };
    }
}

window.Coche = Coche;