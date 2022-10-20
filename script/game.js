

const game = {

    times: [
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
    ],
    
    cards: [],
    
    firstCard: null,
    secondCard: null,
    lockMode: false,

    interaçaoInicial: () =>{

    },


    setCard: function (time) {

       let card = this.cards.filter(item => item.id === time.id)[0];

        if(card.flip || this.lockMode){
            return false;
        }

        if(!this.firstCard){

            this.firstCard = card; 
            this.firstCard.flip = true;

            return true

        }else{
            this.secondCard = card;
            this.secondCard.flip = true;
            this.lockMode = true;

            return true;
        }
    },

    checkMatch: function(){

         if(!this.firstCard || !this.secondCard){
            return false
         } 

        return this.firstCard.icon === this.secondCard.icon 
    },

  
    createCardfronSele: function() {
        this.cards = [];  

        this.times.forEach((time) => {

            this.cards.push(this.createPairFromSelecoes(time))
        }) 
    

        this.cards = this.cards.flatMap(card => card);
        this.shuffleCars();
        return this.cards;
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

        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];

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

        if(this.cards.filter(card=> !card.flip).length === 0){
            return true
        }

   

    },

    minutos: 0,

    time: () =>{
        this.mitunos++
        console.log(this.minutos)
    }


}