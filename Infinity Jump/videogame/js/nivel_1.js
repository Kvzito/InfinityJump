let canvas;
let canvasHeight = 700;
let canvasWidth = 1200;
let ctx;

// Configuración del personaje principal
let mainCharacterWidth = 94;
let mainCharacterHeight = 100;
let mainCahracterX = canvasWidth / 2 - mainCharacterWidth / 2;
let mainCahracterY = canvasHeight * 7 / 8 - mainCharacterHeight;

// fisicas
let velocityX = 0;
let velocityY = 0;
let inicialVelY = -5; // velocidad inical 
let gravedad = 0.07;

// Hitbox reducido
let hitboxWidth = 30;
let hitboxHeight = 60;
let hitboxOffsetX = 22;
let hitboxOffsetY = 0   ;

// Objeto del personaje principal
let mainCahracter = {
    img: null,
    x: mainCahracterX,
    y: mainCahracterY,
    width: mainCharacterWidth,
    height: mainCharacterHeight,
};

// Configuración del spritesheet
const frameWidth = 30;
const frameHeight = 32;
const sheetColumns = 8;
let spriteSheet;

// plataformas
let plataformList = [];
let plataformWidth = 60;
let plataformHeight = 18;
let plataformImg;

/**
 * Función principal que configura el canvas, carga el spritesheet 
 * y activa los eventos y el ciclo de actualización.
 */
function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    // Cargar imagen del spritesheet y arrancar el loop cuando cargue
    spriteSheet = new Image();
    spriteSheet.src = "../Assets/AnimationSheet.png";

    spriteSheet.onload = function () {
        mainCahracter.img = spriteSheet;
        requestAnimationFrame(update); // Iniciar animación
    };

    plataformImg = new Image();
    plataformImg.src = "../Assets/Plataforma1.png";
    velocityY = inicialVelY;
    plataformImg.onload = function() {
        placePlataforms();
    };

    // Escuchar teclas para mover al personaje
    document.addEventListener("keydown", moveMainCharacter);
}

/**
 * Función que actualiza la posición del personaje y vuelve a dibujar el frame.
 * Se llama en bucle con requestAnimationFrame.
 */
function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Movimiento horizontal
    mainCahracter.x += velocityX;
    if (mainCahracter.x > canvasWidth) {
        mainCahracter.x = 0;
    } else if (mainCahracter.x + mainCahracter.width < 0) {
        mainCahracter.x = canvasWidth;
    }

    // Físicas
    velocityY += gravedad;
    mainCahracter.y += velocityY;

    // Detección de colisión
    for (let i = 0; i < plataformList.length; i++) {
        let plataform = plataformList[i];
        if (detectCollision(mainCahracter, plataform) && velocityY >= 0) {
            mainCahracter.y = plataform.y - mainCahracter.height; // Acomodar arriba
            velocityY = inicialVelY; // Hacer que rebote
        }
        ctx.drawImage(plataform.img, plataform.x, plataform.y, plataform.width, plataform.height);

        // DIBUJAR HITBOX (solo para prueba)
        ctx.strokeStyle = "red";
        ctx.strokeRect(plataform.x, plataform.y, plataform.width, plataform.height);
    }

    
    drawFrame(0, 4);
}


function detectCollision(a, b) {
    let hitboxX = a.x + hitboxOffsetX;
    let hitboxY = a.y + hitboxOffsetY;
    let isFalling = velocityY >= 0;
    let isInsideX = hitboxX + hitboxWidth > b.x && hitboxX < b.x + b.width;
    let isTouchingTop = hitboxY + hitboxHeight >= b.y && hitboxY + hitboxHeight <= b.y + 10;
    return isFalling && isInsideX && isTouchingTop;
}


/**
 * Función que detecta las teclas presionadas 
 * y asigna la velocidad en X para mover al personaje.
 */
function moveMainCharacter(e) {
    if (e.key === "ArrowRight" || e.key === "d") {
        velocityX = 1;
    } else if (e.key === "ArrowLeft" || e.key === "a") {
        velocityX = -1;
    }
}

// crea y despliega las plataformas 
function placePlataforms(){
    plataformList = [];

    // starting plataform 
    let plataform = {
        img : plataformImg,
        x: canvasWidth/2,
        y: canvasHeight - 120,
        width: plataformWidth,
        height: plataformHeight,
    }

    plataformList.push(plataform);

    plataform = {
        img : plataformImg,
        x: canvasWidth/2 -100,
        y: canvasHeight - 220,
        width: plataformWidth,
        height: plataformHeight,
    }

    plataformList.push(plataform);
}

/**
 * Función que dibuja un frame específico del spritesheet en el canvas.
 * Recibe la columna y fila del frame que se quiere mostrar.
 */
function drawFrame(col, row) {
    ctx.drawImage(
        mainCahracter.img,
        col * frameWidth, row * frameHeight,
        frameWidth, frameHeight,
        mainCahracter.x, mainCahracter.y, mainCahracter.width, mainCahracter.height
    );
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
        mainCahracter.x + hitboxOffsetX,
        mainCahracter.y + hitboxOffsetY,
        hitboxWidth,
        hitboxHeight
    );
}


// Ejecutar la función principal al cargar la página
window.onload = main;
