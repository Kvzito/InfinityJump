// funcion para la hit box de la bola con picos
function boxOverlap(obj1, obj2) {
    return obj1.x + obj1.width > obj2.x &&
           obj1.x < obj2.x + obj2.width &&
           obj1.y + obj1.height > obj2.y &&
           obj1.y < obj2.y + obj2.height;
}

// esto crea el nivel 1 para usarlo desde level_manager
function level1() {
    document.body.addEventListener("click", () => {
        if (enableMusic) {
            cambiarMusicaNivel("bosque");
        }
    }, { once: true });

    // variables del nivel
    const level1Config = {
        probMov: 10,
        probStatic: 70,
        probSuperJump: 7,
        probEscudo: 7,
        probOne: 10,
        probOff: 10,
        ProbBolaPicos: 20,
        LevelList: [],
    };
    let PlataformManager;

    // usamos las imágenes ya cargadas en main.js (globales)
    // reposicionamos al personaje global y activamos sus controles
    mainCharacter.x = canvasWidth / 2 - 47;
    mainCharacter.y = (canvasHeight/2) + 70;
    mainCharacter.velocityX = 0;
    mainCharacter.velocityY = -3.5;
    mainCharacter.listenControls();

    // creamos la lista de plataformas para este nivel con su configuración
    PlataformManager = new PM(level1Config); // usa config para este nivel
    PlataformManager.img = plataformImg1;
    PlataformManager.imgOne = singleImg1;
    PlataformManager.placePlataforms();

    // esta funcion se actualiza en cada frame
    currentUpdate = function () {
        // aplicas las fisicas que creaste en la clase del personaje principal al objeto de personaje principal
        

        // hace que se bajen las plataformas si el personaje pasa mas de la mitad del canvas 
        if (mainCharacter.y < canvasHeight / 2) {
            let dy = (canvasHeight / 2) - mainCharacter.y;
            mainCharacter.y = canvasHeight / 2;

            for (let j = 0; j < PlataformManager.list.length; j++) {
                PlataformManager.list[j].move(dy); // Baja todas las plataformas
            }
            
        }

        // revisa colisiones con cada elemento de la lista de plataformas
        for (let i = 0; i < PlataformManager.list.length; i++) {
            let p = PlataformManager.list[i];

            // Movimiento de las plataformas
            if (p instanceof MovingPlataform) {
                p.moveX();
            }
            if (p instanceof BolaPicos) {
                p.moveX();
                if (boxOverlap(mainCharacter, p)) {
                    p.applyEffect(mainCharacter);
                }
            }

            // colicion de las plataformas
            if (p instanceof OnePlataform) {
                if (p.checkCollision(mainCharacter)) {
                    PlataformManager.list.splice(i, 1); // Elimina la plataforma del array
                    mainCharacter.y = p.y - mainCharacter.height;
                    mainCharacter.bounce();
                    playSound("plataforma");
                    i--; 
                }
            } else if (p instanceof PlataformaOff) {
                if (p.checkCollision(mainCharacter)) {
                    mainCharacter.y = p.y - mainCharacter.height;
                    mainCharacter.bounce();
                    playSound("plataforma");
                }
            } else if (mainCharacter.detectCollision(p)) {
                mainCharacter.y = p.y - mainCharacter.height;
                mainCharacter.bounce();
                playSound("plataforma");
            }

            // si toca un power up, se activa su efecto
            if (p instanceof PowerUp && p.detectCollision(mainCharacter)) {
                p.applyEffect(mainCharacter);
                if (!(p instanceof BolaPicos)) {
                    playSound("power"); // solo si NO es BolaPicos
                }
            }

            // cuando colisiona con una plataforma de cambio, avanza de nivel sin recargar
            if (p instanceof PlataformCambio) {
                if (p.checkCollision(mainCharacter)) {
                    nextLevel(); // cambio de nivel aquí
                }
            }
        }

        mainCharacter.applyPhysics();

        // eliminamos las plataformas que ya no se ven
        PlataformManager.list = PlataformManager.list.filter(p => p.y < canvasHeight && !p.active);

        // Generar nuevas plataformas si es necesario
        let last = PlataformManager.list[PlataformManager.list.length - 1];
        if (last && last.y > 0 && !PlataformManager.cPlataform) {
            PlataformManager.newPlataform();
        }

        // si el personaje cae, termina el juego
        if (mainCharacter.y > canvasHeight) {
            mostrarGameOver();
            gameRunning = false;
        }
    };

    // esto dibuja el nivel (sin el personaje ni el texto de vida)
    currentDraw = function (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < PlataformManager.list.length; i++) {
            PlataformManager.list[i].draw(ctx);
        }
    };    
    
}


