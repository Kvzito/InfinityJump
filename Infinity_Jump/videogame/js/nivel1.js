
let canvas, ctx;
let canvasHeight = 650;
let canvasWidth = 1150;

let mainCharacter;
let mainCharacterImage = new Image();
mainCharacterImage.src = "../Assets/Jump1.PNG";
let plataformImg = new Image();
plataformImg.src = "../Assets/Plataforma1.png";
let SuperJumpImg = new Image();
SuperJumpImg.src = "../Assets/JumpPowerUp.png";
let EscudoImg = new Image()
EscudoImg.src = "../Assets/EscudoPowerUp.png"

let totalPlataforms = 0;

const textVida = new TextLabel (canvasWidth - 175 , canvasHeight / 2 - 300 , "30px Ubuntu Mono",  "black");



function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    startGame()
    
}

// Esta funcion crea el personaje principal junto con la funcion que le permite ser controlado por botones.
// ademas declara las imagenes de las plataformas
function startGame() {

    mainCharacter = new MainCharacter(
        canvasWidth / 2 - 47,
        canvasHeight * 7 / 8 - 100,
        40, 54, mainCharacterImage
    );
    mainCharacter.listenControls();

    PlataformManager = new PM(level1Config); // usa config para este nivel
    PlataformManager.img = plataformImg;
    PlataformManager.placePlataforms();

    requestAnimationFrame(update);
}



// esto hace que el canvas se vaya acutualizando a lo largo que pasa el jeugo 
function update() {
    requestAnimationFrame(update);

    // aplicas las fisicas que creaste en la clase del personaje principal al objeto de personaje principal
    mainCharacter.applyPhysics();

    if (mainCharacter.y < canvasHeight / 2) {
        let dy = (canvasHeight / 2) - mainCharacter.y;
        mainCharacter.y = canvasHeight / 2;

        for (let j = 0; j < PlataformManager.list.length; j++) {
            PlataformManager.list[j].move(dy); // Baja todas las plataformas
        }
    }

    for (let i = 0; i < PlataformManager.list.length; i++) {
        let p = PlataformManager.list[i];


        // Movimiento lateral constante de las plataformas que se mueven
        if (p instanceof MovingPlataform) {
            p.moveX();
        }

        // hace que cada que haya una colicion el personaje salte
        if (mainCharacter.detectCollision(p)) {
            mainCharacter.y = p.y - mainCharacter.height;
            mainCharacter.bounce();
            // audio de plataformas
            playSound("plataforma");
        }

        if (p instanceof PowerUp && p.detectCollision(mainCharacter)) {
            p.applyEffect(mainCharacter);
            playSound("power");
        }

        if (p instanceof PlataformCambio) {
            p.checkCollision(mainCharacter);
        }

        
    }

    PlataformManager.list = PlataformManager.list.filter(p => p.y < canvasHeight && !p.active);

    // Generar nuevas plataformas si es necesario
    let last = PlataformManager.list[PlataformManager.list.length - 1];
        if (last && last.y > 0 && !PlataformManager.cPlataform) {
            PlataformManager.newPlataform();
        }

    if (mainCharacter.y > canvasHeight) {
        mostrarGameOver();
        return;
    }

    console.log(totalPlataforms);

    drawScene();
}



function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < PlataformManager.list.length; i++) {
        PlataformManager.list[i].draw(ctx);
    }

    mainCharacter.draw(ctx); 

    textVida.draw(ctx, `Vida: ${mainCharacter.vida} %`);
}

// configuracion de este nivel en particular 
const level1Config = {
    probMov: 10,
    probStatic: 90,
    probSuperJump:7,
    probEscudo: 7,
    PListLevel1: [],
};


function mostrarGameOver() {
        document.getElementById("gameOverScreen").style.display = "block";

}

function reiniciarJuego() {
    location.reload();
}


window.onload = main;

// Música de nivel (se reproduce con primer clic si el checkbox está activado)
document.addEventListener("DOMContentLoaded", () => {
    const musicCheckbox = document.getElementById("musicCheckbox");


    const iniciarMusicaNivel = () => {
        if (musicCheckbox && musicCheckbox.checked) {
            enableMusic = true;
            reproducirMusica("bosque"); 
        }
    };

    document.body.addEventListener("click", iniciarMusicaNivel);
});
