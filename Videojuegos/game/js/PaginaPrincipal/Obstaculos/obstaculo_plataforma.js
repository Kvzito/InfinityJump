class ObstaculoPlataforma {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 120; // Ancho del obstáculo
        this.height = 20; // Altura del obstáculo
        this.color = "rojo";
        this.speed = 0.5; // Velocidad de movimiento
        this.direction = 1; // Dirección de movimiento (1 = abajo, -1 = arriba)
        this.startY = y;
        this.minY = canvasHeight/2; // Posición mínima
        this.maxY = canvasHeight - 100; // Posición máxima
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed * this.direction;
        if (this.y >= this.maxY || this.y <= this.minY) {
            this.direction *= -1; // Cambiar de dirección al alcanzar los límites
        }
    }

    getHeightAt(x) {
        if (x < this.x || x > this.x + this.width) {
            return null; // Fuera del rango del obstáculo
        }
        if (y == this.y  && x == this.x){
            return this.y;
        }
    }
}