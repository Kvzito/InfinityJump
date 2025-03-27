
/* Main JS code for our videogame

Kevin Javier Esquivel Villafuerte
María Rivera Gutierrez
Santiago Córdova Molina

24-03-2025 */

const canvasWidth = 1000;
const canvasHeight = 600;

let money = 0;
let ctx;



// texto que aparece en pantalla
let textMoney = new TextLabel(canvasWidth - 100, 35, "25px Ubuntu Mono", "black");

// obstaculos 
let mountain = new ObstaculoMontana(canvasWidth /2 - 130,  canvasHeight/2 + 200 );
let terreno =  new Terreno(0, canvasHeight - 100, canvasWidth);

// coche (modelo principal)
let coche = new Coche(100, 350, 100, 50, "../../imagenes/ModeloPrincipalCoche.png"); // Posición inicial y dimensiones


function main() {
    const canvas = document.getElementById('canvas');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx = canvas.getContext('2d');


    console.log('main');


    drawScene(0);

}

function drawScene() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    console.log('hola'); // Limpia el canvas antes de redibujar
    textMoney.draw(ctx, `$: ${money}`);
    terreno.draw(ctx);
    mountain.draw(ctx); // Dibuja la montaña

    
    const obstacles = [terreno, mountain]; // Lista de obstáculos

    coche.update(obstacles); // Actualizar posición y físicas del coche

    coche.draw(ctx);

    requestAnimationFrame(drawScene);
}

window.addEventListener('keydown', (e) => {
    const speed = 0.8; // Fuerza aplicada al coche
    if (e.key === 'ArrowLeft') coche.move(-speed); // Mover hacia la izquierda
    if (e.key === 'ArrowRight') coche.move(speed); // Mover hacia la derecha
});