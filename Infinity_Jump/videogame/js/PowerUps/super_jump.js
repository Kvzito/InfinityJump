class SuperJump extends PowerUp {
    constructor(x, y, img) {
        super(x, y, 40, 40, img); 
    }

    applyEffect(player) {
        player.velocityY = -23; 
        this.active = true;
    }
}
