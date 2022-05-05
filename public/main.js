// Home page

const baseURL = "https://statsapi.web.nhl.com/api/v1/teams";

document.getElementById("view-teams-btn").onclick = () => {
  axios.get(baseURL).then((res) => {
    displayTeams(res.data.teams);
  });
};

const getTeamRoster = (team) => {
  console.log(team);
  axios.get(`${baseURL}/${team.id}/roster`).then((res) => {
    displayPlayers(res.data.roster);
  });
};

const createPlayerDisplay = (player) => {
  console.log(player);
  const playerDisplay = document.createElement("div");
  playerDisplay.classList.add("player");
  const playersContainer = document.getElementById("players-container");
  playerDisplay.innerHTML = `<p class="player-name">${player.person.fullName}</p>
  <p class="player-number">${player.jerseyNumber}</p>
  <p class="player-position">${player.position.name}</p>`;
  playersContainer.appendChild(playerDisplay);
};

const createTeamsDisplay = (team) => {
  const teamDisplay = document.createElement("div");
  teamDisplay.classList.add("individual-team");
  const teamsContainer = document.getElementById("teams-container");
  teamDisplay.innerHTML = `<p class="team-name">${team.name}</p>
  <button class="view-roster" id="${team.abbreviation}">View Roster</button>`;
  teamsContainer.appendChild(teamDisplay);
  const rosterBtn = document.getElementById(team.abbreviation);
  rosterBtn.addEventListener("click", () => {
    getTeamRoster(team);
  });
};

const displayTeams = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    createTeamsDisplay(arr[i]);
  }
};

const displayPlayers = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    createPlayerDisplay(arr[i]);
  }
};
