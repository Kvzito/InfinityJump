/* Main JS code for our videogame

Kevin Javier Esquivel Villafuerte
María Rivera Gutierrez
Santiago Córdova Molina

24-03-2025 */

const canvasWidth = 1000;
const canvasHeight = 600;

function main() {
    // hace referencia al "canvas que esta en el html"
    const canvas = document.getElementById('canvas');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    
    // agarra el contexto 2D
    ctx = canvas.getContext('2d');
    
    drawScene(0);
    
}

