class BarreraMovil {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed; // Velocidad de movimiento
        this.direction = 1; // 1: subiendo, -1: bajando
        this.maxOffset = 100; // Cuánto se mueve hacia arriba/abajo
        this.initialY = y;
    }

    update() {
        this.y += this.speed * this.direction;
        if (this.y <= this.initialY - this.maxOffset || this.y >= this.initialY) {
            this.direction *= -1;
            this.y = Math.max(this.initialY - this.maxOffset, Math.min(this.y, this.initialY));
        }   
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(coche) {
        const circle = coche.getHitCircle();
    
        // Encontrar el punto más cercano del rectángulo a la posición del círculo
        const closestX = Math.max(this.x, Math.min(circle.x, this.x + this.width));
        const closestY = Math.max(this.y, Math.min(circle.y, this.y + this.height));
    
        // Calcular distancia
        const dx = circle.x - closestX;
        const dy = circle.y - closestY;
    
        return (dx * dx + dy * dy) < (circle.radius * circle.radius);
    }
}
