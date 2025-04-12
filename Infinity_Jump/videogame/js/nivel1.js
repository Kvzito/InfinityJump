/*
*/

//




let canvas, ctx;
let canvasHeight = 650;
let canvasWidth = 1150;

let mainCharacter;
let mainCharacterImage;
let plataformImg;
let SuperJumpImg;

let totalPlataforms = 0;
let intentoPlayer = 1;
let userID = localStorage.getItem('userID');

const textVida = new TextLabel (canvasWidth - 175 , canvasHeight / 2 - 300 , "30px Ubuntu Mono",  "black");


// esta funcion asegura que las imagnes que se van a usar esten cargadas antes de empezar el juego
function loadAssets(onAssetsLoaded) {
    mainCharacterImage = new Image();
    plataformImg = new Image();
    SuperJumpImg = new Image();

    let imagesLoaded = 0;

    function checkLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 3) {
            onAssetsLoaded();
        }
    }

    mainCharacterImage.onload = checkLoaded;
    plataformImg.onload = checkLoaded;
    SuperJumpImg.onload = checkLoaded;

    mainCharacterImage.src = "../Assets/Jump1.PNG";
    plataformImg.src = "../Assets/Plataforma1.png";
    SuperJumpImg.src = "../Assets/JumpPowerUp.png";
}


function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    loadAssets(startGame);

    console.log("Main con usuario ID:", userID); // Verifica que el ID de usuario se haya cargado correctamente

    // Obtenemos el ID del usuario

    // userID = localStorage.getItem('userID');
    
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

    PlataformManager = new PM(level1Config); // ← usa config para este nivel
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
        }

        if (p instanceof PowerUp && p.detectCollision(mainCharacter)) {
            p.applyEffect(mainCharacter);
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

    // Verificar si se muere el jugador
    if (mainCharacter.y > canvasHeight) {
        mostrarGameOver();
        return;
    }

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
    probPowerUp:5,
    PListLevel1: [],
};

// async function obtenerIntento() {
//     try {
//         const responseIntento = await 
//         fetch(`http://localhost:5000/api/Partidas/ultimo-intento?id_usuario=${usuarioID}`);
//         if (responseIntento.ok){
//             const data = await responseIntento.json();
//             intentoPlayer = data.ultimo_intento + 1;
//             console.log("Intento del jugador:", intentoPlayer);
//         }
//     } catch (error) {
//         console.error("No se pudo obtener el último intento, asignando 1:", error);
//         intentoPlayer = 1;
//     }
// }

// async function enviarStats()
// {
//     // await obtenerIntento();
    

//     const response = await fetch('http://localhost:5000/api/Partidas', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "id_usuario": usuarioID,
//             "intento": intentoPlayer,
//             "nivel": 1,
//             "plataformas_alcanzadas": totalPlataforms
//         })
//     });

//     if (response.ok) {
//         const results = await response.json();
//         console.log("Insertado correctamente:", results);
//     } else {
//         console.log("Error al enviar los datos");
//     }
// }

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


// funcion para el pop up cuando muere
function mostrarGameOver() {
    document.getElementById("gameOverScreen").style.display = "block";
}

function reiniciarJuego() {
    location.reload();
}

window.onload = main;
