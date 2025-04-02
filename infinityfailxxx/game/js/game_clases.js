class GameObject {
    constructor(position, width, height, color, type) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;

        // Sprite properties
        this.spriteImage = undefined;
        this.spriteRect = undefined;
    }

    setSprite(imagePath, rect) {
        this.spriteImage = new Image();
        this.spriteImage.src = imagePath;
        if (rect) {
            this.spriteRect = rect;
        }
    }

    draw(ctx) {
        if (this.spriteImage) {
                ctx.drawImage(this.spriteImage,
                              this.position.x, this.position.y,
                              this.width, this.height);
                              //this.position.x * scale, this.position.y * scale,
                              //this.width * scale, this.height * scale);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y,
                         this.width, this.height);
        }
    }

    // Empty template for all GameObjects to be able to update
    update() {

    }
}
