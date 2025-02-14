function renderChart(id_or_index) {
  let index = typeof(id_or_index)== 'string' ? cutIndexOutOfId(id_or_index) : id_or_index;
  let value = providePokemonStatsValue(index);
  let chart_setup = {
    type: 'radar',
    data: {
      labels: ['HP', 'AT', 'DE', 'SA', 'SD', 'SP'],
      datasets: [{
        data: value,
        borderWidht: 1,
      }]
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: false,

        }
      },
      scales: {
        y: {
          display: false,
          beginAtZero: false
        },
        r: {
          min: 0,
          max: 125,
          beginAtZero: true,
          ticks: {
            display: false,
          }
        },

      },
      elements: {
        point: {
          pointStyle: false,
        },
        line: {
          borderWidth: 0,
          backgroundColor: '#d6960c80',
        }
      }
    }
  };

  const ctx = document.getElementById(`pokemon_stat_chart_${index}`);
  new Chart(ctx, chart_setup);
}

function refreshAllChart() {
  let frame = document.getElementById('content');
  let count = frame.getElementsByClassName('pokemon_stat_chart');
  for (let i = 0; i < count.length; i++) {
    renderChart(count[i].id);
  }
}

function cutIndexOutOfId(id) {
  let cut = id.replace(/(pokemon_stat_chart_)/g, "");
  return cut;
}