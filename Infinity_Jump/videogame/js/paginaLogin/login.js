let userID;

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
    } else if (response.status === 401) {
        alert("Usuario o contraseña incorrectos.");
        return;
    }
}


function openGame(){
    window.location.href = 'game_screen.html';
}

function openMain(){
    window.location.href = 'mainPage.html';
}

function openLogin(){
    window.location.href = 'loginPagina.html';
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

