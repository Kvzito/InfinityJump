let canvas, ctx;
let canvasHeight = 650;
let canvasWidth = 1150;
let gameRunning = false;
let lastTime = 0; // New variable to track the last frame time
let deltaTime = 0; // New variable to store time between frames

let totalPlataforms = 0;
let intentoPlayer = 1;
let userID = localStorage.getItem('userID');

let PowerUpVidaCont = 0;
let PowerUpSaltoCont = 0;
let PowerUpFuerzaCont = 0;

// imagenes para el registro de mejoras
let mejoraPSalto = new Image();
mejoraPSalto.src = "../Assets/MejoraPermanenteAlas.png";
let mejoraPVida = new Image();
mejoraPVida.src = "../Assets/MejoraPermanenteVida.png";
let mejoraPDano = new Image();
mejoraPDano.src = "../Assets/MejoraPermanenteBotas.png";
let cuadroVacio = new Image();
cuadroVacio.src = "../Assets/CuadroRegistroPoderVacio.png"
let cuadroRojo = new Image();
cuadroRojo.src = "../Assets/CuadroRegistroPoderRojo.png"
let cuadroVerde = new Image();
cuadroVerde.src = "../Assets/CuadroRegistroPoderVerde.png"
let cuadroAzul = new Image();
cuadroAzul.src = "../Assets/CuadroRegistroPoderAzul.png"

let imagesLoaded = {
    mejoraPSalto: false,
    mejoraPVida: false,
    mejoraPDano: false,
    cuadroVacio: false,
    cuadroRojo: false,
    cuadroVerde: false,
    cuadroAzul: false
};


mejoraPSalto.onload = () => { imagesLoaded.mejoraPSalto = true; console.log("Imagen mejoraPSalto cargada"); };
mejoraPVida.onload = () => { imagesLoaded.mejoraPVida = true; console.log("Imagen mejoraPVida cargada"); };
mejoraPDano.onload = () => { imagesLoaded.mejoraPDano = true; console.log("Imagen mejoraPDano cargada"); };
cuadroVacio.onload = () => { imagesLoaded.cuadroVacio = true; console.log("Imagen cuadroVacio cargada"); };
cuadroRojo.onload = () => { imagesLoaded.cuadroRojo = true; console.log("Imagen cuadroRojo cargada"); };
cuadroVerde.onload = () => { imagesLoaded.cuadroVerde = true; console.log("Imagen cuadroVerde cargada"); };
cuadroAzul.onload = () => { imagesLoaded.cuadroAzul = true; console.log("Imagen cuadroAzul cargada"); };


let powerUpList = [];

function initializePowerUpList() {
    powerUpList = []; // Limpiamos la lista para evitar duplicados
    
    // Añadimos los íconos de mejora
    powerUpList.push({ img: mejoraPVida, x: 10, y: 55, width: 30, height: 30 });
    powerUpList.push({ img: mejoraPDano, x: 10, y: 95, width: 30, height: 30 });
    powerUpList.push({ img: mejoraPSalto, x: 10, y: 135, width: 30, height: 30 });
    
      
    let x = 50; // Aumentamos un poco para separar mejor
    for (let i = 0; i < 6; i++) {
        powerUpList.push({ img: cuadroVacio, x: x, y: 55, width: 30, height: 30, type: "vida" });
        x += 35;
    }
    
    
    x = 50;
    for (let i = 0; i < 6; i++) {
        powerUpList.push({ img: cuadroVacio, x: x, y: 95, width: 30, height: 30, type: "daño" });
        x += 35;
    }
    
    x = 50;
    for (let i = 0; i < 6; i++) {
        powerUpList.push({ img: cuadroVacio, x: x, y: 135, width: 30, height: 30, type: "salto" });
        x += 35;
    }
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
        canvasHeight/ 2 + 50,
        40, 54, mainCharacterImage
    );

    console.log("Main con usuario ID:", userID); 

    initializePowerUpList();

    loadLevels();
    resetTimer();
    startTimer();
    gameRunning = true;
    lastTime = performance.now(); // Initialize lastTime
    requestAnimationFrame(update);
}

function update(currentTime) {
    if (!gameRunning) return;

    
    deltaTime = (currentTime - lastTime) / 1000; 
    deltaTime = Math.min(deltaTime, 0.1);
    lastTime = currentTime;

    requestAnimationFrame(update);

    if (typeof currentUpdate === 'function') currentUpdate();
    if (typeof currentDraw === 'function') currentDraw(ctx);

    // dibuja el personaje y la vida siempre, sin importar el nivel
    if (mainCharacter) {
        mainCharacter.draw(ctx);
        textVida.draw(ctx, `Vida: ${mainCharacter.vida} `);
        textPower.draw(ctx, `Poder: ${mainCharacter.strength} `);
        
            for (let i = 0; i < powerUpList.length; i++) {
                let p = powerUpList[i];
                if (p && p.img) {
                    ctx.drawImage(p.img, p.x, p.y, p.width, p.height);
                }
            }
        
    
        
        mainCharacter.executeMoves();

        if (mainCharacter.y > canvasHeight || mainCharacter.vida <= 0) {
            mostrarGameOver();
            gameRunning = false;
        }
    }

}

async function enviarStats() {
    console.log("Registrando cambios de USER ID:", userID);

    try {
        const response = await fetch('http://localhost:5000/api/Partidas/insertar-con-intento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_usuario: userID,
                nivel: 1,
                plataformas_alcanzadas: totalPlataforms
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
        mainCharacter.inicialVelY += mainCharacter.inicialVelY * 0.09; 
        PowerUpSaltoCont ++;
    } else if (tipo === "daño") {
        mainCharacter.strength += 20;
        PowerUpFuerzaCont ++;
    } else if (tipo === "vida") {
        mainCharacter.vida += 20;
        PowerUpVidaCont ++;
    }
    document.getElementById("mejorasPopup").style.display = "none";
    gameRunning = true; // Reanudar juego si pausaste
    mainCharacter.listenControls();
    requestAnimationFrame(update);
}

