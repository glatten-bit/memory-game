import cards from './memoryPairs.js';

const gameBoard = document.getElementById('gameBoard');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {

  cards.forEach(cardData => {

    const card = document.createElement('div');
    card.classList.add('card');

    card.dataset.match = cardData.matchId;

    card.innerHTML = `
      <div class="front"></div>

      <div class="back">
        <img src="${cardData.image}" />
      </div>
    `;

    card.addEventListener('click', flipCard);

    gameBoard.appendChild(card);

  });

}

function flipCard() {

  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkMatch();

}

function checkMatch() {

  const isMatch =
    firstCard.dataset.match === secondCard.dataset.match;

  if (isMatch) {

    disableCards();

  } else {

    unflipCards();

  }

}

function disableCards() {

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

}

function unflipCards() {

  lockBoard = true;

  setTimeout(() => {

    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();

  }, 1000);

}

function resetBoard() {

  [firstCard, secondCard] = [null, null];

  lockBoard = false;

}

createBoard();