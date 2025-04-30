let canvas, ctx;
let canvasHeight = 650;
let canvasWidth = 1150;
let gameRunning = false;
let lastTime = 0; // New variable to track the last frame time
let deltaTime = 0; // New variable to store time between frames
let pausa = false

window.totalPlataforms = 0;
window.plataformasAcumuladas = 0;

let intentoPlayer = 1;
let userID = localStorage.getItem('userID');
let nombreNivel = ""; // Declare nombreNivel as a global variable

let mejoraSalto = 0;
let mejoraDanio = 0;
let mejoraVida = 0;


// Formatear el tiempo en segundos
function formatearTiempo(segundosTotales) {
    if (typeof segundosTotales !== 'number' || isNaN(segundosTotales) || segundosTotales < 0) {
        return "00:00:00"; // Valor por defecto si el input es inválido
    }

    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = Math.floor(segundosTotales % 60);

    const formato = (num) => num.toString().padStart(2, '0');

    return `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
}




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
    const velMin = -15; // límite superior al salto
    mainCharacter.inicialVelY = Math.max(-7.5 + (-0.5 * mejoraSalto), velMin);
    mainCharacter.strength = 250 + ( 20 * mejoraDanio);
    mainCharacter.vida = 300 +  (20 * mejoraVida);
}

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
    
      
    let x = 50;
    for (let i = 0; i < 5; i++) {
        powerUpList.push({ img: cuadroVacio, x: x, y: 55, width: 30, height: 30, type: "vida" });
        x += 35;
    }
    
    x = 50;
    for (let i = 0; i < 5; i++) {
        powerUpList.push({ img: cuadroVacio, x: x, y: 95, width: 30, height: 30, type: "daño" });
        x += 35;
    }
    
    x = 50;
    for (let i = 0; i < 5; i++) {
        powerUpList.push({ img: cuadroVacio, x: x, y: 135, width: 30, height: 30, type: "salto" });
        x += 35;
    }
    
    // Ahora añadimos los cuadros coloreados encima de los vacíos para simular el efecto de que se lleno de color 
    // Cuadros verdes (vida)
    x = 50;
    for (let i = 0; i < mejoraVida; i++) {
        powerUpList.push({ img: cuadroVerde, x: x, y: 55, width: 30, height: 30, type: "vida" });
        x += 35;
    }
    
    // Cuadros rojos (daño)
    x = 50;
    for (let i = 0; i < mejoraDanio; i++) {
        powerUpList.push({ img: cuadroRojo, x: x, y: 95, width: 30, height: 30, type: "daño" });
        x += 35;
    }
    
    // Cuadros azules (salto)
    x = 50;
    for (let i = 0; i < mejoraSalto; i++) {
        powerUpList.push({ img: cuadroAzul, x: x, y: 135, width: 30, height: 30, type: "salto" });
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


const textVida = new TextLabel(canvasWidth - 175 , canvasHeight / 2 - 280 , "30px Pixelify Sans",  "white");
const textPower = new TextLabel(canvasWidth - 200 , canvasHeight / 2 - 250 , "30px Pixelify Sans",  "white");



// imágenes globales para todos los niveles
// imagen main character
let mainCharacterImage = new Image();
mainCharacterImage.src = "../Assets/Jump1.PNG";


// imagenes paltaformas nivel 1
let plataformImg1 = new Image();
plataformImg1.src = "../Assets/Plataforma1.png";
let singleImg1 = new Image();
singleImg1.src = "../Assets/bush.png";

// imagenes jefe 1
let jefeImgIzq = new Image();
jefeImgIzq.src = "../Assets/JefePlantaIzq.png";
let jefeImgDer = new Image();
jefeImgDer.src = "../Assets/JefePlantaDer.png";

//imagenes nivel 2
let plataformImg2 = new Image();
plataformImg2.src = "../Assets/PlataformaNube.png";
singleImg2 = new Image();
singleImg2.src = "../Assets/pajaroRojo.png";

// imagenes jefe2
let proyectilImg = new Image();
proyectilImg.src = "../Assets/ProyectilJefe2.png";
let jefe2Img = new Image();
jefe2Img.src = "../Assets/Jefe2.png";

// imagenes nivel3
let plataformImg3 = new Image();
plataformImg3.src = "../Assets/PlataformaEspacioUno.png";
singleImg3 = new Image();
singleImg3.src = "../Assets/espacio.png";

// imagenes jefe3
let jefe3Img = new Image();
jefe3Img.src = "../Assets/Jefe3.png"
let proyectilJefe3 = new Image();
proyectilJefe3.src = "../Assets/ProjectilJefe3.png"

// imagenes power ups
let SuperJumpImg = new Image();
SuperJumpImg.src = "../Assets/JumpPowerUp.png";
let EscudoImg = new Image();
EscudoImg.src = "../Assets/EscudoPowerUp.png";
let BolaPicosImg = new Image();
BolaPicosImg.src = "../Assets/BolaPicos.png"

// imagen portal
let portalImg = new Image();
portalImg.src = "../Assets/portal.png";


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

    console.log("Mejora de salto:", mejoraSalto);
    console.log("Mejora de daño:", mejoraDanio);
    console.log("Mejora de vida:", mejoraVida);
 
    actualizarMejoras();

    console.log("Main con usuario ID:", userID); 
    console.log("Current level:", currentLevelIndex);
    console.log("Vida del jugador: ", mainCharacter.vida);
    console.log("Poder del jugador: ", mainCharacter.strength);

    initializePowerUpList();

    loadLevels();
    resetTimer();
    startTimer();
    gameRunning = true;
    lastTime = performance.now(); // Initialize lastTime
    

    document.addEventListener("keydown", (e) => {
        
        if (e.key === "p" || e.key === "Escape"){
            if (gameRunning === true){
                openAjustes();
                gameRunning = false;
                
            }
            else if (gameRunning === false){
                closeAjustes();
                gameRunning = true;
                mainCharacter.applyPhysics();
                
            }
        }
    });

    requestAnimationFrame(update);

    
}

function update(currentTime) {

    
    deltaTime = (currentTime - lastTime) / 1000; 
    deltaTime = Math.min(deltaTime, 0.1);
    lastTime = currentTime;

    requestAnimationFrame(update);

    if (!gameRunning) return;

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
    

    plataformasAcumuladas += totalPlataforms;
    totalPlataforms = 0;

    const tiempo = formatearTiempo(getElapsedTimeInSeconds());

    console.log("Tiempo total:", tiempo);

    console.log(JSON.stringify({
        id_usuario: userID,
        nivel: nombreNivel,
        plataformas_alcanzadas: plataformasAcumuladas,
        tiempo: tiempo,
        mejoraSalto: mejoraSalto,
        mejoraDanio: mejoraDanio,
        mejoraVida: mejoraVida,
    }));

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
                tiempo: tiempo,
                mejoraSalto: mejoraSalto,
                mejoraDanio: mejoraDanio,
                mejoraVida: mejoraVida,
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

/*
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
*/

function seleccionarMejora(tipo) {

    if (tipo === "salto") {
        mejoraSalto += 1; // aumenta el salto
        mainCharacter.inicialVelY = Math.max(mainCharacter.inicialVelY - 0.5, -15); // aumenta el salto
    } else if (tipo === "danio") {
        mejoraDanio += 1; // aumenta el daño
        mainCharacter.strength += 20; // aumenta el daño
    } else if (tipo === "vida") {
        mejoraVida += 1; // aumenta la vida
        mainCharacter.vida += 20; // aumenta la vida

    }

    initializePowerUpList();

    document.getElementById("mejorasPopup").style.display = "none";
    gameRunning = true; // Reanudar juego si pausaste
    mainCharacter.listenControls();
    requestAnimationFrame(update);
}

async function actualizarInventario(tipoM) {
    let mejora;

    if (tipoM === "salto") {
        mejora = "salto";
    } else if (tipoM === "danio") {
        mejora = "danio";
    } else if (tipoM === "vida") {
        mejora = "vida";
    }

    try {
        const response = await fetch(`http://localhost:5000/api/seleccionarMejora`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_usuario: userID,
                mejora: mejora
            })
        });

        if (response.ok) {
            console.log("Inventario actualizado correctamente.");
        } else {
            console.error("Error al actualizar el inventario:", response.statusText);
        }
    } catch (error) {
        console.error("Error en actualizarInventario:", error);
    }
}

