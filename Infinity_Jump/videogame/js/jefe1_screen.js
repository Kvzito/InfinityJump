// Variables principales del canvas
let canvas, ctx;
let canvasHeight = 667;
let canvasWidth = 1200;

// Variables del personaje principal y del jefe
let mainCharacter;
let mainCharacterImage;
let jefeImgIzq;
let jefeImgDer;
let jefe;

// Lista para todo el contenido del nivel
let LevelList = [];

const TextVidaJefe = new TextLabel(20 , 35, "30px Ubuntu Mono", "black");

const barreraIzq = new Limite(0, 0, 10, canvasHeight, "rgb(111, 62, 67)");
const barreraDer = new Limite(canvasWidth -10, 0, 10, canvasHeight, "rgb(111, 62, 67)");

// carga los assets 
function loadAssets(onAssetsLoaded) {
    mainCharacterImage = new Image();
    plataformImg = new Image();
    jefeImgIzq = new Image();
    jefeImgDer = new Image();

    let imagesLoaded = 0;

    function checkLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 4) {
            onAssetsLoaded();
        }
    }

    mainCharacterImage.onload = checkLoaded;
    plataformImg.onload = checkLoaded;
    jefeImgDer.onload = checkLoaded;
    jefeImgIzq.onload = checkLoaded;

    mainCharacterImage.src = "../Assets/Jump1.PNG";
    plataformImg.src = "../Assets/Plataforma1.png";
    jefeImgIzq.src = "../Assets/JefePlantaIzq.png";
    jefeImgDer.src = "../Assets/JefePlantaDer.png";
}


function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    loadAssets(startGame);
}

// inicia el juego hasta que se cargen las imagenes
function startGame() {
    LevelList = []; // Vaciar la lista antes de llenarla

    // Crear el personaje principal, hace que funcione su movimineto y lo agrega a la lista de nivel
    mainCharacter = new MainCharacter(
        canvasWidth / 2 - 47,
        canvasHeight / 2 + 275,
        40, 54, mainCharacterImage
    );
    mainCharacter.listenControls(); // Habilitar controles
    LevelList.push(mainCharacter);

    // Crear el jefe y lo mete a la lista del nivel 
    jefe = new Jefe1(canvasWidth / 2, canvasHeight / 2 - 200, 120, 120, jefeImgIzq);
    LevelList.push(jefe);

    // mete las barreras a la lista del nivel 
    LevelList.push(barreraIzq, barreraDer);

    // Crear plataformas manualmente
    let plataformBase = new Plataform(-250, (canvasHeight / 2) + 300, 1500, 75, plataformImg);
    let plataformAbajo1 = new Plataform(275, (canvasHeight / 2) + 200, 150, 25, plataformImg);
    let plataformAbajo2 = new Plataform(675, (canvasHeight / 2) + 200, 150, 25, plataformImg);
    let plataformMedio1 = new Plataform(75, (canvasHeight / 2) + 100, 150, 25, plataformImg);
    let plataformMedio2 = new Plataform(475, (canvasHeight / 2) + 100, 150, 25, plataformImg);
    let plataformMedio3 = new Plataform(875, (canvasHeight / 2) + 100, 150, 25, plataformImg);
    let plataformAlto1 = new Plataform(275, (canvasHeight / 2), 150, 25, plataformImg);
    let plataformAlto2 = new Plataform(675, (canvasHeight / 2), 150, 25, plataformImg);

    LevelList.push(
        plataformBase, plataformAbajo1, plataformAbajo2,
        plataformMedio1, plataformMedio2, plataformMedio3,
        plataformAlto1, plataformAlto2
    );

    // Comenzar el bucle de actualización
    requestAnimationFrame(update);
}


// Función que actualiza el juego continuamente
function update() {
    requestAnimationFrame(update); // Mantener el loop

    // Aplicar física al personaje principal
    mainCharacter.applyPhysics();

    // Verificar colisión con plataformas u objetos
    for (let i = 0; i < LevelList.length; i++) {
        let p = LevelList[i];
        if (mainCharacter.detectCollision && mainCharacter.detectCollision(p)) {
            mainCharacter.y = p.y - mainCharacter.height;
            mainCharacter.bounce();
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

    // Lógica especial del jefe
    if (jefe.visible) {
        jefe.update();
        jefe.detectarColisionConJugador(mainCharacter);
    }

    if (jefe.vida <= 0) {
        jefe.visible = false;
    }

    if (mainCharacter.vida <= 0) {
        mostrarGameOver();
        return;
    }

    // Dibujar todo
    drawScene();
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar pantalla

    for (let i = 0; i < LevelList.length; i++) {
        let obj = LevelList[i];

        // Dibujar al jefe solo si está visible
        if (obj instanceof Jefe1 && !obj.visible) continue;

        obj.draw(ctx);
    }

    // Dibujar textos de vida
    textVida.draw(ctx, `Vida: ${mainCharacter.vida} %`);
    TextVidaJefe.draw(ctx, `Vida Jefe: ${jefe.vida}`);
}

function mostrarGameOver() {
    document.getElementById("gameOverScreen").style.display = "block";
}

function reiniciarJuego() {
    window.location.href = "../html/nivel_1_screen.html"; // Ajusta si es necesario
}

// Ejecutar la función principal cuando cargue la página
window.onload = main;
