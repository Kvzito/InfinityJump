class FuerzaTemporal extends PowerUp {
    constructor(x,y,img){
        super(x,y,40,40,img);
    }

    applyEffect(player) {
        player.strength += 25; 
        this.active = true;
    }
}