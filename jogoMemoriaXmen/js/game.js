const grid = document.querySelector('.grid')

const spanPlayer = document.querySelector('.jogador')

const timer = document.querySelector('.timer')

const personagens = [
    'ciclope',
    'fera',
    'jim',
    'magneto',
    'mercurio',
    'mistica',
    'noturno',
    'tempestade',
    'vampira',
    'wolverine'
]

const createElement = (tag,className) =>{
    const element = document.createElement(tag)
    element.className = className
    return element
}

let primeiraCarta ='';
let segundaCarta ='';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card')

    if (disabledCards.length === 20){
        clearInterval(this.loop)
        alert(`Você conseguiu ${spanPlayer.innerHTML},ajudou a derrotar o Magneto em ${timer.innerHTML} segundos`)
        
        window.location.assign('/outro.html')
    }
}

const checkCards = () =>{
    const primeiroPersonagem  = primeiraCarta.getAttribute('data-personagem')
    const segundoPersonagem  = segundaCarta.getAttribute('data-personagem')

    if (primeiroPersonagem === segundoPersonagem){
        primeiraCarta.firstChild.classList.add('disabled-card')
        segundaCarta.firstChild.classList.add('disabled-card')

        primeiraCarta=''
        segundaCarta=''

        checkEndGame()
        
    }else{

        setTimeout(()=>{
            primeiraCarta.classList.remove('reveal-card')
            segundaCarta.classList.remove('reveal-card')

            primeiraCarta=''
            segundaCarta=''

        },500)

    }
    
}

const revealCard = ({target})=>{

    if(target.parentNode.className.includes('reveal-card')){
        return
    }

    if (primeiraCarta === '' ){
        target.parentNode.classList.add('reveal-card')
        primeiraCarta = target.parentNode;

    }else if (segundaCarta === ''){
        target.parentNode.classList.add('reveal-card')
        segundaCarta = target.parentNode;

        checkCards();

    }

}

const createCard = (personagem)=>{
    const card = createElement('div','card')
    const front = createElement('div','face front')
    const back = createElement('div','face back')

    front.style.backgroundImage = `url('../imagens/${personagem}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)

    card.setAttribute('data-personagem',personagem)

    return card
}

const loadGame = ()=>{

    const duplicaPersonagens = [...personagens,...personagens]

    const misturaCartas = duplicaPersonagens.sort(()=> Math.random() - 0.5)

    

    misturaCartas.forEach((personagem)=>{

        const card = createCard(personagem)
        grid.appendChild(card)
    })
}

const startTimer = () =>{
    this.loop = setInterval(()=>{
        const currentTime = +timer.innerHTML;
        timer.innerHTML= currentTime+1
    },1000)
}

window.onload = () =>{
    spanPlayer.innerHTML = localStorage.getItem('player')
    startTimer()
    loadGame()

}