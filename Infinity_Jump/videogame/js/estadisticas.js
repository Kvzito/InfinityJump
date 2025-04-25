function openMine() {
  // Hide all containers
  document.querySelectorAll('.tabla-container, .grafica-container').forEach(el => {
      el.style.display = 'none';
  });
  
  // Show only the relevant containers
  document.getElementById('misPartidasTabla').style.display = 'block';
  document.getElementById('misPartidasGrafica').style.display = 'block';
}

function openLeaderboard() {
  // Hide all containers
  document.querySelectorAll('.tabla-container, .grafica-container').forEach(el => {
      el.style.display = 'none';
  });
  
  // Show only the relevant containers
  document.getElementById('leaderboardTabla').style.display = 'block';
  document.getElementById('leaderboardGrafica').style.display = 'block';
}

function openGraphs() {
  // Hide all containers
  document.querySelectorAll('.tabla-container, .grafica-container').forEach(el => {
      el.style.display = 'none';
  });
  
  // Show only the relevant containers
  document.getElementById('graficasTabla').style.display = 'block';
  document.getElementById('graficasGrafica').style.display = 'block';
}