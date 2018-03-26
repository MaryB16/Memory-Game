const cardElements = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart-button');
let movesCounter = document.querySelector('#moves-counter');
let timerCounter = document.querySelector('#timer-counter');
let starElements = document.querySelectorAll('.star-element');
const popUpContainer = document.querySelector('.popUp-container');
const starElementsContainer = document.querySelector('.star-rating')

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

let openCard = null;
let flipping = false;
let numberOfMatchedPairs;
let moves;
let gameTimer;
//First click lets the timer know when to start
let firstClick = false;
//The starNumber will help determining which star "disappears" after a certain number of  moves
let numberOfStars = starElements.length;

//This function is called when the card is clicked
const flip = function flip(thisCard) {
    thisCard.classList.add('clicked');
    //I added the game timer here so it starts when I flip the first card
    //Game timer
    let seconds = 0;
    let minutes = 0;
    if (firstClick == false) {
        const timer = function timer() {
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }
            //TO DO CHANGE TIMER BACK AFTER TESTING;
            timerCounter.textContent = `${minutes}:${seconds}`;
        };
        gameTimer = setInterval(timer, 1000);
        firstClick = true;
    }
}
//Congratiolations you won pop-up
const checkIfUserWon = function checkIfUserWon(numberOfPairs) {
    
    if (numberOfMatchedPairs == 2) {
        //setTimeout(() => { alert("YEY") }, 600);
        
        showPopUp();
    }
}

const handleOnCardClick = function handleOnCardClick(event) {
    console.log('Hello I clicked ye!')
    console.log(`I clicked for the first time. ${firstClick}`)
    let card = event.target;
    //if the card is flipping dont do anything
    if (flipping == false) {
        flip(card);
        //Counting the number of moves made by the user and showing them on screen
        moves++;
        //TO DO: change the NUMBER OF MOVES NEEDED after the testing phase is done
        if (moves == 2) {
            starElements[numberOfStars - 1].style.visibility = "hidden";
            //I am changing the last star selected
        }

        else if (moves == 4) {
            //TO DO: change the way we acces the next star
            starElements[numberOfStars - 2].style.visibility = "hidden";
        }

        movesCounter.textContent = moves;
        if (openCard == null) {
            //Temporary remove event handler so the user cannnot click on the card twice.The event handle will be added back if the user doesn't match the card
            card.removeEventListener('click', handleOnCardClick);
            openCard = card;
        }
        else {
            if (card.isEqualNode(openCard)) {
                console.log('the two cards are the same, well done');
                numberOfMatchedPairs++;
                
                checkIfUserWon(numberOfMatchedPairs);
               
                //remove the event handler from the matched cards
                card.removeEventListener('click', handleOnCardClick);
                //openCard.removeEventListener('click', handleOnCardClick); [allready removed when openCard == null ]
                //Add a match class to paired cards for styling
                card.classList.add('match');
                openCard.classList.add('match'); 
                //reset the openCard so we can match other cards as well
                openCard = null;
            }
            else {
                flipping = true;
                console.log("haha try again");

                setTimeout(() => {
                    openCard.classList.remove('clicked');
                    card.classList.remove('clicked');
                    //Added the eventhandler on the card so it can be used again
                    openCard.addEventListener('click', handleOnCardClick);
                    openCard = null;
                    flipping = false;
                }, 500);
            }
        }
    }
}

//created a game Start Function that when invoked starts the game
const gameStart = function gameStart() {
    shuffleCards(cardElements);
    numberOfMatchedPairs = 0;
    //Reset the moves Counter;
    moves = 0;
    movesCounter.textContent = 0;
    
    let firstClick = false;
   
    cardElements.forEach(function (card) {
        card.addEventListener('click', handleOnCardClick);
        card.classList.remove('clicked');
        card.classList.remove('match');
    });

    for (i = 0; i < numberOfStars; i++) {
        starElements[i].style.visibility = "visible";
    }
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
    popUpMoves.textContent = `Moves: ${movesCounter.textContent}`;
    popUpTimer.textContent = `Timer: ${timerCounter.textContent}`;
    popUpRating.innerHTML = `Star rating: ${starElementsContainer.innerHTML}`;
    popUpButton.addEventListener('click', function () {
        gameStart();
        popUpContainer.style.display = 'none';
    })
}