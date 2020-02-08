

$(document).ready(function() {
  fetch('https://fifagama.herokuapp.com/fifa19/0/10').then((response) => {
    return response.json();
  }).then((data) => {

    const playersList = data.map(item => item.data);
    createPlayersTable(playersList);
    createPriceChart(playersList);
    createWageChart(playersList);
    createLongShotsChart(playersList);
  }).catch((error) => {
    console.log('Get error: ', error)
  })
});


function createPlayersTable(data) {
  var playerTable = document.getElementById('playerTable');
  data.map(player => {

    // create elements to the list
    const playerCell = document.createElement('tr');
    const playerImageRow = document.createElement('th');
    const playerNameRow = document.createElement('td');
    const playerClubRow = document.createElement('td');
    const playerOverall = document.createElement('td');

    // set elements
    playerOverall.innerHTML = player.Overall;
    playerNameRow.className = 'column';

    // add elements
    playerTable.appendChild(playerCell);
    playerCell.appendChild(playerImageRow);
    playerCell.appendChild(playerNameRow);
    playerCell.appendChild(playerClubRow);
    playerCell.appendChild(playerOverall);

    // create sub elements
    const playerImage = document.createElement('img');
    const playerName = document.createElement('span');
    const playerPosition = document.createElement('span');
    const playerClubName = document.createElement('span');
    const playerClubImage = document.createElement('img');

    // set sub elements
    playerImage.src = player.Photo;
    playerImage.className = 'player-image';

    playerName.innerHTML = player.Name;
    playerName.className = 'player-name';

    playerPosition.innerHTML = player.Position;
    playerPosition.className = 'player-position';

    playerClubName.innerHTML = player.Club;

    playerClubImage.src = player['Club Logo'];
    playerClubImage.className = 'player-club-image';

    // add sub elements
    playerImageRow.appendChild(playerImage);
    playerNameRow.appendChild(playerName);
    playerNameRow.appendChild(playerPosition);
    playerClubRow.appendChild(playerClubImage);
    playerClubRow.appendChild(playerClubName);
  });
}

function createPriceChart(data) {
  var ctx = document.getElementById('priceChart').getContext('2d');

  const playersDataName = data.map((player) => player.Name);

  const playersDataPrice = data.map(player =>
    Number(player.Value.substring(1, player.Value.length - 1))
  );
   
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: playersDataName,
      datasets: [
        {
          label: 'Players Value in €M',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: playersDataPrice
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}

function createWageChart(data) {
  var ctx = document.getElementById('wageChart').getContext('2d');

  const playersDataName = data.map(player => player.Name);

  const playersDataWage = data.map(player =>
    Number(player.Wage.substring(1, player.Wage.length - 1))
  );


  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: playersDataName,
      datasets: [
        {
          label: 'Players Wage in €K',
          backgroundColor: '#0059b2',
          borderColor: '#0059b2',
          data: playersDataWage
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}

function createLongShotsChart(data) {
  var ctx = document.getElementById('longShotsChart').getContext('2d');

  const playersDataName = data.map(player => player.Name);

  const playersLongShotsWage = data.map(player => Number(player.LongShots));

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: playersDataName,
      datasets: [
        {
          label: 'Players Long Shots',
          backgroundColor: '#02b56b',
          borderColor: '#02b56b',
          data: playersLongShotsWage
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}
