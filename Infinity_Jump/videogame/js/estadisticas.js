/**
@param {number} alpha Indicated the transparency of the color
@returns {string} A string of the form 'rgba(240,50,123, 1.0)' that represents the color
*/

function random_color(alpha=1.0){
  const r_c = () => Math.round(Math.random() * 255)
  return `rgba(${r_c()},${r_c()},${r_c()}, ${alpha})`
}

Chart.defaults.font.size = 10;

window.addEventListener('DOMContentLoaded', () => {
  const misPartidas = document.getElementById("formPartidas");
  if (misPartidas) {
   
    misPartidas.onsubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(misPartidas);
      const usuario = formData.get("usuario");
      console.log(usuario);

      try {
        const response = await fetch(`http://localhost:5000/api/stats/${usuario}`, {
          method: "GET",
        });

        if (response.ok) {
          const results = await response.json();

          const container = document.getElementById('getResultsPartida');
          container.innerHTML = '';

          if (results.length > 0) {
            const headers = Object.keys(results[0]);
            const values = Object.values(results);

            let table = document.createElement("table");
            let tr = table.insertRow(-1);

            for (const header of headers) {
              let th = document.createElement("th");
              th.innerHTML = header;
              tr.appendChild(th);
            }

            for (const row of values) {
              let tr = table.insertRow(-1);
              for (const key of Object.keys(row)) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = row[key];
              }
            }

            container.appendChild(table);

            // Ahora generamos la gráfica basados en el intento y plataformas
            const intentos = results.map(row => row.Intento);
            intentos.reverse();
            const plataformas = results.map(row => row.Saltos_completados);
            plataformas.reverse();

            const canvasPartida = document.getElementById('graficaUsuario');
            const ctxUsuario = canvasPartida.getContext('2d');

            // Destruye gráfica anterior si existe
            if (canvasPartida.chartInstance) {
              canvasPartida.chartInstance.destroy();
            }

            canvasPartida.chartInstance = new Chart(ctxUsuario, {
              type: 'bar',
              data: {
                labels: intentos,
                datasets: [{
                  label: 'Plataformas alcanzadas',
                  data: plataformas,
                  backgroundColor: random_color(0.5),
                  borderColor: random_color(),
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });

          } else {
            container.innerHTML = 'No hay estadísticas por mostrar.';
          }
        } else {
          container.innerHTML = 'Error: ' + response.status;
        }
      } catch (error) {
        console.error('Error al buscar partidas:', error);
      }
    }
  }
});

function openMine() {
  // Hide all containers
  document.querySelectorAll('.tabla-container, .grafica-container').forEach(el => {
      el.style.display = 'none';
  });
  
  // Show only the relevant containers
  document.getElementById('misPartidasTabla').style.display = 'block';
  document.getElementById('misPartidasGrafica').style.display = 'block';
}

async function openLeaderboard() {
  // Hide all containers
  document.querySelectorAll('.tabla-container, .grafica-container').forEach(el => {
      el.style.display = 'none';
  });
  
  // Show only the relevant containers
  document.getElementById('leaderboardTabla').style.display = 'block';
  document.getElementById('leaderboardGrafica').style.display = 'block';

  try {
    const response = await fetch(`http://localhost:5000/api/ranking`, {
      method: "GET",
    });

    if (response.ok){
      const results = await response.json();
      console.log(results);

      if (results.length > 0){
        const headers = Object.keys(results[0]);
        const values = Object.values(results);

        let table = document.createElement("table");

        let tr = table.insertRow(-1);
        for (const header of headers) {
          let th = document.createElement("th");
          th.innerHTML = header;
          tr.appendChild(th);
        }

        for (const row of values) {
          let tr = table.insertRow(-1);
          for (const key of Object.keys(row)) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = row[key];
          }
        }

        const container = document.getElementById('getResultsTop');
        container.innerHTML = '';
        container.appendChild(table);

        // Ahora generamos la gráfica basados en el número de mejoras agarradas entre los 10 mejores intentos
        let totalMejora1 = 0;
        let totalMejora2 = 0;
        let totalMejora3 = 0;

        for (const row of results) {
          totalMejora1 += row.Mejora_1;
          totalMejora2 += row.Mejora_2;
          totalMejora3 += row.Mejora_3;
        }

        const canvasRank = document.getElementById('graficaRank');
        const ctxRank = canvasRank.getContext('2d');

        if (canvasRank.chartInstance) {
          canvasRank.chartInstance.destroy();
        }

        canvasRank.chartInstance = new Chart(ctxRank, {
          type: 'radar',
          data: {
            labels: ['Mayor Salto', 'Mayor Daño', 'Mayor Vida'],
            datasets: [{
              label: 'Veces usada',
              data: [totalMejora1, totalMejora2, totalMejora3],
              backgroundColor: [
                random_color(0.6),
                random_color(0.6),
                random_color(0.6)
              ],
              borderColor: [
                random_color(),
                random_color(),
                random_color()
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      } else {
        const container = document.getElementById('getResultsTop');
        container.innerHTML = 'No hay estadísticas por mostrar.';
      }
    } else {
      const container = document.getElementById('getResultsTop');
      container.innerHTML = 'Error: ' + response.status;
    }
  } catch (error) {
    const container = document.getElementById('getResultsTop');
    container.innerHTML = 'Error de conexión.';
    console.error('Error al obtener ranking:', error);
  }
}

function openGraphs() {
  // Hide all containers
  document.querySelectorAll('.tabla-container, .grafica-container').forEach(el => {
      el.style.display = 'none';
  });
  
  // Show only the relevant containers
  document.getElementById('graficaMejora').style.display = 'block';
  document.getElementById('graficaNiveles').style.display = 'block';

  cargarGraficoMejoras();
  cargarGraficaNivelesMasComunes();
}


// Función para cargar todo el gráfico de mejoras más usadas
async function cargarGraficoMejoras(){
  try 
  {
    const response = await fetch(`http://localhost:5000/api/usomejoras`, {
      method: "GET",
    });

    if (response.ok)
    {
      const results = await response.json();
      console.log(results);

      const total1 = results[0].Total_Mejora_1 || 0;
      const total2 = results[0].Total_Mejora_2 || 0;
      const total3 = results[0].Total_Mejora_3 || 0;

      const canvasMejora = document.getElementById('graficaMejoras');
      const ctxMejoras = canvasMejora.getContext('2d');

      // Nos aseguramos de destruir la gráfica anterior si existe
      if (canvasMejora.chartInstance) {
        canvasMejora.chartInstance.destroy();
      }

      // Creamos la gráfica
      canvasMejora.chartInstance = new Chart(ctxMejoras, {
        type: 'pie',
        data: {
          labels: ['Mayor Salto', 'Mayor Daño', 'Mayor Vida'],
          datasets: [{
            label: 'Veces usada',
            data: [total1, total2, total3],
            backgroundColor: [
              random_color(0.6),
              random_color(0.6),
              random_color(0.6)
            ],
            borderColor: [
              random_color(),
              random_color(),
              random_color()
            ],
            borderWidth: 1
          }]
        },
        options: {}
      });
    }
    else 
    {
      const container = document.getElementById('getResultsTop');
      container.innerHTML = 'Error: ' + response.status;
    }
  } 
  catch (error) 
  {
    const container = document.getElementById('getResultsTop');
    container.innerHTML = 'Error de conexión.';
    console.error('Error al obtener ranking:', error);
  }
}

// Función para cargar todo el gráfico de niveles más comunes
async function cargarGraficaNivelesMasComunes() {
  try {
    const response = await fetch('http://localhost:5000/api/nivelesComunes', {
      method: "GET"
    });

    if (response.ok) {
      const resultados = await response.json();
      console.log(resultados);

      const niveles = resultados.map(item => `Nivel ${item.nivel}`);
      const cantidades = resultados.map(item => item.veces);

      const canvasNiveles = document.getElementById('graficaNivelesComunes');
      const ctxNiveles = canvasNiveles.getContext('2d');

      // Destruir gráfica anterior si existe
      if (canvasNiveles.chartInstance) {
        canvasNiveles.chartInstance.destroy();
      }

      canvasNiveles.chartInstance = new Chart(ctxNiveles, {
        type: 'line', // O 'pie', 'doughnut', como quieras
        data: {
          labels: niveles,
          datasets: [{
            label: 'Veces alcanzado',
            data: cantidades,
            backgroundColor: [
              random_color(0.6),
              random_color(0.6),
              random_color(0.6)
            ],
            borderColor: [
              random_color(),
              random_color(),
              random_color()
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    } else {
      console.error('Error al cargar niveles más comunes:', response.status);
    }
  } catch (error) {
    console.error('Error de conexión al cargar niveles más comunes:', error);
  }
}
