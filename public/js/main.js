document.addEventListener('DOMContentLoaded', () => {

    let cards = generateTiles();
    randomiseCards(cards);
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('show');
    }
});

// To create cards with different colors and different shapes
let generateTiles = () => {
    let colors = ['#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#dfe6e9', '#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#b2bec3', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#636e72', '#fdcb6e', '#e17055', '#d63031', '#e84393', '#2d3436'];
    let shapeClasses = ['bookmark', 'heart', 'circle', 'file', 'calendar', 'play', 'square', 'plus', 'cloud', 'comment'];
    let randomColor = () => {
        return Math.floor(Math.random() * colors.length);
    }
    let cards = [];
    for (let i = 0; i < colors.length; i++) {
        let div = document.createElement('div');
        div.classList.add('grid-item');
        if (i > 9) {
            div.classList.add(shapeClasses[i - 10]);
        }
        else {
            div.classList.add(shapeClasses[i]);
        }
        div.style.backgroundColor = colors[randomColor()];
        cards.push(div);
    }

    return cards;
}

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
        cards[i].addEventListener('click', (event) => {
            event.target.classList.toggle('show');
        });
    }
}
