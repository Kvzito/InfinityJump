class ObstaculoMontana {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 300; // Ancho total del obstáculo
        this.height = 100; // Altura máxima del obstáculo
        this.color = "black";
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Inicia desde la base izquierda
        ctx.moveTo(this.x, this.y);

        // Rampa de subida
        ctx.lineTo(this.x + this.width * 0.4, this.y - this.height);

        // Parte superior plana
        ctx.lineTo(this.x + this.width * 0.6, this.y - this.height);

        // Rampa de bajada
        ctx.lineTo(this.x + this.width, this.y);

        ctx.stroke();
    }

    getHeightAt(x) {
        if (x < this.x || x > this.x + this.width) return null;

        const relativeX = x - this.x;

        if (relativeX < this.width * 0.4) {
            // Subida
            const t = relativeX / (this.width * 0.4);
            return this.y - t * this.height;
        } else if (relativeX < this.width * 0.6) {
            // Parte plana
            return this.y - this.height;
        } else {
            // Bajada
            const t = (relativeX - this.width * 0.6) / (this.width * 0.4);
            return this.y - (1 - t) * this.height;
        }
    }
}