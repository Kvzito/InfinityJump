class Jefe1 extends jefe {
    constructor(x, y, width, height, vida, strength, img){
        super(x,y,width,height, img) ;
        this.vida = 100;
        this.strength = 20;

        this.hitboxWidth = 20;
        this.hitboxHeight = 40;
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 10;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        ctx.strokeStyle = "red"; // Color del borde
        ctx.lineWidth = 1;
        ctx.strokeRect(
            this.x + this.hitboxOffsetX,
            this.y + this.hitboxOffsetY,
            this.hitboxWidth,
            this.hitboxHeight
        );
    }
    
}