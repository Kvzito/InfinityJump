let canvas, ctx;
let canvasHeight = 650;
let canvasWidth = 1150;
let gameRunning = false;

// fondos
let fondoCieloImg = new Image();
fondoCieloImg.src = "../Assets/FondoCielo.png";
let fondoEspacioImg = new Image();
fondoEspacioImg.src = "../Assets/FondoEspacio.webp";

// personaje principal y texto de vida global
let mainCharacter;
const textVida = new TextLabel(canvasWidth - 175 , canvasHeight / 2 - 300 , "30px Ubuntu Mono",  "white");

let totalPlataforms = 0;

// imágenes globales para todos los niveles
// imagen main character
let mainCharacterImage = new Image();
mainCharacterImage.src = "../Assets/Jump1.PNG";


// imagenes paltaformas nivel 1
let plataformImg1 = new Image();
plataformImg1.src = "../Assets/Plataforma1.png";

// imagenes jefe 1
jefeImgIzq = new Image();
jefeImgIzq.src = "../Assets/JefePlantaIzq.png";
jefeImgDer = new Image();
jefeImgDer.src = "../Assets/JefePlantaDer.png";

//imagenes nivel 2
plataformImg2 = new Image();
plataformImg2.src = "../Assets/PlataformaNube.png";

// imagenes jefe2
proyectilImg = new Image();
proyectilImg.src = "../Assets/ProyectilJefe2.png";
jefe2Img = new Image();
jefe2Img.src = "../Assets/Jefe2.png";

// imagenes nivel3
let plataformImg3 = new Image();
plataformImg3.src = "../Assets/PlataformaEspacioUno.png";

// imagenes power ups
let SuperJumpImg = new Image();
SuperJumpImg.src = "../Assets/JumpPowerUp.png";
let EscudoImg = new Image();
EscudoImg.src = "../Assets/EscudoPowerUp.png";


function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    mainCharacter = new MainCharacter(
        canvasWidth / 2 - 47,
        canvasHeight * 7 / 8 - 100,
        40, 54, mainCharacterImage
    );

    loadLevels();
    gameRunning = true;
    requestAnimationFrame(update);

}

function update() {
    if (!gameRunning) return;

    requestAnimationFrame(update);

    

    if (typeof currentUpdate === 'function') currentUpdate();
    if (typeof currentDraw === 'function') currentDraw(ctx);

    // dibuja el personaje y la vida siempre, sin importar el nivel
    if (mainCharacter) {
        mainCharacter.draw(ctx);
        textVida.draw(ctx, `Vida: ${mainCharacter.vida} %`);
        mainCharacter.executeMoves();

        if (mainCharacter.y > canvasHeight || mainCharacter.vida <= 0) {
            mostrarGameOver();
            gameRunning = false;
        }
    }
}

function mostrarGameOver() {
    const screen = document.getElementById("gameOverScreen");
    if (screen) screen.style.display = "block";
}

function reiniciarJuego() {
    location.reload();
}
    

window.onload = main;
