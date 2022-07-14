const ROCKET_DAMAGE = 20;
const COMPANY_DAMAGE = 30;

class Player {
  constructor(name, playerDiv) {
    this.name = name;
    this.playerDiv = playerDiv;
    this.live = 100;
  }
}


Player.prototype.updateLiveUi = function () {
  let liveParagraph = this.playerDiv.querySelector('#liveParagraph');
  liveParagraph.innerHTML = this.live;
}

Player.prototype.addLive = function (value) {
  this.live += value;
  this.updateLiveUi();
}

let players; 

function initialLives(players) {
  for (let i = 0; i < players.length; i++) {
    const element = players[i].playerDiv;
    let liveDiv = element.querySelector('#playerLive');
    const paragraph = document.createElement('p');
    paragraph.setAttribute('id', 'liveParagraph');
    let content = document.createTextNode("100");
    paragraph.appendChild(content);
    liveDiv.appendChild(paragraph);
  }
}

function initializeEvents(players) {
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    const element = players[i].playerDiv;
    const rocketAttackButton = element.querySelector('#rocketAttack');
    const companyAttackButton = element.querySelector('#companyAttack');
    console.log(rocketAttackButton, companyAttackButton);
    let enemy = i === 0 ? players[1] : players[0];
    rocketAttackButton.addEventListener('click', () => {
      console.log(`Rocket attack from ${player.name} to ${enemy.name}`);
      damage(enemy, ROCKET_DAMAGE);
    });
    companyAttackButton.addEventListener('click', () => { 
      console.log(`Company attack from ${player.name} to ${enemy.name}`);
      damage(enemy, COMPANY_DAMAGE);
    });
  }
}

function checkLives() {
  for (let i = 0; i < players.length; i++) {
    const element = players[i];
    if (element.live <= 0) {
      alert(`The player ${element.name} has died`);
    }
  }
}

function damage(player, amount) {
  player.addLive(- amount);
  checkLives();
}

function startGame() {
  // inicializar objetos
  let playerDivs = document.getElementsByClassName('player');
  elon = new Player('Elon Musk', playerDivs[0]);
  jeff = new Player('Jeff Bezos', playerDivs[1]);
  players = [elon, jeff];
  // dar vida inicial
  initialLives(players);
  // crear eventos
  initializeEvents(players);
}

window.onload = function () {
  startGame();
}
