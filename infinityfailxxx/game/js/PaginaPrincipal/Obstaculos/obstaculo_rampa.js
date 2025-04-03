class ObstaculoRampa {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 250; // Ancho total del obstáculo
        this.height = 50; // Altura de la parte superior
        this.curveHeight = 10; // Altura de las curvas
        this.color = "black";
    }


    // funcion para dibujar el obstaculo
    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Línea base
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);

        // rampa subida
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width * 0.6, this.y - this.height);

        // línea derecha
        ctx.moveTo(this.x + this.width * 0.6, this.y - this.height);
        ctx.lineTo(this.x + this.width * 0.6, this.y);

        ctx.stroke();
    }

    getHeightAt(x) {
        // Verifica si el punto está dentro del ancho del obstáculo
        if (x < this.x || x > this.x + this.width) {
            return null; // Fuera del rango del obstáculo
        }

        const relativeX = x - this.x; // Posición relativa dentro del obstáculo

        if (relativeX < this.width * 0.6) {
            // Rampa de subida
            const t = relativeX / (this.width * 0.6); // Normalizar a [0, 1]
            return this.y - t * this.height;
        } else {
            // Parte vertical recta hacia abajo
            return this.y + this.height;
        }
    }
}