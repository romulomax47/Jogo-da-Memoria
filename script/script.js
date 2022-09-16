const front = 'front'
const back = 'back'
const card = 'card'


let selecoes;

let gameBoard = document.getElementById('game')
let btn = document.getElementById('btn')


btn.addEventListener('click', ()=>{
    window.onload()
    
    starGame()
    
});


starGame()

function starGame() {

    iniciaizarCards(game.createCardfronSele(game.selecoes))

}

function iniciaizarCards(cards) {
    
    gameBoard.innerHTML = '';

    cards.forEach((card)=>{
        let cardElement = document.createElement('div')
        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)


        gameBoard.appendChild(cardElement)
    })

}

function createCardContent(card, cardElement) {

    createElementFace(front, card, cardElement)
    createElementFace(back, card, cardElement)
}

function createElementFace(face, card, element) {

    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face);

    if (face === 'front') {
        let iconfront = document.createElement('img')
        iconfront.src = './../seleçoesIcons/icons8-' + card.icon + '-48.png';

        cardElementFace.appendChild(iconfront)
    } else {
        let iconBack = document.createElement('img')
        iconBack.src = './../img/icons8-trophy-48.png'
        cardElementFace.appendChild(iconBack)
    }
    element.appendChild(cardElementFace);

}


function flipCard() {
    // console.log(this)
    if(game.setCard(this)){

        this.classList.add('flip')
        if(game.secondCard){

            if(game.checkMatch()){
    
                game.clearCard()
                if(game.gameOver()){
                    
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex'
                }
            }else{
    
                game.disableCard()
            }
        }
    }


}
