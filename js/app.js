/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//universal variables
const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matches = 0;
const totalPairs = 8;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if(clickIsValid(clickTarget)) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }
    toggleCard(clickTarget);
    addToggledCard(clickTarget);
    if(toggledCards.length === 2) {
      matchCheck(clickTarget);
      addCount();
      starScores();
      checkWin();
    }
  }
});

function clickIsValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );
}

//keeps track of open cards
function toggleCard(card){
  card.classList.toggle('open');
  card.classList.toggle('show');
}

function addToggledCard(clickTarget){
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

function matchCheck() {
  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matches++;
  }
  else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
}

function addCount() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//hides a star after user reaches 12 and 17 moves
function starScores() {
  if (moves === 12 || moves === 17) {
    hideStar();
  }
}

function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  //displays a 0 before the amount of seconds if under 2 digits
  if (seconds < 10) {
    clock.innerHTML = minutes + ":0" + seconds;
  } else {
    clock.innerHTML = minutes + ":" + seconds;
  }
}

function stopClock(){
  clearInterval(clockId);
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if(star.style.display !== 'none'){
      star.style.display = 'none';
      break;
    }
  }
}

function toggleModal() {
  const modal = document.querySelector(".modal_background")
  modal.classList.toggle('hide');
}

function fillModal() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Star Power = ${stars}`;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if(star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});
document.querySelector('.modal_close').addEventListener('click', () => {
  toggleModal();
});
document.querySelector('.modal_replay').addEventListener('click', replay);
document.querySelector('.restart').addEventListener('click', reset);

function reset() {
  stopClock();
  time = 0;
  clockOff = true;
  displayTime();
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
  resetStars();
  shuffleDeck();
  resetCards();
  matches = 0;
  toggledCards = [];
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function endGame() {
  stopClock();
  fillModal();
  toggleModal();
}

function checkWin() {
  if (matches === totalPairs) {
    endGame();
  }
}


function replay() {
  reset();
  toggleModal();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
