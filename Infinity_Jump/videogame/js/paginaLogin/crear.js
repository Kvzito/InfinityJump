function crear() {
    const newUsername = document.getElementById("usuario").value;
    const newPassword = document.getElementById("contrasena").value;
    const confirmPassword = document.getElementById("confirmar").value;

    if (newUsername && newPassword && confirmPassword) {
        // Verificar que la contraseña y la confirmación coincidan
        if (newPassword === confirmPassword) {
            // Guardamos el nuevo usuario en localStorage
            localStorage.setItem("savedUsername", newUsername);
            localStorage.setItem("savedPassword", newPassword);

            alert("Usuario creado exitosamente. Ahora puedes iniciar sesión.");
            // Redirigir a la página de login
            window.location.href = 'login.html';
        } else {
            alert("Las contraseñas no coinciden. Por favor, vuelve a intentarlo.");
        }
    } else {
        alert("Por favor, llena todos los campos.");
    }
}
