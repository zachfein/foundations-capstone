// Home page

const baseURL = "https://statsapi.web.nhl.com/api/v1/teams";

document.getElementById("view-teams-btn").onclick = () => {
  axios.get(baseURL).then((res) => {
    displayTeams(res.data.teams);
  });
};

const getTeamRoster = (team) => {
  axios.get(`${baseURL}/${team.id}/roster`).then((res) => {
    displayPlayers(res.data.roster, team.name);
  });
};

const createPlayerDisplay = (player) => {
  const playerDisplay = document.createElement("div");
  playerDisplay.classList.add("player");
  const playerDiv = document.getElementById("player-div");
  playerDisplay.innerHTML = `
  <p class="player-name">${player.person.fullName}</p>
  <p class="player-number">${player.jerseyNumber}</p>
  <p class="player-position">${player.position.name}</p>`;
  playerDiv.appendChild(playerDisplay);
};

const createTeamsDisplay = (team) => {
  const teamDisplay = document.createElement("div");
  teamDisplay.classList.add("individual-team");
  const teamsContainer = document.getElementById("teams-container");
  teamDisplay.innerHTML = `<p class="team-name">--${team.name}--</p>
  <button class="view-roster" id="${team.abbreviation}">View Roster</button>`;
  teamsContainer.appendChild(teamDisplay);
  teamsContainer.classList.add("container-border");
  const rosterBtn = document.getElementById(team.abbreviation);
  rosterBtn.addEventListener("click", () => {
    getTeamRoster(team);
  });
};

const displayTeams = (arr) => {
  const teamsContainer = document.getElementById("teams-container");
  teamsContainer.innerHTML = ``;
  teamsContainer.classList.remove("container-border");
  for (let i = 0; i < arr.length; i++) {
    createTeamsDisplay(arr[i]);
  }
};

const displayPlayers = (arr, name) => {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = ``;
  let teamName = document.createElement("h1");
  teamName.textContent = name;
  const playerDiv = document.createElement("div");
  playerDiv.setAttribute("id", "player-div");
  playersContainer.appendChild(teamName);
  playersContainer.appendChild(playerDiv);
  for (let i = 0; i < arr.length; i++) {
    createPlayerDisplay(arr[i]);
  }
};
