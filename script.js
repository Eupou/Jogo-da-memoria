// Adicionando as imagens de forma dinâmica

const CARD_BOARD = document.querySelector('#cardboard')
const IMAGES = [
    'angular.svg',
    'aurelia.svg',
    'vue.svg',
    'react.svg',
    'backbone.svg',
    'ember.svg'
]

let cardHTML = ""

IMAGES.forEach(img => {
    cardHTML += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="img/${img}">
            <img class="back-face" src="img/js-badge.svg">
        </div>
    `
})

CARD_BOARD.innerHTML = cardHTML + cardHTML

// Adicinando a class que faz o flip 

const CARDS = document.querySelectorAll('.memory-card')
let firstCard, secondCard
let lockCards = false

function flipCard() {
    if (lockCards) return false
    this.classList.add('flip')

    if(!firstCard) {
        firstCard = this

        return false
    }

    secondCard = this
    checkForMatch()
}

// Checa se a primeira carta clicada é igua a segunda 

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card

    !isMatch ? disableCards() : resetCards(isMatch)
}

// Remove a class que faz o flip e impede de clicar em uma terceira carta enquato as outras duas estiverem abertas

function disableCards() {
    lockCards = true 
    setTimeout (() => {firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetCards()
}, 1000)
}

// Embaralha as cartas no início do jogo 

(function shuffle(){
    CARDS.forEach(card => {
        let rand = Math.floor(Math.random() * 12)
        card.style.order = rand
    })
})()

// Impede as cartas viradas de serem clicadas novamente e reseta o valor que estava guardado como carta um e dois

function resetCards(isMatch = false) {
    if (isMatch) {
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
    }
    [firstCard, secondCard ] = [null, null]
    lockCards = false
}

CARDS.forEach(card => card.addEventListener('click', flipCard))