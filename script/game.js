
const game = {

    
    firstCard: null,
    secondCard: null,
    lockMode: false,



    setCard: function (c) {

        let card = this.selecoes.filter(item => item.id === c.id)[0]

        if(card.flip || this.lockMode){
            return false
        }
        if(!this.firstCard){

            this.firstCard = card; 
            this.firstCard.flip = true;

            return true

        }else{
            this.secondCard = card;
            this.secondCard.flip = true;
            this.lockMode = true;

            return true
        }
    },

    checkMatch: function(){


         if(!this.firstCard || !this.secondCard){
            return false
         } 

        return this.firstCard.icon === this.secondCard.icon 
    },

    selecoes: [
        'brasil',
        'argentina',
        'alemanha',
        'catar',
        'frança',
        'bélgica',
        'croácia',
        'inglaterra',
        'portugal',
        'senegal',
    ],

    cards: null,

    createCardfronSele: function (selecoes) {

        this.cards = [];

        for (let selecao of selecoes) {
            this.cards.push(this.createPairFromSelecoes(selecao))

        }
        this.selecoes = this.cards.flatMap(card => card)
        this.shuffleCars();
        return this.selecoes
    },

    createPairFromSelecoes: function (cardSelecao) {
        return [
            {
                id: this.createIdWhithSele(cardSelecao),
                icon: cardSelecao,
                flip: false
            },
            {
                id: this.createIdWhithSele(cardSelecao),
                icon: cardSelecao,
                flip: false
            }

        ]
    },

    createIdWhithSele: function (cardSelecao) {
        return cardSelecao + parseInt(Math.random() * 1000);
    },

    shuffleCars: function () {
        let currentIndex = this.selecoes.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.selecoes[randomIndex], this.selecoes[currentIndex]] = [this.selecoes[currentIndex], this.selecoes[randomIndex]]

        }

    },

    clearCard: function () {
  
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
       

    },



    disableCard: function () {

        setTimeout(() => {

            this.firstCard.flip = false;
            this.secondCard.flip = false;

            let firstCard = document.getElementById(game.firstCard.id)
            let secondCard = document.getElementById(game.secondCard.id)

            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            game.clearCard()


        }, 1000)
    },


    gameOver: function () {
        console.log(this.selecoes)
        if(this.selecoes.filter(card=> !card.flip).length === 0){
            return true
        }

   

    }

}