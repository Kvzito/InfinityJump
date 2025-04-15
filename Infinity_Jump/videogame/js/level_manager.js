let levels = [];
let currentLevelIndex = 0;
let currentUpdate = null;
let currentDraw = null;

function loadLevels() {
    levels = [level1, levelJefe1, level2];
    currentLevelIndex = 0;
    levels[currentLevelIndex]();
}

function nextLevel() {
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
        levels[currentLevelIndex]();
    } else {
        console.log("Juego completado");
    }
}
