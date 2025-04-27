/**
@param {number} alpha Indicated the transparency of the color
@returns {string} A string of the form 'rgba(240,50,123, 1.0)' that represents the color
*/

function random_color(alpha=1.0){
  const r_c = () => Math.round(Math.random() * 255)
  return `rgba(${r_c()},${r_c()},${r_c()}, ${alpha})`
}

Chart.defaults.font.size = 10;

// Hay que obtener una referencia del canvas en el que vamos a plotear el primer chart.
document.addEventListener('DOMContentLoaded', () => {

  const canvasRank = document.getElementById('graficaRank');

  if (canvasRank) {
    const ctxRank = canvasRank.getContext('2d');
    const rankChart = new Chart(ctxRank, {
      type: 'pie', // Tipo de gráfica de pastel
      data: {
        labels: ['Mejora1', 'Mejora2', 'Mejora3'],
        datasets: [{
          label: 'Mejoras más usadas por los pros',
          data: [5, 16, 9],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
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
  }
});

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

  
  const leaderboard = document.getElementById("formLeaderboard");
  if (leaderboard) {
    leaderboard.onsubmit = async (e) => {
      e.preventDefault();
    
      const response = await fetch(`http://localhost:5000/api/ranking`, {
        method: "GET",
      });
      if(response.ok)
        {
            let results = await response.json()
        
            if(results.length > 0)
            {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
    
                let table = document.createElement("table")
    
                let tr = table.insertRow(-1)                  
    
                for(const header of headers)
                {
                    let th = document.createElement("th")     
                    th.innerHTML = header
                    tr.appendChild(th)
                }
    
                for(const row of values)
                {
                    let tr = table.insertRow(-1)
    
                    for(const key of Object.keys(row))
                    {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
    
                const container = document.getElementById('getResultsTop')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else
            {
                const container = document.getElementById('getResultsTop')
                container.innerHTML = 'No hay estadísticas por mostrar.'
            }
        }
        else{
            getResults.innerHTML = response.status
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
  document.getElementById('graficasTabla').style.display = 'block';
  document.getElementById('graficasGrafica').style.display = 'block';
}