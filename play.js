'use strict';

const playboard = document.querySelector('.play__board__table');
let player = [];
let computer = [];
let playerScore = 0;
let computerScore = 0;
const winnerTable = [[0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]];

let counter = 0;                    
playboard.addEventListener('click', (e) => {
    counter++;
    const playerId = ~~e.target.id
    player.push(playerId);
    e.target.classList.add('star__doodle');
    const computerId = computerPlay(playerId);
    if (computerId != undefined) {
        computer.push(computerId);
        document.getElementById(computerId).classList.add('circle__doodle');
    }

    if (counter >= 3) {
        if (decideWinner(player)) {
            playerScore++;
            document.getElementById('player__score').innerHTML = playerScore;
            return;
        } 
        
        if (decideWinner(computer)) {
            computerScore++;
            document.getElementById('computer__score').innerHTML = computerScore;
            return;
        }
    }
});

const computerPlay = (playerId) => {
    const filteredTable = winnerTable.flatMap(arr => 
        arr.indexOf(~~playerId) > -1 ? arr.filter(el => el != playerId) : []
    );
    let tempSet = new Set(filteredTable);
    player.map(el => tempSet.delete(el));
    computer.map(el => tempSet.delete(el));
    const uniqTable = [...tempSet];
    
    return getRamdomNumber(uniqTable);
}

const decideWinner = (target) => {
    for (let i = 0; i < winnerTable.length; i++) {
        if (winnerTable[i].every(el => JSON.stringify(target).indexOf(el) > -1)) {
            for (let j = 0; j < winnerTable[i].length; j++) {
                document.getElementById(winnerTable[i][j]).classList.add('winner__play');
            }
            playboard.classList.add('disabled');
            return true;
        }
    }
    return false;
}


const getRamdomNumber = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

const refresh = () => {
    let targets = player.concat(computer);
    player = [];
    computer = [];
    counter = 0;
    for (let i = 0; i < targets.length; i++) {
        let boxElement = document.getElementById(targets[i]);
        boxElement.className = 'box';
    }
    playboard.classList.remove('disabled');
}

document.querySelector('.play__refresh').addEventListener('click', refresh, true);

document.querySelector('.play__goback').addEventListener('click', () => {
    window.location.reload();
}, true);

