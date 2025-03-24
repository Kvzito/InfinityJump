function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        console.log("Usuario:", username, "Contraseña:", password);

        // Lógica de validación del login (simulada aquí con un ejemplo)
        if (username === "hola" && password === "1234") {
            // Si los datos son correctos, redirige a la página principal
            window.location.href = 'principal_pagina.html';
        } else {
            // manda una notificacion para que el usuario sepa que hacer
            alert("Usuario o contraseña incorrectos.");
        }
    } else {
        alert("Por favor, ingresa un usuario y contraseña.");
    }
}