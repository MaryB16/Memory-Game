let cardElements = document.querySelectorAll('.card');
cardElements.forEach(function (elem) {
    elem.addEventListener('click', function () {
        console.log('I clicked!')
        console.log(elem)
        console.log("I clicked what I just logged above")
       
    });
});

function shuffleCards(cardList) {
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