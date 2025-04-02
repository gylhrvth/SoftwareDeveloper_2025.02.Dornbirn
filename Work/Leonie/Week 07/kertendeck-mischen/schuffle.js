let arr = [];
arr = Array(52).fill(0).map((_, i) => i);
cardDeck = createDeck(arr);
console.log(cardDeck);
shuffledDeck = shuffledDeck(cardDeck);

function createDeck(deck){
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

    for (let i = 0; i < deck.length; i++){
        const suit = suits[Math.floor(i / 13)];
        const rank = ranks[i % 13];
        deck[i] = [suit, rank];
    }
    return deck;
}



function shuffledDeck(deck){
    for (let shuffle = 0; shuffle < 7 * deck.length + 5; shuffle++){
        const i = Math.floor(Math.random() * deck.length);
        const j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}



/*

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ..., 51]

suit = arr[5] / 4
rank = arr[5] % 4


*/