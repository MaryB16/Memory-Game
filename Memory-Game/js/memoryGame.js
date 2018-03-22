const cardElements = document.querySelectorAll('.card');
////THINK IF U GONNA CHANGE IT TO ID
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
shuffleCards(cardElements)

let openCard = null;
let flipping = false;
//This function is called when the card is clicked
const flip = function flip(thisCard) {
    thisCard.classList.add('clicked');
}

const handleOnCardClick = function handleOnCardClick(event) {
    console.log('Hello I clicked ye!')
    let card = event.target;
    if (flipping == false) {
        flip(card);
        if (openCard == null) {
            openCard = card;
        }
        else {
            if (card.isEqualNode(openCard)) {
                console.log('the two cards are the same, well done')
                
                openCard = null;

            }
            else {
                flipping = true;
                console.log("haha try again");

                setTimeout(() => {
                    openCard.classList.remove('clicked');
                    openCard = null;
                    flipping = false;
                }, 500);
                setTimeout(() => card.classList.remove('clicked'), 500);
            }
        }
    }
}
cardElements.forEach(function (card) {
    card.addEventListener('click', handleOnCardClick);
});


