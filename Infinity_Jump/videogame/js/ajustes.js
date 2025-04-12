// Función para abrir los ajustes
function openAjustes() {
    document.getElementById("ajustes").style.display = "block";
}

// Función para cerrar los ajustes
function closeAjustes() {
    document.getElementById("ajustes").style.display = "none";
}

window.addEventListener('DOMContentLoaded', () => {
    const musicCheckbox = document.getElementById('musicCheckbox');
    const soundEffectsCheckbox = document.getElementById('soundEffectsCheckbox');

    musicCheckbox.addEventListener('change', () => {
        enableMusic = musicCheckbox.checked;

        if (!enableMusic) {
            // Pausamos todas las pistas si se desactiva la música
            for (let track in music) {
                music[track].pause();
            }
        } else {
            // Si se activa y ya había una pista en reproducción, se reanuda
            for (let track in music) {
                if (music[track].paused === false) {
                    music[track].play().catch(err => {
                        console.warn("Autoplay bloqueado al reactivar música:", err);
                    });
                    break;
                }
            }
        }
    });

    soundEffectsCheckbox.addEventListener('change', () => {
        enableSound = soundEffectsCheckbox.checked;
        if (enableSound) {
            playSound();
        } 
    });
});