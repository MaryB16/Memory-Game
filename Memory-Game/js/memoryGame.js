const cardElements = document.querySelectorAll('.card');

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


//This function is called when the card is clicked

const flip = function flip(card) {
     card.classList.add('clicked')
}

let openCard = null;
let flipping = false
cardElements.forEach(function (card) {

    card.addEventListener('click', function () {
        console.log('I clicked! ' + flipping)
        // we want to check if any card is flipping, if it's flipping don't do anything
        if (flipping == false) {
            flip(card);
  
            if (openCard == null) {
                openCard = card;
            }
            else {
                if (card.isEqualNode(openCard)) {
                    console.log("the two cards are the same, well done");
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
                    // openCard.classList.remove('clicked');
                    setTimeout(() => card.classList.remove('clicked'), 500);
                }
            }
        }
    });
});
