const canvasWidth = 1000;
const canvasHeight = 600;

function main() {
    
    // hace referencia al "canvas que esta en el html"
    const canvas = document.getElementById('canvas');
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Para que sepa que es en 2D
    ctx = canvas.getContext('2d');

    // crea los dibujos en el canvas 
    drawScene(0);

    
} 