'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0'); // 43
const score1El = document.getElementById('score--1'); // 24

const currentValue0El = document.getElementById('current--0'); // 0
const currentValue1El = document.getElementById('current--1'); // 0

const newGame0El = document.querySelector('.btn--new');
const rollDice0El = document.querySelector('.btn--roll');
const Hold0El = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

let score, currentValue, activePlayer, playing;
const init = function () {
  score = [0, 0];
  currentValue = 0;
  activePlayer = 0;
  playing = true;

  dice.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentValue0El.textContent = 0;
  currentValue1El.textContent = 0;

  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//switch player
const switchPlayer = function () {
  currentValue = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentValue;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // it'remove it it there/ it add if it did't there
  player1El.classList.toggle('player--active');
};

rollDice0El.addEventListener('click', function () {
  if (playing) {
    // Generate the random number;
    const generateNumber = Math.trunc(Math.random() * 6) + 1;
    // display the image based the generate number
    dice.classList.remove('hidden');
    dice.src = `dice-${generateNumber}.png`;

    // if the number is 1 change to player 2 and the current score will be 0
    if (generateNumber !== 1) {
      currentValue += generateNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentValue;
    } else {
      // change to player2
      switchPlayer();
    }
  }
});

Hold0El.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentValue;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    console.log(score[activePlayer]);
    // if the score is greater than or equal to 100. win the playeer
    if (score[activePlayer] > 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

newGame0El.addEventListener('click', init);
