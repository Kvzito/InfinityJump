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


function main() {
    const canvas = document.getElementById('canvas');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx = canvas.getContext('2d');

    

    drawScene(0);
}

function drawScene() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Limpia el canvas antes de redibujar
    textMoney.draw(ctx, `$: ${money}`);
}
