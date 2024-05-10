'use strict';

const playButton = document.querySelector('.home__button__button');

const play = () => {
    document.getElementById('home').classList.add('invisible');
    document.getElementById('play').classList.remove('invisible');
}

playButton.addEventListener('click', play, true);

const toggle = () => {

}

document.querySelector('.home__button__button').addEventListener('click',toggle,true);
