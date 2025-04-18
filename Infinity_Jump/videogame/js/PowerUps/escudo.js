class escudo extends PowerUp {
    constructor(x,y,img) {
        super(x, y, 40, 40, img) 
    }

    applyEffect(player) {
        if (!this.active) {
            player.escudoActivo = true;
            this.active = true;
        }
    }
}