function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        console.log("Usuario:", username, "Contraseña:", password);

        // Por ahora solo puedes hacer el log in con el usuario "hola" y la contraseña "1234"
        if (username === "hola" && password === "1234") {
            // Si los datos son correctos, redirige a la página principal
            window.location.href = 'nivel_1_screen.html';
        } else {
            // manda una notificacion para que el usuario sepa que hacer
            alert("Usuario o contraseña incorrectos.");
        }
    } else {
        alert("Por favor, ingresa un usuario y contraseña.");
    }
}

function openGame(){
    window.location.href = 'loginPagina.html';
}

function openMain(){
    window.location.href = 'mainPage.html';
}

function openManual(){
    window.location.href = 'manual.html';
}

function openHistoria(){
    window.location.href = 'historia.html';
}

function openEstadisticas(){
    window.location.href = 'estadisticas.html';
}
