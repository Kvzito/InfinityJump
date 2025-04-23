
window.addEventListener('DOMContentLoaded', () => {
const misPartidas = document.getElementById("formPartidas");
if (misPartidas) {
  misPartidas.onsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(misPartidas);
    const usuario = formData.get("usuario");
    const response = await fetch(`http://localhost:5000/api/stats/${usuario}`, {
      method: "GET",
    });
    if (response.ok){
      const results = await response.json();
      console.log(results);
    } else {
      console.log(response.status);
    }
  }
}
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


// document.getElementById('misPartidas').onsubmit = async (e) =>
// {
//     e.preventDefault()

//     const data = new FormData(formPartidas)
//     const dataObj = Object.fromEntries(data.entries())

//     let response = await fetch(`http://localhost:5000/api/stats/${dataObj['usuario']}`,{
//         method: 'GET'
//     })
    
//     if(response.ok){
//       console.log(response)
//     } else {
//       console.log(response.status)
//     }
    // {
    //     let results = await response.json()
    
    //     if(results.length > 0)
    //     {
    //         const headers = Object.keys(results[0])
    //         const values = Object.values(results)

    //         let table = document.createElement("table")

    //         let tr = table.insertRow(-1)                  

    //         for(const header of headers)
    //         {
    //             let th = document.createElement("th")     
    //             th.innerHTML = header
    //             tr.appendChild(th)
    //         }

    //         for(const row of values)
    //         {
    //             let tr = table.insertRow(-1)

    //             for(const key of Object.keys(row))
    //             {
    //                 let tabCell = tr.insertCell(-1)
    //                 tabCell.innerHTML = row[key]
    //             }
    //         }

    //         const container = document.getElementById('getResultsID')
    //         container.innerHTML = ''
    //         container.appendChild(table)
    //     }
    //     else
    //     {
    //         const container = document.getElementById('getResultsID')
    //         container.innerHTML = 'No results to show.'
    //     }
    // }
    // else{
    //     getResults.innerHTML = response.status
    // }
// }