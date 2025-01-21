// Define the 32 cards used in Belote
const CARD_VALUES = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;
const CARD_SUITS = ['♠', '♥', '♣', '♦'] as const;

import { Card } from '../types/game';

// Create a deck of 32 cards
function createDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of CARD_SUITS) {
        for (const value of CARD_VALUES) {
            deck.push({
                suit,
                value,
                id: `${value}-${suit}`,
                isPlayed: false
            });
        }
    }
    return deck;
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffleDeck(deck: Card[]): Card[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Deal cards to 4 players (8 cards each)
function dealCards(): { [key: string]: Card[] } {
    const deck = shuffleDeck(createDeck());
    const players: { [key: string]: Card[] } = {
        north: [] as Card[],  // Player 1
        east: [] as Card[],   // Player 2
        south: [] as Card[],  // Player 3
        west: [] as Card[]    // Player 4
    };

    // First distribution: 3 cards each
    for (let i = 0; i < 3; i++) {
        players.north.push(deck[i]);
        players.east.push(deck[i + 3]);
        players.south.push(deck[i + 6]);
        players.west.push(deck[i + 9]);
    }

    // Second distribution: 2 cards each
    for (let i = 0; i < 2; i++) {
        players.north.push(deck[i + 12]);
        players.east.push(deck[i + 14]);
        players.south.push(deck[i + 16]);
        players.west.push(deck[i + 18]);
    }

    // Third distribution: 3 cards each
    for (let i = 0; i < 3; i++) {
        players.north.push(deck[i + 20]);
        players.east.push(deck[i + 23]);
        players.south.push(deck[i + 26]);
        players.west.push(deck[i + 29]);
    }

    return players;
}

// Function to get card points based on trump and normal suits
function getCardPoints(card: Card, isTrump: boolean): number {
    const trumpPoints = {
        'J': 20,
        '9': 14,
        'A': 11,
        '10': 10,
        'K': 4,
        'Q': 3,
        '8': 0,
        '7': 0
    };

    const normalPoints = {
        'A': 11,
        '10': 10,
        'K': 4,
        'Q': 3,
        'J': 2,
        '9': 0,
        '8': 0,
        '7': 0
    };

    return isTrump ? trumpPoints[card.value] : normalPoints[card.value];
}

// Example usage:
// const gameState = dealCards();
// console.log(gameState);

module.exports = {
    createDeck,
    shuffleDeck,
    dealCards,
    getCardPoints,
    CARD_VALUES,
    CARD_SUITS
};
