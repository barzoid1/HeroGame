const apiKey = '10223569763528853'
const apiURL =`https://superheroapi.com/api.php/${apiKey}`
const input = document.getElementById('input')
const pscore = document.getElementById('player-score')
let hands = document.getElementById('getHero')
let sands = document.getElementById('getCHero')
let endGamebtn = document.getElementById('endGameButton')
const result = document.getElementById('result')

const getHero = (character) => {
  if (!character.powerstats) {
    return 0;
  }
  const jay = Object.keys(character.powerstats);
  const res = jay.map(stat => Number(character.powerstats[stat]));
  return res.reduce((a, b) => a + b);
}

  
function playerChoice(name) {
fetch(`${apiURL}/search/${name}`)
.then(res => res.json())
.then(result => {
      const herop = result.results[0];
      const name = `<h2>${herop.name}</h2>`;
      const img = `<img src='${herop.image.url}'/>`;
      hands.innerHTML = `${img}${name}`;
    getHero(name);
      })
  
}
function computerChoice(id) {
fetch(`${apiURL}/${id}`)
    .then(res => res.json())
    .then(json => {
      const heroC = json.results[0];
      const name = `<h2>${heroC.name}</h2>`;
      const img = `<img src='${heroC.image.url}'/>`;
      sands.innerHTML = `${img}${name}`
      getHero(name)
    });
}

const randID = () => { 
  const randnum = 731
  return Math.floor(Math.random() * randnum) + 1
 }
 

 
 function getResult(playerScore, computerScore){
  console.log(`Player score: ${playerScore}, Computer score: ${computerScore}`);
  let score;
  if (playerScore < computerScore) {
    score = -1;
  } else if (playerScore > computerScore) {
    score = 1;
  } else {
    score = 0;
  }
  return score;
}

function showResult(score){
  if (score == 1) {
    result.innerText = 'You Won';
  } else if (score == -1) {
    result.innerText = "You lost";
  } else if (score == 0) {
    result.innerText = 'Tie';
  }
}
function onStart(playerName) {
  Promise.all([playerChoice(playerName), computerChoice(randID())]).then(([playerScore, computerScore]) => {
      const scores = getResult(playerScore, computerScore)
      showResult(scores)
    });
}

function playGame() {
const searchbtn = document.getElementById('btn')
searchbtn.addEventListener('click', () => {
  onStart(input.value);
});
endGamebtn.onclick = () => endGame()
}
function endGame (){
  hands.innerText = ''
  result.innerText = ''
}
playGame()