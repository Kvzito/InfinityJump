
const canvasWidth = 1000;
const canvasHeight = 600;

let money = 0;
let ctx;

class TextLabel {
    constructor(x, y, font, color) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text, this.x, this.y);
    }
}


let textMoney;

textMoney = new TextLabel(canvasWidth - 100, 35, "25px Ubuntu Mono", "black");

// obstaculos 
let mountain = new ObstaculoMontana(canvasWidth /2,  canvasHeight/2 + 150 );



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
    mountain.draw(ctx); // Dibuja la montaña

    requestAnimationFrame(drawScene);
}
