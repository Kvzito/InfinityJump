class PM {
    constructor(config) {
        this.probMov = config.probMov;
        this.probPowerUp = config.probPowerUp
        this.probStatic = config.probStatic;
        this.list = config.PListLevel1;
        this.img = null;
        this.cPlataform = false;
    }

    placePlataforms() {
        this.list = [];
        let start = new Plataform(canvasWidth / 2 - 45, canvasHeight - 150, 60, 18, this.img);
        this.list.push(start);

        let minX = canvasWidth * 0.4;
        let maxX = canvasWidth * 0.6;

        // Pone las primeras 10 plataformas
        for (let i = 1; i < 10; i++) {
            let randomX = Math.floor(Math.random() * (maxX - minX) + minX);

            let isMoving = Math.random() < (this.probMov / 100); // usa la probabilidad para saes que plataforma agregar a la lista
            let nPlataform;
            if (isMoving) {
                nPlataform = new MovingPlataform(randomX, canvasHeight - 90 * i - 70, 60, 18, this.img, 100, 0.5);
            } else {
                nPlataform = new Plataform(randomX, canvasHeight - 90 * i - 70, 60, 18, this.img);
            }
            this.list.push(nPlataform);
        }
    }

    // Metodo para ir agregando plataformas y powerups a la lista donde se imprimen las cosas
    newPlataform() {
        let minX = canvasWidth * 0.35;
        let maxX = canvasWidth * 0.65;
        let randomX = Math.floor(Math.random() * (maxX - minX) + minX);

        let lastY = this.list[this.list.length - 1]?.y || 0;
        let newY = lastY - 60;

        let isMoving = Math.random() < (this.probMov / 100);

        let p;
        if (isMoving) {
            p = new MovingPlataform(randomX, newY, 60, 18, this.img, 100, 0.5);
        } else {
            p = new Plataform(randomX, newY, 60, 18, this.img);
        }
        this.list.push(p);

        // agrega el power up a la lista
        if (Math.random() < this.probPowerUp / 100) {
            let powerUp = new SuperJump(
                p.x + (p.width / 2)-15,   // centrar sobre la plataforma
                p.y - 40,                   // justo arriba
                SuperJumpImg,
            );
            this.list.push(powerUp);
        }

        // contador de plataformas
        totalPlataforms++;

        // cuadno el contador llega a la cantidas indicada pone la plataforma de cambio en la lista para qeu salga en la pantalla 
        if (totalPlataforms >= 75 && !this.cPlataform) {
            let portal = new PlataformCambio(-250, newY - 150, 1500, 100, this.img, "../html/jefe_1_screen.html");
            this.list.push(portal);
            this.cPlataform = true;
        }
    }
}
