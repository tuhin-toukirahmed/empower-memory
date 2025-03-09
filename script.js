const symbols = [
  "🍎",
  "🍌",
  "🍒",
  "🍇",
  "🍎",
  "🍌",
  "🍒",
  "🍇",
  "🍉",
  "🍉",
  "🍓",
  "🍓",
];
let shuffledSymbols = symbols.sort(() => Math.random() - 0.5);
let gameBoard = document.getElementById("gameBoard");
let firstCard = null,
  secondCard = null;
let lockBoard = false;
let moves = 0;

shuffledSymbols.forEach((symbol) => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.textContent = this.dataset.symbol;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    moves++;
    document.getElementById("moves").textContent = moves;
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    resetCards();
    if (document.querySelectorAll(".flipped").length === symbols.length) {
      setTimeout(() => alert(`You win in ${moves} moves! 🎉`), 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
