// esto crea el nivel del jefe para usarlo desde level_manager
function levelJefe1() {
    // Variables del personaje principal y del jefe
    let jefe;
    let LevelList = [];
    let plataformasExtraAgregadas = false;

    // textos y barreras 
    const textVidaJefe = new TextLabel(canvasWidth / 2 - 80, 50, "30px Pixelify Sans", "black");
    const barreraIzq = new Limite(-10, 0, 10, canvasHeight, "rgb(111, 62, 67)");
    const barreraDer = new Limite(canvasWidth + 10, 0, 10, canvasHeight, "rgb(111, 62, 67)");

    
        // reposicionamos al personaje global y activamos sus controles
        mainCharacter.x = canvasWidth / 2 - 47;
        mainCharacter.y = canvasHeight / 2 + 275;
        mainCharacter.velocityX = 0;
        mainCharacter.velocityY = -3.5;
        mainCharacter.listenControls();

        // Lista con todos los objetos del nivel
        LevelList = [
            mainCharacter,
            jefe = new Jefe1(canvasWidth / 2, canvasHeight / 2 - 200, 120, 120, jefeImgIzq),
            barreraIzq, barreraDer,
            new Plataform(-250, canvasHeight / 2 + 300, 1500, 75, plataformImg1, "plataformaPiso"),
            new Plataform(275, canvasHeight / 2 + 200, 150, 25, plataformImg1),
            new Plataform(675, canvasHeight / 2 + 200, 150, 25, plataformImg1),
            new Plataform(75, canvasHeight / 2 + 100, 150, 25, plataformImg1),
            new Plataform(475, canvasHeight / 2 + 100, 150, 25, plataformImg1),
            new Plataform(875, canvasHeight / 2 + 100, 150, 25, plataformImg1),
            new Plataform(275, canvasHeight / 2, 150, 25, plataformImg1),
            new Plataform(675, canvasHeight / 2, 150, 25, plataformImg1)
        ];

        // Función que actualiza el juego continuamente
        currentUpdate = function () {
            mainCharacter.applyPhysics();

            // Verificar colisión con plataformas u objetos
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

            // Lógica para el jefe
            if (jefe.visible) {
                jefe.update();
                jefe.detectarColisionConJugador(mainCharacter);

                if (jefe.vida <= 0) {
                    jefe.visible = false;
                    playSound("dead");
                    // puedes usar nextLevel(); si quieres continuar después
                
                    setTimeout(() => {
                        document.getElementById("mejorasPopup").style.display = "block";
                        gameRunning = false; // pausa el juego mientras eliges
                    }, 500);
                    mainCharacter.x = canvasWidth / 2 - 47;
                    mainCharacter.y = canvasHeight / 2 + 200;
                    mainCharacter.velocityX = 0;
                    mainCharacter.velocityY = 0;
                    mainCharacter.listenControls();

                    if (!plataformasExtraAgregadas) {
                        plataformasExtraAgregadas = true;
                
                        LevelList.push(
                            new Plataform(475, canvasHeight / 2 - 100, 150, 25, plataformImg1),
                            new Plataform(475, canvasHeight / 2 - 200, 150, 25, plataformImg1),
                            new PlataformCambio(-250, -5,1500, 100, plataformImg1)
    
                        );
                    }
    
    
                    
                }
            }

            
        };

        // Dibuja todos los objetos del nivel
        currentDraw = function (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < LevelList.length; i++) {
                let obj = LevelList[i];
                if (obj instanceof Jefe1 && !obj.visible) continue;
                obj.draw(ctx);
            }

            textVidaJefe.draw(ctx, `Vida Jefe: ${jefe.vida}`);
        };
};
