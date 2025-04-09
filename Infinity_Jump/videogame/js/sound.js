
const soundEffects = {
    plataforma : new Audio("../Assets/sounds/plataforma.mp3"),
    caida : new Audio("../Assets/sounds/caida.mp3"),
    power : new Audio("../Assets/sounds/powerUp.mp3")
};

soundEffects.plataforma.volume = 0.4;
// soundEffects.power.volume = 0.6;

const music  = {
    menu : new Audio("../Assets/sounds/intro.ogg"),
    bosque : new Audio("../Assets/sounds/forest.mp3"),
    cielo : new Audio("../Assets/sounds/cielo.ogg"),
};

let enableMusic = true;
let enableSound = true;


function playMusic(track) {
    if (enableMusic && music[track]) {
    
        for (let key in music) {
            if (music[key] !== music[track]) {
                music[key].pause();
                music[key].currentTime = 0;
            }
        }

        music[track].loop = true; 
        music[track].play().catch(err => {
            console.warn("No se pudo reproducir música (posible bloqueo del navegador):", err);
        });
    }
}

function playSound(track) {
    if (enableSound && soundEffects[track]) {
        soundEffects[track].play();
    }
}

function reproducirMusica(track) {
    if (!music[track]) {
        console.warn(`No existe una pista llamada "${track}" en el objeto music.`);
        return;
    }

    playMusic(track);
}