document.addEventListener('DOMContentLoaded', () => {
    let game_started = false;
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
    // Adding click event handlers for each card
    for (let i = 0; i < finalCards.length; i++) {
        finalCards[i].addEventListener('click', (event) => {
            event.target.classList.toggle('rotate');
            event.target.classList.toggle('show');
            event.target.classList.toggle('disable');
            checkOpenCards(event);
            countFlips();
            if (matchedCards.length === finalCards.length) {
                gameFinished();
            }
        });
    }

    // checking the open cards to be matching and non-matching
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

    // what to do if open cards do not match
    let notMatched = () => {
        disableAll();
        setTimeout(() => {
            openCards[0].classList.remove('show', 'disable', 'rotate');
            openCards[1].classList.remove('show', 'disable', 'rotate');
            openCards = [];
            enableAll();
        }, 1000);
    }

    // what to do if open cards match
    let matched = () => {
        openCards[0].classList.add('disable', 'matched');
        openCards[1].classList.add('disable', 'matched');
        enableAll();
        openCards = [];
    }

    // function to disable click events on cards
    let disableAll = () => {
        for (let i = 0; i < finalCards.length; i++) {
            finalCards[i].classList.add('disable');
        }
    }

    // function to enable click events on cards
    let enableAll = () => {
        for (let i = 0; i < cards.length; i++) {
            finalCards[i].classList.remove('disable');
        }
        for (let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disable');
        }
    }
    let flips = 0;
    let countFlips = () => {
        let flipsCount = document.getElementById('flips-count');
        flips++;
        flipsCount.innerText = flips;
    }

    let start = document.getElementById('start');
    let reset = document.getElementById('reset');
    let timeElapsed = document.getElementById('time-elapsed');
    let options1 = document.getElementsByClassName('options1')[0];
    let alertDiv = document.getElementById('alert');
    let timer;
    let count = 1;
    disableAll();
    start.addEventListener('click', () => {
        if (!game_started) {
            game_started = true;
            timer = setInterval(() => {
                timeElapsed.innerText = count++;
            }, 1000);
            enableAll();
            start.classList.add('disable');
            reset.classList.add('disable');
            options1.classList.remove('hide');
            alertDiv.classList.add('info');
            alertDiv.classList.remove('error');
            alertDiv.innerHTML = "****** Game Started ******";
        }
    });

    reset.addEventListener('click', () => {
        location.reload();
    });

    let gameFinished = () => {
        disableAll();
        popupResult();
        stopTimer();
        let resultTime = document.getElementById('result-time');
        let resultFlips = document.getElementById('total-flips');
        resultTime.innerText = count;
        resultFlips.innerText = flips;
        reset.classList.remove('disable');
        scoreInLocalStorage(flips);
        reset.classList.remove('hide');
        alertDiv.innerHTML = "****** Game Finished! Please click on Replay to play again ******";
    }

    let popupResult = () => {
        let result = document.getElementById('result');
        result.classList.remove('hide');
        result.classList.add('show');

    }

    let scoreInLocalStorage = (flips) => {
        let localStorage = window.localStorage;
        let bestScore = localStorage.getItem('bestscore');
        if (!bestScore || Number(bestScore) > flips) {
            localStorage.setItem('bestscore', flips);
        }
    }
    let printBestScore = () => {
        let best = localStorage.getItem('bestscore') || 0;
        let bestValue = document.getElementById('bestscore-value');
        bestValue.innerText = best;
    }

    printBestScore();

    let stopTimer = () => {
        clearInterval(timer);
    }
    document.addEventListener('click', () => {
        if (!game_started) {
            alertDiv.classList.add('error');
            alertDiv.innerHTML = "<p>Please start the game by clicking on start game button</p>";
        }
    });
});