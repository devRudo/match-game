document.addEventListener('DOMContentLoaded', () => {
    // To create cards with different colors and different shapes
    let generateTiles = () => {
        let colorClasses = ['sea', 'emerald', 'river', 'wisteria', 'asphalt', 'orange', 'carrot', 'pumpkin', 'pomegranate', 'silver', 'livid', 'green', 'red', 'blue', 'cream', 'yellow', 'primer', 'purple', 'pink', 'gray'];
        let shapeClasses = ['bookmark', 'heart', 'circle', 'file', 'calendar', 'play', 'square', 'plus', 'cloud', 'comment'];
        let randomColor = () => {
            return Math.floor(Math.random() * colorClasses.length);
        }
        let cards = [];
        for (let i = 0; i < colorClasses.length; i++) {
            let div = document.createElement('div');
            div.classList.add('grid-item');
            div.classList.add(colorClasses[randomColor()]);
            if (i > 9) {
                div.classList.add(shapeClasses[i - 10]);
                div.setAttribute("type", shapeClasses[i - 10]);
            }
            else {
                div.classList.add(shapeClasses[i]);
                div.setAttribute("type", shapeClasses[i]);
            }
            cards.push(div);
        }

        return cards;
    }

    let cards = generateTiles();

    // To shuffle the positions of cards on start
    let randomiseCards = (cards) => {
        let game_div = document.getElementById('game');
        let maxIndex = cards.length;
        let temp;
        while (maxIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * maxIndex);
            maxIndex -= 1;
            temp = cards[maxIndex];
            cards[maxIndex] = cards[randomIndex];
            cards[randomIndex] = temp;
        }
        for (let i = 0; i < cards.length; i++) {
            game_div.appendChild(cards[i]);
        }
    }
    randomiseCards(cards);

    let finalCards = document.getElementsByClassName('grid-item');
    let matchedCards = document.getElementsByClassName('matched');
    let openCards = [];
    for (let i = 0; i < finalCards.length; i++) {
        finalCards[i].addEventListener('click', (event) => {
            event.target.classList.toggle('rotate');
            event.target.classList.toggle('show');
            event.target.classList.toggle('disable');
            checkOpenCards(event);
        });
    }
    let checkOpenCards = (event) => {
        openCards.push(event.target);
        if (openCards.length === 2) {
            if (openCards[0].getAttribute("type") === openCards[1].getAttribute("type")) {
                matched();
            }
            else {
                notMatched();
            }
        }
    }

    let notMatched = () => {
        disableAll();
        setTimeout(() => {
            openCards[0].classList.remove('show', 'disable', 'rotate');
            openCards[1].classList.remove('show', 'disable', 'rotate');
            openCards = [];
            enableAll();
        }, 1000);
    }

    let matched = () => {
        openCards[0].classList.add('disable', 'matched');
        openCards[1].classList.add('disable', 'matched');
        enableAll();
        openCards = [];
    }

    let disableAll = () => {
        for (let i = 0; i < finalCards.length; i++) {
            finalCards[i].classList.add('disable');
        }
    }

    let enableAll = () => {
        for (let i = 0; i < cards.length; i++) {
            finalCards[i].classList.remove('disable');
        }
        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disable');
        }
    }
});

