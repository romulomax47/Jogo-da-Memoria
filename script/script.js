const front = 'front'
const back = 'back'
const card = 'card'

let selecoes;

let time;

let gameBoard = document.getElementById('game');

let btnGameOver = document.querySelector('.btnGameOver');

const teste = document.querySelector('#interaçaoInicial');

const btnIniciar = document.querySelector('#iniciarGame');


let cron;
let seconds = 0;
let minute = 0;
let tempoTotal;

window.onload = async () => {
    starGame();

    btnIniciar.addEventListener('click', setTime);

};

function getTime(minuto, segund) {
    return minuto > 0 
            ? `Seu tempo foi de ${minuto}:${segund}` 
            : `Seu tempo foi de ${segund} segundos`
};

btnGameOver.addEventListener('click', () => {

    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';

    starGame();
    seconds = 0;
    minute = 0;
    cron = setInterval(currentTime, 1000);
    return
});

function currentTime() {

    if (seconds == 60) {

        seconds = 0;
        minute++;
        return
    }

    seconds = setSeconds(seconds);
    seconds++;

}

function setSeconds(s) {
    if (s > 9) {
        return s
    } else {
        return '0' + seconds
    }
}

function setTime() {
    starGame();
    const teste = document.querySelector('#interaçaoInicial');
    teste.style.display = 'none';

    cron = setInterval(currentTime, 1000);
}



function starGame() {
    iniciaizarCards(game.createCardfronSele())

}

function iniciaizarCards(cards) {
    const game = document.querySelector('#game');
    game.innerHTML = '';

    cards.forEach((card) => {

        let cardElement = document.createElement('div')
        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    })

}

function createCardContent(card, cardElement) {

    createElementFace(front, card, cardElement);
    createElementFace(back, card, cardElement);
};


function createElementFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === 'front') {
        let iconfront = document.createElement('img')
        iconfront.src = './seleçoesIcons/icons8-' + card.icon + '-48.png';

        cardElementFace.appendChild(iconfront);
    } else {
        let iconBack = document.createElement('img')
        iconBack.src = './img/icons8-trophy-48.png'
        cardElementFace.appendChild(iconBack)
    }
    element.appendChild(cardElementFace);

}


function flipCard() {

    if (game.setCard(this)) {

        this.classList.add('flip')
        if (game.secondCard) {

            if (game.checkMatch()) {

                game.clearCard();

                if (game.gameOver()) {
                    clearInterval(cron);

                    let gameOverLayer = document.getElementById("gameOver");
                    let spanMsg = document.querySelector('span')
                    spanMsg.innerHTML = getTime(minute, seconds)
                    gameOverLayer.style.display = 'flex';

                }
            } else {
                game.disableCard()

            }
        }
    }


}
