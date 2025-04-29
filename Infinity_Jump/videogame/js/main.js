let canvas, ctx;
let canvasHeight = 650;
let canvasWidth = 1150;
let gameRunning = false;

window.totalPlataforms = 0;
window.plataformasAcumuladas = 0;

let intentoPlayer = 1;
let userID = localStorage.getItem('userID');
let nombreNivel = ""; // Declare nombreNivel as a global variable

let mejoraSalto = 0;
let mejoraDanio = 0;
let mejoraVida = 0;

// Función para cargar las mejoras del inventario del jugador
async function obtenerMejorasPermanentes() {
try 
    {
        const response = await fetch(`http://localhost:5000/api/mejoras/${userID}`,{
            method: 'GET',
        });

        if (response.ok) {
            const mejoras = await response.json();
            console.log("Mejoras permanentes obtenidas:", mejoras);
            mejoraSalto = mejoras.cantidadSalto; // Mejora de salto
            mejoraDanio = mejoras.cantidadDanio; // Mejora de daño
            mejoraVida = mejoras.cantidadVida; // Mejora de vida
        }
        else {
            console.error("Error al obtener mejoras permanentes:", response.statusText);
        }
        
    } catch (error) {
        console.error("Error en obtenerMejorasPermanentes:", error);
    }
}

obtenerMejorasPermanentes();

function actualizarMejoras() {
    mainCharacter.inicialVelY += mejoraSalto;
    mainCharacter.strength = 500 + ( 20 * mejoraDanio);
    mainCharacter.vida = 100 +  (20 * mejoraVida);
}



// fondos
let fondoCieloImg = new Image();
fondoCieloImg.src = "../Assets/FondoCielo.png";
let fondoEspacioImg = new Image();
fondoEspacioImg.src = "../Assets/FondoEspacio.webp";

// personaje principal y texto de vida global
let mainCharacter;
const textVida = new TextLabel(canvasWidth - 150 , canvasHeight / 2 - 300 , "30px Ubuntu Mono",  "white");
const textPower = new TextLabel(canvasWidth - 150 , canvasHeight / 2 - 265 , "30px Ubuntu Mono",  "white");


// imágenes globales para todos los niveles
// imagen main character
let mainCharacterImage = new Image();
mainCharacterImage.src = "../Assets/Jump1.PNG";


// imagenes paltaformas nivel 1
let plataformImg1 = new Image();
plataformImg1.src = "../Assets/Plataforma1.png";
let plataformSingle1 = new Image();
plataformSingle1.src = "../Assets/bush.png";

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

    console.log("Mejora de salto:", mejoraSalto);
    console.log("Mejora de daño:", mejoraDanio);
    console.log("Mejora de vida:", mejoraVida);
 
    actualizarMejoras();

    console.log("Main con usuario ID:", userID); 
    console.log("Current level:", currentLevelIndex);
    console.log("Vida del jugador: ", mainCharacter.vida);
    console.log("Poder del jugador: ", mainCharacter.strength);

    loadLevels();
    resetTimer();
    startTimer();
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
        textVida.draw(ctx, `Vida: ${mainCharacter.vida} `);
        textPower.draw(ctx, `Poder: ${mainCharacter.strength} `);
        mainCharacter.executeMoves();

        if (mainCharacter.y > canvasHeight || mainCharacter.vida <= 0) {
            mostrarGameOver();
            gameRunning = false;
        }
    }

}

async function enviarStats() {

    console.log("Registrando cambios de USER ID:", userID);

    plataformasAcumuladas += totalPlataforms;
    totalPlataforms = 0;

    try {
        const response = await fetch('http://localhost:5000/api/Partidas/insertar-con-intento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_usuario: userID,
                nivel: nombreNivel,
                plataformas_alcanzadas: plataformasAcumuladas,
            })
        });

        if (response.ok) {
            const results = await response.json();
            console.log("Insertado correctamente, intento:", results.intento);
        } else {
            const error = await response.json();
            console.log("Error al enviar los datos:", error);
        }
    } catch (error) {
        console.error("Error en enviarStats:", error);
    }
}

function mostrarGameOver() {
    stopTimer();

    // Usa currentLevelIndex directamente
    if (currentLevelIndex == 0) {
        nombreNivel = "Bosque";
    } else if (currentLevelIndex == 1) {
        nombreNivel = "Carny";
    } else if (currentLevelIndex == 2) {
        nombreNivel = "Nubes";
    } else if (currentLevelIndex == 3) {
        nombreNivel = "Magik";
    } else if (currentLevelIndex == 4) {
        nombreNivel = "Espacio";
    } else if (currentLevelIndex == 5) {
        nombreNivel = "UFO";
    }

    console.log("Nivel alcanzado:", nombreNivel);

    const screen = document.getElementById("gameOverScreen");
    if (screen) screen.style.display = "block";
}


function reiniciarJuego() {
    location.reload();
}
    

window.onload = main;

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

function seleccionarMejora(tipo) {
    if (tipo === "salto") {
        mejoraSalto += 1; // aumenta el salto
        actualizarMejoras();
    } else if (tipo === "danio") {
        mejoraDanio += 1; // aumenta el daño
        actualizarMejoras();
    } else if (tipo === "vida") {
        mejoraVida += 1; // aumenta la vida
        actualizarMejoras();
    }
    document.getElementById("mejorasPopup").style.display = "none";
    gameRunning = true; // Reanudar juego si pausaste
    mainCharacter.listenControls();
    requestAnimationFrame(update);
}

