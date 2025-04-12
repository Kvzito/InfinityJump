var userID;

function openGame(){
    window.location.href = 'nivel_1_screen.html';
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simula una búsqueda en la base de datos
    const response = await fetch('http://localhost:5000/api/buscarUser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    if (response.ok) {
        openGame();
        const results = await response.json();
        userID = results.userID;
        localStorage.setItem('userID', userID);
    } else {
        alert("Usuario o contraseña incorrectos.");
        return;
    }
}
