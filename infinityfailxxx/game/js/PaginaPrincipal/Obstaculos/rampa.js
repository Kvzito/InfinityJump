class ObstaculoRampaGap {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 100;
        this.gapWidth = 60; // Tamaño del espacio vacío
        this.color = "black";
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Rampa de subida
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width * 0.4, this.y - this.height);
        ctx.stroke();

        // Rampa de bajada (después del espacio)
        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.4 + this.gapWidth, this.y - this.height);
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
        } else if (relativeX < this.width * 0.4 + this.gapWidth) {
            // Espacio vacío
            return null;
        } else {
            // Bajada
            const t = (relativeX - this.width * 0.4 - this.gapWidth) / (this.width * 0.6 - this.gapWidth);
            return this.y - (1 - t) * this.height;
        }
    }
}
