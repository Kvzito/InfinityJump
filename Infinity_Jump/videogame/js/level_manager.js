let levels = [];
let currentLevelIndex = 0;
let currentUpdate = null;
let currentDraw = null;

function loadLevels() {
    levels = [level1, levelJefe1, level2, levelJefe2, level3];
    currentLevelIndex = 0;
    levels[currentLevelIndex]();
}

function nextLevel() {
    plataformasAcumuladas += totalPlataforms;
    totalPlataforms = 0;
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
        levels[currentLevelIndex]();
        localStorage.setItem('currentLevelIndex', currentLevelIndex);
    } else {
        console.log("Juego completado");
    }
}