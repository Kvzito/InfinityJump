class Terreno {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 5; // Grosor del terreno
    }

    draw(ctx) {
        ctx.strokeStyle = "black"; // Color del terreno
        ctx.lineWidth = this.height; // Grosor de la línea
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); // Punto inicial
        ctx.lineTo(this.x + this.width, this.y); // Punto final
        ctx.stroke();
    }

    getHeightAt(x) {
        if (x < this.x || x > this.x + this.width) {
            return null; // Fuera del rango del terreno
        }
        return this.y; // Altura constante del terreno
    }
}