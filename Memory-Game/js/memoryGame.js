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

const flipp = function flipp(card) {
     card.classList.add('clicked')
}

/*
Alternative way of adding event listeners
cardElements.forEach(function (card) {
    card.addEventListener("click", onCardClicked)
})

function onCardClicked(event) {
    //do all the card stuff
}
*/

let openCard = null;
let flipping = false
cardElements.forEach(function (card) {

    card.addEventListener('click', function () {
        console.log('I clicked! ' + flipping)
        // we want to check if any card is fliiping, if it's fliiping don't do anything
        if (flipping == false) {
            flipp(card);



            if (openCard == null) {
                openCard = card;
            }
            else {
                if (card.isEqualNode(openCard)) {
                    console.log("the two cards are the same, well done");
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




/*
//add cards to a list
        cardList.push(card);
        console.log(cardList);
        if (cardList.length == 2) {
            if (cardList[0].isEqualNode(cardList[1])) {
                console.log('the two cards are the same, well done');
            }
            else console.log("haha try again");
        }
*/