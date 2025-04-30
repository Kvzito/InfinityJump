function openLogin(){
    window.location.href = 'loginPagina.html';
}

document.getElementById("crearButton").onclick = async (e) => {

    e.preventDefault(); // Evitar el envío del formulario

    let message = document.getElementById("message");

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const confContrasena = document.getElementById("confirmar").value;

    const response = await fetch('http://localhost:5000/api/crearUsuario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena, confContrasena})
    })

    const results = await response.json()

    console.log(response.status);
    console.log(results);

    if (response.ok) {
        alert("Usuario creado exitosamente. Redirigiendo a la página de login...");
        openLogin();
        return;
    } else if (response.status >= 400 && response.status < 500) {
        console.log(results.message);
        // alert("Error al crear la cuenta. " + results.message);
        message.innerHTML = results.message;
        return;
    }
    // } else if (response.status === 409) {
    //     console.log(results.message);
    //     alert("El usuario ya existe.");
    //     return;
    // } else if (response.status === 400) {
    //     console.log(results.message);
    //     alert("Faltan datos para crear la cuenta.");
    //     return;
    // } else if (response.status === 403) {
    //     console.log(results.message);
    //     alert("Las contraseñas no coinciden.");
    //     return;
    // } else if (response.status === 500) {
    //     console.log(results.message);
    //     alert("Error interno del servidor.");
    //     return;
    // }

}
