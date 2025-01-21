import { CardType, RankType, SuitType } from "@/types/card";
import { PlayerType, TeamType } from "@/types/player";

const RANKS: RankType[] = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS: SuitType[] = ['♥', '♦', '♣', '♠'];

// Generate a deck of 32 cards
const generateDeck = (): CardType[] => {
    const deck: CardType[] = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push({
                rank,
                suit,
                faceUp: false,
                isPlayable: false
            });
        }
    }
    return deck;
};

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Distribute cards to players
export const distributeCards = (): {
    north: PlayerType;
    east: PlayerType;
    south: PlayerType;
    west: PlayerType;
} => {
    // Generate and shuffle deck
    const deck = shuffleArray(generateDeck());
    
    // Distribute 8 cards to each player
    const northCards = deck.slice(0, 8);
    const eastCards = deck.slice(8, 16);
    const southCards = deck.slice(16, 24);
    const westCards = deck.slice(24, 32);

    return {
        north: {
            side: 'north',
            availableCards: northCards,
            allowedCards: [],
            team: 'NS',
            score: 0
        },
        east: {
            side: 'east',
            availableCards: eastCards,
            allowedCards: [],
            team: 'EW',
            score: 0
        },
        south: {
            side: 'south',
            availableCards: southCards,
            allowedCards: [],
            team: 'NS',
            score: 0
        },
        west: {
            side: 'west',
            availableCards: westCards,
            allowedCards: [],
            team: 'EW',
            score: 0
        }
    };
};
