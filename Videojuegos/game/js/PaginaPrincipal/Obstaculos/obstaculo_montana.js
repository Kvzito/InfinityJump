class ObstaculoMontana {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 250; // Ancho total del obstáculo
        this.height = 50; // Altura de la parte superior
        this.curveHeight = 10; // Altura de las curvas
        this.color = "black";
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Línea base
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);

        // Curva izquierda (subida)
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x + this.width * 0.1, this.y - this.curveHeight * 0.4,  // Primer control
            this.x + this.width * 0.25, this.y - this.curveHeight,       // Segundo control
            this.x + this.width * 0.4, this.y - this.height              // Punto final (inicio de la parte plana)
        );

        // Parte superior plana
        ctx.lineTo(this.x + this.width * 0.6, this.y - this.height);

        // Curva derecha (bajada)
        ctx.bezierCurveTo(
            this.x + this.width * 0.75, this.y - this.curveHeight,       // Primer control
            this.x + this.width * 0.9, this.y - this.curveHeight * 0.4,  // Segundo control
            this.x + this.width, this.y                                  // Punto final (de vuelta a la base)
        );

        ctx.stroke();
    }
}

window.ObstaculoMontana = ObstaculoMontana;
