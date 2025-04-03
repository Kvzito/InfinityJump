const canvasWidth = 1000;
const canvasHeight = 600;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        console.log("Usuario:", username, "Contraseña:", password);

        // Por ahora solo puedes hacer el log in con el usuario "hola" y la contraseña "1234"
        if (username === "hola" && password === "1234") {
            // Si los datos son correctos, redirige a la página principal
            window.location.href = 'mainPage.html';
        } else {
            // manda una notificacion para que el usuario sepa que hacer
            alert("Usuario o contraseña incorrectos.");
        }
    } else {
        alert("Por favor, ingresa un usuario y contraseña.");
    }
}


function main() {
   
    // hace referencia al "canvas que esta en el html"
    const canvas = document.getElementById('canvas');
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // agarra el contexto de que es 2D
    ctx = canvas.getContext('2d');


    login();
    
}