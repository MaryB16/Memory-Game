const cardElements = document.querySelectorAll('.card');
const restartButton = document.querySelector('.restart-button');
const movesCounter = document.querySelector('#moves-counter');
const timerCounter = document.querySelector('#timer-counter');
const starElements = document.querySelectorAll('.star-element');
const popUpContainer = document.querySelector('.popUp-container');
const starElementsContainer = document.querySelector('.star-rating');

let openCard;
let flipping;
let numberOfMatchedPairs;
let moves;
let gameTimer;
//First click lets the timer know when to start
let firstClick;

//When the game starts, this function makes sure the cards are 'shuffled'( the cards have a random pattern on the grid)
const shuffleCards= function shuffleCards(cardList) {
    let cardPosition = cardList.length;
    while (0 !== cardPosition) {
        let randomCardPosition = Math.floor(Math.random() * cardPosition);
        cardPosition -= 1;
        let temporaryCard = cardList[cardPosition].innerHTML;
        cardList[cardPosition].innerHTML = cardList[randomCardPosition].innerHTML;
        cardList[randomCardPosition].innerHTML = temporaryCard;
    }

    return cardList;
}

/**
 * Flips a card, revealing it's contents. If it's the first card clicked, it also starts the timer.
 * @param {HTMLElement} cardElement
 */
const flip = function flip(cardElement) {
    cardElement.classList.add('clicked');
    // Count the number of moves made by the user
    moves++;
    if (firstClick == false) {
        startTimer();
        firstClick = true;
    }
}

/**
 * Starts the game timer.
 */
const startTimer = function startTimer() {
    let seconds = 0;
    let minutes = 0;
    const timer = function timer() {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        // Adds padding zeroes to the seconds (ie. 0:05, 0:06, etc)
        timerCounter.textContent = `${minutes}:${(seconds + '').padStart(2, '00')}`;
    };
    gameTimer = setInterval(timer, 1000);
}

/**
 * Checks if the user has matched all cards. If true stop the timer and show the win popup.
 * @param {Number} numberOfPairs
 */
const checkIfUserWon = function checkIfUserWon(numberOfPairs) {
    // TODO: change constant 2 to actual number of cards that need to be matched
    if (numberOfMatchedPairs == 2) {
        clearInterval(gameTimer);
        showPopUp();      
    }
}

/**
 * Removes a star from the user based on the number of performed moves.
 */
const updateStarStatus = function updateStarStatus() {
    // TODO: change the points at which stars are deducted (ie. after 10 moves or 20 moves)
    if (moves == 2) {
        // Remove one star
        starElements[2].style.visibility = "hidden";
    }
    else if (moves == 4) {
        // Remmove the other
        starElements[1].style.visibility = "hidden";
    }
}

/**
 * Handles clicks on card elements.
 * @param {any} event
 */
const handleOnCardClick = function handleOnCardClick(event) {
    const card = event.target;
    // If the card is flipping don't do anything
    if (flipping == false) {
        flip(card);
        updateStarStatus();
        movesCounter.textContent = moves;

        if (openCard == null) {
            //Temporary remove event handler so the user cannnot click on the card twice.The event handle will be added back if the user doesn't match the card
            card.removeEventListener('click', handleOnCardClick);
            openCard = card;
        }
        else {
            if (card.isEqualNode(openCard)) {
                numberOfMatchedPairs++;
                
                checkIfUserWon(numberOfMatchedPairs);
               
                // Remove the event handler from the matched cards
                card.removeEventListener('click', handleOnCardClick);
                // openCard.removeEventListener('click', handleOnCardClick); [allready removed when openCard == null ]
                card.classList.add('match');
                openCard.classList.add('match'); 
                // Reset the openCard so we can match other cards as well
                openCard = null;
            }
            else {
                flipping = true;

                setTimeout(() => {
                    openCard.classList.remove('clicked');
                    card.classList.remove('clicked');
                    // Add the eventhandler on the card so it can be used again
                    openCard.addEventListener('click', handleOnCardClick);
                    openCard = null;
                    flipping = false;
                }, 500);
            }
        }
    }
}

/**
 * Shuffles the cards and sets the initial game state.
 */
const gameStart = function gameStart() {
    shuffleCards(cardElements);
    numberOfMatchedPairs = 0;
    //Reset the moves Counter;
    openCard = null;
    moves = 0;
    movesCounter.textContent = 0;
    firstClick = false;
    flipping = false;
    clearInterval(gameTimer);
    timerCounter.textContent = '0:00';

    cardElements.forEach(function (card) {
        card.addEventListener('click', handleOnCardClick);
        card.classList.remove('clicked');
        card.classList.remove('match');
    });

    starElements.forEach(function (star) {
        star.style.visibility = 'visible';
    });
}

gameStart();

//Game restart
restartButton.addEventListener('click', function () {

    gameStart();
});

//Game PopUP
const showPopUp = function showPopUp() {
    popUpContainer.style.display = 'block';
    const popUpMoves = document.querySelector('.popUp-moves');
    const popUpTimer = document.querySelector('.popUp-timer');
    const popUpRating = document.querySelector('.popUp-rating');
    const popUpButton = document.querySelector('.button');
    popUpMoves.textContent = `${movesCounter.textContent}`;
    popUpTimer.textContent = `${timerCounter.textContent}`;
    popUpRating.innerHTML = `${starElementsContainer.innerHTML}`;
    popUpButton.addEventListener('click', function () {
        gameStart();
        popUpContainer.style.display = 'none';
    })
};