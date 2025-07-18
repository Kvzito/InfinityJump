function levelJefe3() {
    cambiarMusicaNivel("alien");
    let LevelList = [];

    jefe = new Jefe3(400, 200, 120, 120, jefe3Img);
    const textVidaJefe = new TextLabel(canvasWidth / 2 - 80, 50, "30px Pixelify Sans", "white");
    const barreraIzq = new Limite(-10, 0, 10, canvasHeight, "rgb(111, 62, 67)");
    const barreraDer = new Limite(canvasWidth + 10, 0, 10, canvasHeight, "rgb(111, 62, 67)");

    mainCharacter.x = canvasWidth / 2;
    mainCharacter.y = canvasHeight - 150;
    mainCharacter.velocityX = 0;
    mainCharacter.velocityY = -3.5;
    mainCharacter.listenControls();

    LevelList = [
        jefe,
        new Plataform((canvasWidth/2) - 400, canvasHeight / 2 + 280, 800, 75, plataformImg3, "plataformaPiso"),
        barreraIzq,
        barreraDer,
        new Plataform(275, canvasHeight / 2 + 200, 100, 25, plataformImg3),
        new Plataform(675, canvasHeight / 2 + 200, 100, 25, plataformImg3),
        new Plataform(75, canvasHeight / 2 + 100, 100, 25, plataformImg3),
        new Plataform(475, canvasHeight / 2 + 100, 100, 25, plataformImg3),
        new Plataform(875, canvasHeight / 2 + 100, 100, 25, plataformImg3),
        new Plataform(275, canvasHeight / 2, 100, 25, plataformImg3),
        new Plataform(675, canvasHeight / 2, 100, 25, plataformImg3)
    ];

    currentUpdate = function () {
        mainCharacter.applyPhysics();

        for (let i = 0; i < LevelList.length; i++) {
            let p = LevelList[i];
            if (mainCharacter.detectCollision && mainCharacter.detectCollision(p)) {
                mainCharacter.y = p.y - mainCharacter.height;
                mainCharacter.bounce();
                playSound("plataforma");
            }

            if (p instanceof PlataformCambio && p.checkCollision(mainCharacter)) {
                nextLevel(); // Avanza al siguiente nivel
                return; 
            }
        }

        // Detener movimiento si toca las barreras laterales
        if (mainCharacter.x <= barreraIzq.x + barreraIzq.width) {
            mainCharacter.x = barreraIzq.x + barreraIzq.width;
            mainCharacter.velocityX = 0;
        }

        if (mainCharacter.x + mainCharacter.width >= barreraDer.x) {
            mainCharacter.x = barreraDer.x - mainCharacter.width;
            mainCharacter.velocityX = 0;
        }

        if (jefe.visible) {
            jefe.update(mainCharacter);
            jefe.detectarColisionConJugador(mainCharacter);

            if (jefe.vida <= 0) {
                jefe.visible = false;

                setTimeout(() => {
                    actualizarOpcionesMejora();
                    document.getElementById("mejorasPopup").style.display = "block";
                    gameRunning = false; // pausa el juego mientras eliges
                }, 500);

                mainCharacter.x = canvasWidth / 2 - 47;
                mainCharacter.y = canvasHeight / 2 + 200;
                mainCharacter.velocityX = 0;
                mainCharacter.velocityY = 0;
                mainCharacter.listenControls();

                LevelList.push(new Plataform(475, canvasHeight / 2 - 100, 150, 25, plataformImg3)),
                LevelList.push(new Plataform(475, canvasHeight / 2 - 200, 150, 25, plataformImg3)),
                LevelList.push(new PlataformCambio(-250, -5,1500, 50, portalImg));
                
            }
        }

        
    };

    currentDraw = function (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fondoEspacioImg, 0, 0, canvas.width, canvas.height);

        for (let obj of LevelList) {
            if (obj instanceof Jefe3 && !obj.visible) continue;
            obj.draw(ctx);
        }

        textVidaJefe.draw(ctx, `Vida Jefe: ${jefe.vida}`);

    };
}