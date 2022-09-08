const front = 'front'
const back = 'back'
const card = 'card'


const selecoes = [
    'brasil',
    'argentina',
    'alemanha',
    'catar',
    'frança',
    'bélgica',
    'croácia',
    'inglaterra',
    'portugal',
    'senegal'
]

let lockMode = false;
let firstCard = null;
let secondCard = null;


let cards = [];

starGame()

function starGame() {

    const create = createCardfronSele(selecoes)
    shuffleCars(create);
    iniciaizarCards(create)



}
// duplica ass cartas
function createCardfronSele(selecoes) {

    for (let selecao of selecoes) {
        cards.push(createPairFromSelecoes(selecao))

    }
    return cards.flatMap(card => card)
}

function createPairFromSelecoes(sele) {
    return [
        {
            id: createIdWhithSele(sele),
            icon: sele,
            flip: false
        },
        {
            id: createIdWhithSele(sele),
            icon: sele,
            flip: false
        }

    ]
}
//ebaralha as cartas
function shuffleCars(selecoes) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [selecoes[randomIndex], selecoes[currentIndex]] = [selecoes[currentIndex], selecoes[randomIndex]]

    }

}


function iniciaizarCards(cards) {
    console.log(cards)
    let gameBoard = document.getElementById('game')

    cards.forEach((card) => {

        // console.log(card.icon)

        let cardElement = document.createElement('div')
        cardElement.id = card.id;
        cardElement.classList.add('card')
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)

        gameBoard.appendChild(cardElement);
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
        iconfront.src = '../seleçoesIcons/icons8-' + card.icon + '-48.png';

        cardElementFace.appendChild(iconfront)
    } else {
        let iconBack = document.createElement('img')
        iconBack.src = '../img/icons8-trophy-48.png'
        cardElementFace.appendChild(iconBack)
    }
    element.appendChild(cardElementFace);

}

function flipCard() {
  
    if (setCard(this.id)) {
        this.classList.add('flip')

        if (ckeckMatch()) {
            console.log(ckeckMatch())
            clearCard();
        } else {

     
                let firstCard = document.getElementById(firstCard.id)
                let secondCard = document.getElementById(secondCard.id)

                firstCard.classList.remove('flip')
                secontCard.classList.remove('flip')
                clearCard()


            
        }
    }

}

// console.log(cards.flatMap(item=>item))
function clearCard(){
    this.secondCard = null;
    this.firstCardfirstCard = null;
    this.lockMode = false;
}

function setCard(id) {

    let card = cards.flatMap(item=> item)
    const fill = card.filter((card)=> card.id === id)
    console.log(fill[0].flip)

    console.log(firstCard = fill)

    if (fill[0].flip || lockMode){
        return false;
    }

    if (!this.firstCard) {
        firstCard = fill
        return true;
    } else {
        secondCard = fill;
        lockMode = true;
        return true;
    }
}




function ckeckMatch() {
    const cardFirst = firstCard[0].icon
    const cardSecond = secondCard[0].icon
    return cardFirst === cardSecond
}





function createIdWhithSele(sele) {
    return sele + parseInt(Math.random() * 1000);
}