const cards =[
    'A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'
];
let firstCard =null;
let secondCard =null;
let lockBoard =false;
let matchedPairs =0;
const totalPairs =cards.length/2;
const winMessage =document.getElementById('win-message');

function shuffle(array){
    return array.sort(()=>0.5 -Math.random());
}

function createBoard(){
    const boardGame =document.getElementById('board-game');
    const shuffled =shuffle(cards.slice());

    shuffled.forEach(letter =>{
        const card =document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.textContent="";
        card.addEventListener('click', flipCard);
        boardGame.appendChild(card);
    });
}

function flipCard(){
    if(lockBoard||this ===firstCard||this.classList.contains('flipped')) return;
   
    this.textContent =this.dataset.letter;
    this.classList.add('flipped');
     
if(!firstCard){
    firstCard =this;
    return;
}

secondCard=this;
lockBoard =true;

 checkForMatch();
}

function checkForMatch(){
    const isMatch =firstCard.dataset.letter ===secondCard.dataset.letter;

    if(isMatch){
        matchedPairs++;
        if(matchedPairs ===totalPairs){
            winMessage.classList.add('visible');
        }
        resetTurn();
} else{
    setTimeout(() =>{
        firstCard.textContent= "";
        secondCard.textContent ="";
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
    },  1000);
}
}

function resetTurn(){
    [firstCard, secondCard, lockBoard] =[null, null, false];
}
createBoard();