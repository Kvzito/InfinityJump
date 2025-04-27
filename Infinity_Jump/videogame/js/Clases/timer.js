// Variables globales del timer
let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isTimerRunning = false;

// Inicia el timer
function startTimer() {
    if (!isTimerRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateTimerDisplay();
        }, 1000);
        isTimerRunning = true;
    }
}

// Detiene el timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isTimerRunning = false;
}

// Resetea el timer
function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    startTime = null;
    updateTimerDisplay();
}

// Actualiza el div HTML que muestra el tiempo
function updateTimerDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const timerDiv = document.getElementById("gameTimer");
    if (timerDiv) {
        timerDiv.textContent = `Tiempo - ${formattedTime}`;
    }
}


// Obtiene el tiempo transcurrido en segundos
function getElapsedTimeInSeconds() {
    return Math.floor(elapsedTime / 1000);
}
