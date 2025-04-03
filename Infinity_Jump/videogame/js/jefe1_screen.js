// Variables principales del canvas
let canvas, ctx;
let canvasHeight = 667;
let canvasWidth = 1200;

// Variables del personaje principal
let mainCharacter;
let mainCharacterImage;





const textVida = new TextLabel (canvasWidth - 175 , canvasHeight / 2 - 300 , "30px Ubuntu Mono",  "black");
const barreraIzq = new Limite(0, 0, 10, canvasHeight, "rgb(111, 62, 67)");
const barreraDer = new Limite(canvasWidth -10, 0, 10, canvasHeight, "rgb(111, 62, 67)");
// const jefe1 = new Jefe1(canvasWidth/2,canvasHeight/2,100,100)


/**
 * Carga los assets (imágenes) y ejecuta la función cuando terminen de cargar
 */
function loadAssets(onAssetsLoaded) {
    mainCharacterImage = new Image();
    plataformImg = new Image();
    jefeImg = new Image();

    let imagesLoaded = 0;

    function checkLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            onAssetsLoaded();
        }
    }

    mainCharacterImage.onload = checkLoaded;
    plataformImg.onload = checkLoaded;
    //jefeImg.onload = checkLoaded;

    mainCharacterImage.src = "../Assets/Jump1.PNG";
    plataformImg.src = "../Assets/Plataforma1.png";
}

/**
 * Función principal, configura el canvas y carga los assets
 */
function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    loadAssets(startGame);
}

/**
 * Inicia el juego después de cargar las imágenes
 */
function startGame() {
    // Crear el personaje principal
    mainCharacter = new MainCharacter(
        canvasWidth / 2 - 47,
        canvasHeight / 2 + 275,
        40, 54, mainCharacterImage
    );
    mainCharacter.listenControls(); // Habilitar controles

    plataformList=[];

    // Crear plataformas manualmente
    plataformBase = new Plataform(-250, (canvasHeight / 2) + 300, 1500, 75, plataformImg);

    plataformAbajo1 = new Plataform(275, (canvasHeight / 2) + 200, 150, 25, plataformImg);
    plataformAbajo2 = new Plataform(675, (canvasHeight / 2) + 200, 150, 25, plataformImg);

    plataformMedio1 = new Plataform(75, (canvasHeight / 2) + 100,150, 25, plataformImg)
    plataformMedio2 = new Plataform(475, (canvasHeight / 2) + 100,150, 25, plataformImg)
    plataformMedio3 = new Plataform(875, (canvasHeight / 2) + 100,150, 25, plataformImg)

    plataformAlto1 = new Plataform(275, (canvasHeight / 2), 150, 25, plataformImg)
    plataformAlto2 = new Plataform(675, (canvasHeight / 2), 150, 25, plataformImg)

    plataformList.push(plataformBase);
    plataformList.push(plataformAbajo1);
    plataformList.push(plataformAbajo2);
    plataformList.push(plataformMedio1);
    plataformList.push(plataformMedio2);
    plataformList.push(plataformMedio3);
    plataformList.push(plataformAlto1);
    plataformList.push(plataformAlto2);

    // Comenzar el bucle de actualización
    requestAnimationFrame(update);
}

/**
 * Función que actualiza el juego continuamente
 */
function update() {
    requestAnimationFrame(update); // Mantener el loop
    mainCharacter.applyPhysics();

    for (let i = 0; i < plataformList.length; i++) {
        let p = plataformList[i];
        if (mainCharacter.detectCollision(p)) {
            mainCharacter.y = p.y - mainCharacter.height;
            mainCharacter.bounce();
        }
    }

    drawScene(); // Dibujar la escena
}

/**
 * Dibuja todos los elementos del juego en pantalla
 */
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar pantalla

    // Dibujar plataformas de forma individual
    plataformBase.draw(ctx);

    plataformAbajo1.draw(ctx);
    plataformAbajo2.draw(ctx);

    plataformMedio1.draw(ctx);
    plataformMedio2.draw(ctx);
    plataformMedio3.draw(ctx);

    plataformAlto1.draw(ctx);
    plataformAlto2.draw(ctx);


    barreraIzq.draw(ctx);
    barreraDer.draw(ctx);

    // Dibujar personaje
    mainCharacter.draw(ctx);

    textVida.draw(ctx, `Vida: ${mainCharacter.vida} %`);
}

// Ejecutar la función principal cuando cargue la página
window.onload = main;
