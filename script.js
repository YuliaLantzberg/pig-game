'use strict';

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let playGame;
let winner;
const CANCEL_CURRENT = 1;
const WIN_SCORE = 100;

const players = {
    'player1': {
        selector: document.querySelector('.player--0'),
        curScoreSelector: document.querySelector('#current--0'),
        scoreSelector: document.querySelector('#score--0'),
        currentScore: 0,
        totalScore: 0
    },
    'player2': {
        selector: document.querySelector('.player--1'),
        curScoreSelector: document.querySelector('#current--1'),
        scoreSelector: document.querySelector('#score--1'),
        currentScore: 0,
        totalScore: 0
    }
}
diceEl.classList.add('hidden');
players['player1'].scoreSelector.textContent = 0;
players['player2'].scoreSelector.textContent = 0;

const updateDisplay = function() {
    players['player1'].scoreSelector.textContent = players['player1'].totalScore;
    players['player2'].scoreSelector.textContent = players['player2'].totalScore;
    players['player1'].curScoreSelector.textContent = players['player1'].currentScore;
    players['player2'].curScoreSelector.textContent = players['player2'].currentScore;
}

const findActivePlayer = function() {
    let currentPlayer;
    const activePlayer = document.querySelector('.player--active');
    for (const player of Object.keys(players)) {
        Object.keys(players[player]).forEach(function(key) {
            if (players[player][key] === activePlayer) { 
              currentPlayer = player;
            } 
        })
    }
    return currentPlayer;
}

const changeActivePlayer = function() {
    const currentPlayer = findActivePlayer();
    players[currentPlayer].currentScore = 0;
    updateDisplay();
    // remove active class from current player
    players[currentPlayer].selector.classList.remove('player--active')
    // add active class to another player
    for (const player of Object.keys(players)) {
        if (player !== currentPlayer) {
            players[player].selector.classList.add('player--active');
        }
    }
}

const changeCurrent = function(curScore) {  
    const currentPlayer = findActivePlayer();
    // add current score if dice is not 1
    if(curScore !== CANCEL_CURRENT) {
        players[currentPlayer].currentScore += curScore;
        updateDisplay();
    } else changeActivePlayer(currentPlayer);  // cancel current score if dice is 1   
}

const diceRollHanlder = function() {
    if(playGame)
    { // roll dice and display the result, update current score
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.setAttribute('src', 'dice-' + dice + '.png');
        diceEl.classList.remove('hidden');
        changeCurrent(dice); 
    }
}

const holdHandler = function() {
    if(playGame) {
        const currentPlayer = findActivePlayer();
        players[currentPlayer].totalScore += players[currentPlayer].currentScore;
        updateDisplay();
        // if players wins, finish the game, otherwise change active player
        if (players[currentPlayer].totalScore >= WIN_SCORE) {
            players[currentPlayer].selector.classList.add('player--winner');
            playGame = false;
        } else changeActivePlayer();
    }  
}

const startGame = function() {
    if(!playGame) {
        const currentPlayer = findActivePlayer();
        diceEl.classList.add('hidden');
        players['player1'].currentScore = 0;
        players['player2'].currentScore = 0;
        players['player1'].totalScore = 0;
        players['player2'].totalScore = 0;
        players[currentPlayer].selector.classList.remove('player--winner');
        updateDisplay();
        playGame = true;
    }
}

btnRoll.addEventListener('click', diceRollHanlder);
btnHold.addEventListener('click', holdHandler);
btnNew.addEventListener('click', startGame);

startGame();



