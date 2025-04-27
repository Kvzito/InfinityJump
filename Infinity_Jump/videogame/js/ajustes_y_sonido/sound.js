
const soundEffects = {
    plataforma : new Audio("../Assets/sounds/plataforma.mp3"),
    caida : new Audio("../Assets/sounds/caida.mp3"),
    power : new Audio("../Assets/sounds/powerUp.ogg"),
    hitEnemy : new Audio("../Assets/sounds/hitEnemy.wav"),
    attack : new Audio("../Assets/sounds/attack.ogg"),
    dead : new Audio ("../Assets/sounds/dead.wav"),
    throw : new Audio ("../Assets/sounds/throw.wav")
};

soundEffects.plataforma.volume = 0.4;


const music  = {
    menu : new Audio("../Assets/sounds/intro.ogg"),
    bosque : new Audio("../Assets/sounds/forest.mp3"),
    cielo : new Audio("../Assets/sounds/cielo.ogg"),
    enemy : new Audio("../Assets/sounds/enemy.mp3"),
};

music.enemy.volume = 0.5;

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
        for (let key in soundEffects) {
            if (soundEffects[key] !== soundEffects[track]) {
                soundEffects[key].pause();
                soundEffects[key].currentTime = 0;
            }
        }

        soundEffects[track].play();
    }
}

function stopSound(track){
    soundEffects[track].pause();
}

function reproducirMusica(track) {
    if (!music[track]) {
        console.warn(`No existe una pista llamada "${track}" en el objeto music.`);
        return;
    }

    playMusic(track);
}


function cambiarMusicaNivel(trackNuevo) {
    for (let track in music) {
        music[track].pause();
        music[track].currentTime = 0;
    }

    if (enableMusic && music[trackNuevo]) {
        music[trackNuevo].loop = true;
        music[trackNuevo].play().catch(err => {
            console.warn("Error al reproducir la música de nivel:", err);
        });
    }
}
