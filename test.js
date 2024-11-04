// assign the active player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// assign the value of the score
const scoreValue0EL = document.getElementById('score--0'); // default 43; we can change to 0;
const scoreValue1EL = document.getElementById('score--1'); // default 23; we can change to 0;
// assign the players
const playerOne0El = document.getElementById('name--0');
const playerTwo1El = document.getElementById('name--1');
// assign the current value
const currentValue0El = document.getElementById('current--0');
const currentValue1El = document.getElementById('current--1');
// asssign the Games Buttons
const btnNewGame0El = document.querySelector('.btn--new');
const btnRoll0El = document.querySelector('.btn--roll');
const btnHold0El = document.querySelector('.btn--hold');
// show the dice class
const dice0El = document.querySelector('.dice');

let score, activePlayer, currentScore, playing;

// score value change to 0.
const init = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  scoreValue0EL.textContent = 0;
  scoreValue1EL.textContent = 0;
  currentValue0El.textContent = 0;
  currentValue1El.textContent = 0;

  dice0El.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// change the player
const switchPlayer = function () {
  // change the player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // the toggle used for the class
  // add the class if it did't there, remove class if it's there
  player0El.classList.toggle('player--active'); // it'remove it it there/ it add if it did't there
  player1El.classList.toggle('player--active');
};

btnRoll0El.addEventListener('click', function () {
  if (playing) {
    // 1) Generate random Number;
    const generateID = Math.trunc(Math.random() * 6) + 1;
    // 2)  display dice
    dice0El.classList.remove('hidden');
    dice0El.src = `dice-${generateID}.png`;
    // 3) check for the rolled 1; if true change player

    if (generateID !== 1) {
      // if not 1 continue
      currentScore += generateID;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold0El.addEventListener('click', function () {
  if (playing) {
    // 1) Add the cureent score to the active player score
    score[activePlayer] += currentScore;
    // console.log(score[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2) check if the Player score is >=100
    if (score[activePlayer] > 100) {
      playing = false;
      dice0El.classList.add('hidden');
      // 3) Finish the Game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 4) switch the player
      switchPlayer();
    }
  }
});

btnNewGame0El.addEventListener('click', init);
