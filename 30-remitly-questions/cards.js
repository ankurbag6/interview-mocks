/*

Build a Deck class representing a standard 52-card deck of playing cards, with a notion of Suit and Rank. 
It should be able to print all its cards, and it should be able to shuffle itself randomly and print again.

My probable Model
Model
----------
Card
- suit, rank
- constructor(suit, rank)

Deck
- cards : Card[]
- constructor() // 52 cards ???? 4 suit, 13 ranks 
- print() : String // Eg. Ace of Hearts
- shuffle() : void // shuffle randomly

Requirements 
- Do you need to think about face cards, number cards? Can I assume them to be ranks
- When we say print all cards, do we want to print 52 cards with Suite and Rank.? for eg 
  --> [
        {suit: "heart", rank: 1},{suit: "diamond", rank: 2} ... 52 Objects
      ]
- shuffle() --> pick any random card and output as a Object : 
   Deck before: A♥, 2♥, 3♥...; deck after: 9♣, Q♦, A♥

*/
// 1. Declare the Suits Enum
const CardSuit = Object.freeze({
    CLUBS: "♣",
    DIAMONDS: "♦",
    HEARTS: "♥",
    SPADES: "♠"
});

const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        // for every suit, create a a card of 13 ranks
        for(const suit in CardSuit) {
            //console.log(suit, CardSuit[suit])
            ranks.forEach(rank => this.cards.push(new Card(CardSuit[suit], rank)))
        }
    }

    print() {
        this.cards.forEach(card => console.log(`${card.rank} of ${card.suit}`));
    }

    shuffle() {
        // Loop backwards from the last element down to the second element
        // for (let i = this.cards.length - 1; i > 0; i--) {
        //     // Pick a random index from 0 to i
        //     const j = Math.floor(Math.random() * (i + 1));
            
        //     // Swap elements array[i] and array[j]
        //     [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        // }
        const randomNg = Math.random() - 0.5;
        console.log("randomNg", randomNg)
        this.cards.sort(() => randomNg);
    }
}

const deck = new Deck();
console.log("========================");
console.log("BRFORE::::")
console.log("========================");
deck.print();
deck.shuffle();
console.log("========================");
console.log("AFTER::::");
console.log("========================");
deck.print();