const cardElements = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');

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
let numberOfMatchedPairs=0;
//This function is called when the card is clicked
const flip = function flip(thisCard) {
    thisCard.classList.add('clicked');
}

const handleOnCardClick = function handleOnCardClick(event) {
    console.log('Hello I clicked ye!')
    let card = event.target;
    //if the card is flipping dont do anything
    if (flipping == false) {
        flip(card);
        if (openCard == null) {
            //Temporary remove event handler so the user cannnot click on the card twice.The event handle will be added back if the user doesn't match the card
            card.removeEventListener('click', handleOnCardClick);
            openCard = card;
        }
        else {
            if (card.isEqualNode(openCard)) {
                console.log('the two cards are the same, well done');
                numberOfMatchedPairs++;
                //remove the event handler from the matched cards
                card.removeEventListener('click', handleOnCardClick);
                //openCard.removeEventListener('click', handleOnCardClick); [allready removed when openCard == null ]
                //Add a match class to paired cards for styling
                card.classList.add('match');
                openCard.classList.add('match'); 
                checkIfUserWon(numberOfMatchedPairs);
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
    cardElements.forEach(function (card) {
        card.addEventListener('click', handleOnCardClick);
        card.classList.remove('clicked');
        card.classList.remove('match');
    });
}

gameStart();
