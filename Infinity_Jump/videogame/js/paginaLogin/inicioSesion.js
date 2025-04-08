let canvasHeight = 650;
let canvasWidth = 1150;

function main() {
   
    // hace referencia al "canvas que esta en el html"
    const canvas = document.getElementById('canvas');
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // agarra el contexto de que es 2D
    ctx = canvas.getContext('2d');


    login();
    
}