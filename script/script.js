const front = 'front'
const back = 'back'
const card = 'card'

let selecoes;

let time;

let gameBoard = document.getElementById('game');

let btnGameOver = document.querySelector('.btnGameOver');

const teste = document.querySelector('#interaçaoInicial');

const btnIniciar = document.querySelector('#iniciarGame');

let minuto = 0



window.onload = async() => {
    starGame();
    
    btnIniciar.addEventListener('click', setTime);
    const form = document.querySelector('form');

 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })




    
    
};

btnGameOver.addEventListener('click', () => {
    game.clearCard()

    iniciaizarCards(game.createCardfronSele(game.selecoes));
    
    
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none'; 
    return  
})

function setTime(){
    const nome = document.querySelector('#name').value;
    console.log(nome)
    
    const teste = document.querySelector('#interaçaoInicial');
    teste.style.display = 'none';

    time = settimeout(game.time, 1000)

    
}

function starGame() {

    iniciaizarCards(game.createCardfronSele())

}

function iniciaizarCards(cards) {
    const game = document.querySelector('#game');
    game.innerHTML = '';

    cards.forEach((card) =>{

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

    if(game.setCard(this)){

        this.classList.add('flip')
        if(game.secondCard){

            if(game.checkMatch()){
    
                game.clearCard()
                if(game.gameOver()){
                    
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                
                game.disableCard()
                
            }
        }
    }


}
