'use strict';

const playboard = document.querySelector('.play__board__table');
let player = [];
let computer = [];
let playerScore = 0;
let computerScore = 0;
const winnerTable = [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]];

let counter = 0;                    
playboard.addEventListener('click', (e) => {
    counter++;
    const playerId = ~~e.target.id
    player.push(playerId);
    e.target.classList.add('star__doodle');
    
    if (counter >= 3) {
        for (let i = 0; i < winnerTable.length; i++) {
            if (winnerTable[i].every(el => JSON.stringify(player).indexOf(el) > -1)) {
                playerScore++;
                document.getElementById('player__score').innerHTML = playerScore;
                return;
            }
            console.log(computer);
            if (winnerTable[i].every(el => JSON.stringify(computer).indexOf(el) > -1)) {
                computerScore++;
                document.getElementById('computer__score').innerHTML = computerScore;
                return;
            }
        }

    }
        
    
    
    const computerId = computerPlay(playerId);
    if (computerId) {
        console.log(computerId);
        computer.push(computerId);
        document.getElementById(computerId).classList.add('circle__doodle');
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

const decideWinner = (player) => {

}


const getRamdomNumber = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}