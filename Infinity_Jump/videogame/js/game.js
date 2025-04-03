// Este archivo controla el estado actual del juego y permite cambiar entre pantallas

let canvas, ctx;
let canvasHeight = 667;
let canvasWidth = 1200;
let gameState = "nivel1";

function changeState(newState) {
    gameState = newState;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "nivel1") {
        startGameNivel1();
    } else if (gameState === "jefe1") {
        startGameJefe1();
    }
}

// Al cargar la página inicializa el canvas y comienza el primer estado
window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    changeState("nivel1");
};
