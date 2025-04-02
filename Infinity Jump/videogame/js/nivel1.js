
let canvas, ctx;
let canvasHeight = 700;
let canvasWidth = 1200;

let mainCharacter;
let mainCharacterImage;
let plataformImg;

// esta funcion asegura que las imagnes que se van a usar esten cargadas antes de empezar el juego
function loadAssets(onAssetsLoaded) {
    mainCharacterImage = new Image();
    plataformImg = new Image();

    let imagesLoaded = 0;

    function checkLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            onAssetsLoaded();
        }
    }

    mainCharacterImage.onload = checkLoaded;
    plataformImg.onload = checkLoaded;

    mainCharacterImage.src = "../Assets/Jump1.PNG";
    plataformImg.src = "../Assets/Plataforma1.png";
}


function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    loadAssets(startGame);
    
}

// Esta funcion crea el personaje principal junto con la funcion que le permite ser controlado por botones.
// ademas declara las imagenes de las plataformas
function startGame() {

    mainCharacter = new MainCharacter(
        canvasWidth / 2 - 47,
        canvasHeight * 7 / 8 - 100,
        40, 54, mainCharacterImage
    );
    mainCharacter.listenControls();

    PlataformManager.img = plataformImg;
    PlataformManager.placePlataforms();

    requestAnimationFrame(update);
}



// esto hace que el canvas se vaya acutualizando a lo largo que pasa el jeugo 
function update() {
    requestAnimationFrame(update);

    // aplicas las fisicas que creaste en la clase del personaje principal al objeto de personaje principal
    mainCharacter.applyPhysics();

    if (mainCharacter.y < canvasHeight / 2) {
        let dy = (canvasHeight / 2) - mainCharacter.y;
        mainCharacter.y = canvasHeight / 2;

        for (let j = 0; j < PlataformManager.list.length; j++) {
            PlataformManager.list[j].move(dy); // Baja todas las plataformas
        }
    }

    for (let i = 0; i < PlataformManager.list.length; i++) {
        let p = PlataformManager.list[i];

       

        // Movimiento lateral constante de las plataformas que se mueven
        if (p instanceof MovingPlataform) {
            p.moveX();
        }

        // hace que cada que haya una colicion el personaje salte
        if (mainCharacter.detectCollision(p)) {
            mainCharacter.y = p.y - mainCharacter.height;
            mainCharacter.bounce();
        }
    }

    PlataformManager.list = PlataformManager.list.filter(p => p.y < canvasHeight);

    // Generar nuevas plataformas si es necesario
    let last = PlataformManager.list[PlataformManager.list.length - 1];
    if (last && last.y > 0) {
        PlataformManager.newPlataform();
    }
    drawScene();
}



function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < PlataformManager.list.length; i++) {
        PlataformManager.list[i].draw(ctx);
    }

    mainCharacter.draw(ctx); 

    
}




const PlataformManager = {
    list: [],
    img: null,

    placePlataforms() {
        this.list = [];
        let start = new Plataform(canvasWidth / 2 - 45, canvasHeight - 150, 60, 18, this.img);
        this.list.push(start);
    
        let minX = canvasWidth * 0.4;
        let maxX = canvasWidth * 0.6;
    
        for (let i = 1; i < 10; i++) {
            let randomX = Math.floor(Math.random() * (maxX - minX) + minX);
    
            let isMoving = Math.random() < 0.1; // 30% de probabilidad
    
            let mPlataform;
            if (isMoving) {
                mPlataform = new MovingPlataform(randomX, canvasHeight - 90 * i - 70, 60, 18, this.img, 100, 0.5);
            } else {
                mPlataform = new Plataform(randomX, canvasHeight - 90 * i - 70, 60, 18, this.img);
            }
            this.list.push(mPlataform);
        }
    },

    newPlataform() {
        let minX = canvasWidth / 3;
        let maxX = canvasWidth * 2 / 3;
        let randomX = Math.floor(Math.random() * (maxX - minX) + minX);

        let lastY = this.list[this.list.length - 1]?.y || 0;
        let newY = lastY - 50; // define la separacion de las plataformas

        let isMoving = Math.random() < 0.1;

        let p;
        if (isMoving) {
            p = new MovingPlataform(randomX, newY, 60, 18, this.img, 100, 0.5);
        } else {
            p = new Plataform(randomX, newY, 60, 18, this.img);
        }
        this.list.push(p);
    }
    
};

window.onload = main;
