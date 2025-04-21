function levelJefe2() {
    let LevelList = [];

    jefe = new Jefe2(400, 200, 120, 120, jefe2Img);
    const barreraIzq = new Limite(-10, 0, 10, canvasHeight, "rgb(111, 62, 67)");
    const barreraDer = new Limite(canvasWidth + 10, 0, 10, canvasHeight, "rgb(111, 62, 67)");

    mainCharacter.x = canvasWidth / 2;
    mainCharacter.y = canvasHeight - 150;
    mainCharacter.velocityX = 0;
    mainCharacter.velocityY = -3.5;
    mainCharacter.listenControls();

    LevelList = [
        jefe,
        new Plataform(-250, canvasHeight / 2 + 300, 1500, 75, plataformImg2, "plataformaPiso"),
        barreraIzq,
        barreraDer,
        new Plataform(275, canvasHeight / 2 + 200, 100, 25, plataformImg2),
        new Plataform(675, canvasHeight / 2 + 200, 100, 25, plataformImg2),
        new Plataform(75, canvasHeight / 2 + 100, 100, 25, plataformImg2),
        new Plataform(475, canvasHeight / 2 + 100, 100, 25, plataformImg2),
        new Plataform(875, canvasHeight / 2 + 100, 100, 25, plataformImg2),
        new Plataform(275, canvasHeight / 2, 100, 25, plataformImg2),
        new Plataform(675, canvasHeight / 2, 100, 25, plataformImg2)
    ];

    currentUpdate = function () {
        mainCharacter.applyPhysics();

        for (let p of LevelList) {
            if (mainCharacter.detectCollision && mainCharacter.detectCollision(p)) {
                mainCharacter.y = p.y - mainCharacter.height;
                mainCharacter.bounce();
            }
        }

        if (jefe.visible) {
            jefe.update(mainCharacter);
            jefe.detectarColisionConJugador(mainCharacter);
        }

        if (jefe.vida <= 0) {
            jefe.visible = false;
            LevelList.push(new PlataformCambio(0, 0, 200, 20, plataformImg2));
        }
    };

    currentDraw = function (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fondoCieloImg, 0, 0, canvas.width, canvas.height);

        for (let obj of LevelList) {
            if (obj instanceof Jefe2 && !obj.visible) continue;
            obj.draw(ctx);
        }
    };
}