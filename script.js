// Selecting the elements
let diceImg = document.querySelector(".dice");
let player0 = document.querySelector(".player--0");
let current0 = document.querySelector("#current--0");
let score0 = document.querySelector("#score--0");
let player1 = document.querySelector(".player--1");
let current1 = document.querySelector("#current--1");
let score1 = document.querySelector("#score--1");
let rollDiceBtn = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");
let newGame = document.querySelector(".btn--new");
// Starting Conditions
let currentVal, activePlayer, playerScore, playing;

function init() {
    currentVal = 0;
    activePlayer = 0;
    playerScore = [0, 0];
    playing = true;

    current0.innerHTML = 0;
    current1.innerHTML = 0;
    score0.innerHTML = 0;
    score1.innerHTML = 0;

    diceImg.classList.add("hidden");
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
}
init();
// for selecting element and assgin a value
function selectEl(id, val) {
    return document.querySelector(`#${id}--${activePlayer}`).innerHTML = val;
}
// For Switching player
function switchplayer() {
    selectEl(`current`, 0);
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    currentVal = 0;
}
// Rolling the dice
rollDiceBtn.addEventListener("click", () => {
    if (playing) {
        // Generating Random dice Roll
        let diceNum = Math.trunc((Math.random() * 6) + 1);
        // Display Dice Roll
        diceImg.classList.remove("hidden");
        diceImg.src = `dice-${diceNum}.png`;
        if (diceNum !== 1) {
            // Add Dice roll to current score
            currentVal += diceNum;
            selectEl(`current`, currentVal);
        } else {
            switchplayer();
        }
    }
});
// Hold the score
holdBtn.addEventListener("click", () => {
    if (playing) {
        playerScore[activePlayer] += currentVal;
        // Display new score
        selectEl(`score`, playerScore[activePlayer]);
        // Display Winner
        if (playerScore[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceImg.classList.add("hidden");
            // Finish the game
            playing = false;
        } else {
            switchplayer();
        }
    }
});
newGame.addEventListener("click", init);

