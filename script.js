// Sample player data (could be fetched from JSON or API instead)
const playersData = {
    messi: {
      name: 'Lionel Messi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Lionel_Messi_20180626.jpg',
      stats: { goals: 805, assists: 350, appearances: 1030 }
    },
    ronaldo: {
      name: 'Cristiano Ronaldo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg',
      stats: { goals: 850, assists: 280, appearances: 1100 }
    }
  };
  
  // Populate dropdowns (if dynamically loaded)
  function populateDropdowns() {
    const playerSelect = document.getElementById('playerSelect');
    const statSelect = document.getElementById('statSelect');
  
    if (playerSelect && statSelect) {
      // Fill players
      for (const key in playersData) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = playersData[key].name;
        playerSelect.appendChild(option);
      }
  
      // Fill stats
      const stats = ['goals', 'assists', 'appearances'];
      stats.forEach(stat => {
        const option = document.createElement('option');
        option.value = stat;
        option.textContent = stat.charAt(0).toUpperCase() + stat.slice(1);
        statSelect.appendChild(option);
      });
    }
  }
  
  // Handle search submission
  function handleFormSubmission() {
    const form = document.getElementById('searchForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const player = document.getElementById('playerSelect').value;
        const stat = document.getElementById('statSelect').value;
        if (player && stat) {
          localStorage.setItem('selectedPlayer', player);
          localStorage.setItem('selectedStat', stat);
          window.location.href = 'results.html';
        }
      });
    }
  }
  
  // Display results
  function displayResults() {
    const resultCard = document.getElementById('resultCard');
    if (!resultCard) return;
  
    const playerKey = localStorage.getItem('selectedPlayer');
    const statKey = localStorage.getItem('selectedStat');
  
    if (playerKey && statKey && playersData[playerKey]) {
      const player = playersData[playerKey];
      document.getElementById('playerImage').src = player.image;
      document.getElementById('playerName').textContent = player.name;
      document.getElementById('playerStat').textContent =
        statKey.charAt(0).toUpperCase() + statKey.slice(1) + ': ' + player.stats[statKey];
    } else {
      resultCard.innerHTML = '<p class="text-danger">No data found. Please go back and try again.</p>';
    }
  }
  
  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    handleFormSubmission();
    displayResults();
  });
  