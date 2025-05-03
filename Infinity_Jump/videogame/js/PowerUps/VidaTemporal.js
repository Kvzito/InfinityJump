class VidaTemp extends PowerUp {
    constructor(x, y, img) {
        super(x,y,40,40,img)
    }

    applyEffect(player) {
        if (!this.active) {
            player.vida += 30;
            this.active = true;
        }
    }
}