function actualizarOpcionesMejora() {
    const maxNivel = 5; // Nivel máximo para las mejoras

    // Asignamos los textos de las mejoras para poder mostrar sus niveles en el popup
    const textoSalto = document.getElementById('nivel-salto');
    const textoDanio = document.getElementById('nivel-danio');
    const textoVida = document.getElementById('nivel-vida');

    // Aplicamos lógica para mostrar el nivel actual de cada mejora
    textoSalto.innerText = (mejoraSalto >= maxNivel) ? "Máximo alcanzado" : `Nivel actual: ${mejoraSalto}`;
    textoDanio.innerText = (mejoraDanio >= maxNivel) ? "Máximo alcanzado" : `Nivel actual: ${mejoraDanio}`;
    textoVida.innerText = (mejoraVida >= maxNivel) ? "Máximo alcanzado" : `Nivel actual: ${mejoraVida}`;

    // Salto
    const botonSalto = document.querySelector("button[onclick*='salto']");
    if (mejoraSalto >= maxNivel) { // Si la mejora de salto es mayor o igual al nivel máximo desabilitamos el botón
        botonSalto.disabled = true;
        botonSalto.style.backgroundColor = 'gray';
        botonSalto.style.cursor = 'not-allowed';
    } else {
        botonSalto.disabled = false;
        botonSalto.style.backgroundColor = 'green';
        botonSalto.style.cursor = 'pointer';
    }

    // Daño
    const botonDanio = document.querySelector("button[onclick*='danio']");
    if (mejoraDanio >= maxNivel) { // Si la mejora de daño es mayor o igual al nivel máximo desabilitamos el botón
        botonDanio.disabled = true;
        botonDanio.style.backgroundColor = 'gray';
        botonDanio.style.cursor = 'not-allowed';
    } else {
        botonDanio.disabled = false;
        botonDanio.style.backgroundColor = 'green';
        botonDanio.style.cursor = 'pointer';
    }

    // Vida
    const botonVida = document.querySelector("button[onclick*='vida']");
    if (mejoraVida >= maxNivel) { // Si la mejora de vida es mayor o igual al nivel máximo desabilitamos el botón
        botonVida.disabled = true;
        botonVida.style.backgroundColor = 'gray';
        botonVida.style.cursor = 'not-allowed';
    } else {
        botonVida.disabled = false;
        botonVida.style.backgroundColor = 'green';
        botonVida.style.cursor = 'pointer';
    }

    // Botón para continuar en caso de todas las mejoras al máximo
    const botonContinuar = document.getElementById('boton-continuar');

    if (mejoraSalto >= maxNivel && mejoraDanio >= maxNivel && mejoraVida >= maxNivel) {
        // Si todas las mejoras están al máximo, mostramos el botón para continuar
        botonContinuar.style.display = 'block';
    } else {
        // Si aún hay mejoras disponibles, ocultamos el botón
        botonContinuar.style.display = 'none';
}

}


function cerrarPopup() {
    document.getElementById("mejorasPopup").style.display = "none";
    gameRunning = true; // Reanudar juego si pausaste
    mainCharacter.listenControls();
    requestAnimationFrame(update);
}