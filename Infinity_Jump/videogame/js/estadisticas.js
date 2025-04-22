
window.addEventListener('DOMContentLoaded', () => {
const misPartidas = document.getElementById("misPartidas");
const leaderboard = document.getElementById("leaderboard");
});

function openMine() {
  misPartidas.style.display = "block"; 
  leaderboard.style.display = "none";  
}

function openLeaderboard() {
  leaderboard.style.display = "block";
  misPartidas.style.display = "none";
}