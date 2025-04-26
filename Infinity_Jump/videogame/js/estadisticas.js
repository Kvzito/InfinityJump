
window.addEventListener('DOMContentLoaded', () => {
  const misPartidas = document.getElementById("formPartidas");
  if (misPartidas) {
    misPartidas.onsubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData(misPartidas);
      const usuario = formData.get("usuario");
      console.log(usuario);
      const response = await fetch(`http://localhost:5000/api/stats/${usuario}`, {
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
    
                const container = document.getElementById('getResultsPartida')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else
            {
                const container = document.getElementById('getResultsPartida')
                container.innerHTML = 'No hay estadísticas por mostrar.'
            }
        }
        else{
            getResults.innerHTML = response.status
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