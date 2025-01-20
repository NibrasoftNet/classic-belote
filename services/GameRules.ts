import { Card, Suit } from '../types/game';

const CARD_POINTS = {
    'J': { trump: 20, normal: 2 },
    '9': { trump: 14, normal: 0 },
    'A': { trump: 11, normal: 11 },
    '10': { trump: 10, normal: 10 },
    'K': { trump: 4, normal: 4 },
    'Q': { trump: 3, normal: 3 },
    '8': { trump: 0, normal: 0 },
    '7': { trump: 0, normal: 0 },
} as const;

export class GameRules {
    static getValidCards(hand: Card[], trick: Card[], trumpSuit: Suit | undefined): Card[] {
        if (trick.length === 0) {
            // Leading the trick - can play any card
            return hand;
        }

        const leadSuit = trick[0].suit;
        const sameSuitCards = hand.filter(card => card.suit === leadSuit);

        if (sameSuitCards.length > 0) {
            // Must follow suit if possible
            return sameSuitCards;
        }

        if (trumpSuit) {
            const trumpCards = hand.filter(card => card.suit === trumpSuit);
            if (trumpCards.length > 0) {
                // Must trump if possible when can't follow suit
                return trumpCards;
            }
        }

        // Can play any card if can't follow suit and can't trump
        return hand;
    }

    static calculateTrickWinner(trick: Card[], trumpSuit: Suit | undefined): number {
        if (trick.length === 0) return -1;

        let winningIndex = 0;
        let winningCard = trick[0];
        const leadSuit = trick[0].suit;

        for (let i = 1; i < trick.length; i++) {
            const card = trick[i];
            if (this.isCardWinning(card, winningCard, leadSuit, trumpSuit)) {
                winningCard = card;
                winningIndex = i;
            }
        }

        return winningIndex;
    }

    static isCardWinning(challenger: Card, current: Card, leadSuit: Suit, trumpSuit: Suit | undefined): boolean {
        // If both cards are trump
        if (trumpSuit && challenger.suit === trumpSuit && current.suit === trumpSuit) {
            return this.getCardValue(challenger, trumpSuit) > this.getCardValue(current, trumpSuit);
        }

        // If only challenger is trump
        if (trumpSuit && challenger.suit === trumpSuit) {
            return true;
        }

        // If only current is trump
        if (trumpSuit && current.suit === trumpSuit) {
            return false;
        }

        // If neither is trump, but both follow lead
        if (challenger.suit === leadSuit && current.suit === leadSuit) {
            return this.getCardValue(challenger, undefined) > this.getCardValue(current, undefined);
        }

        // If only challenger follows lead
        if (challenger.suit === leadSuit) {
            return true;
        }

        // If only current follows lead
        if (current.suit === leadSuit) {
            return false;
        }

        // If neither follows lead or trump
        return false;
    }

    static getCardValue(card: Card, trumpSuit: Suit | undefined): number {
        const points = CARD_POINTS[card.rank as keyof typeof CARD_POINTS];
        return card.suit === trumpSuit ? points.trump : points.normal;
    }

    static calculateTrickPoints(trick: Card[], trumpSuit: Suit | undefined): number {
        return trick.reduce((sum, card) => {
            return sum + this.getCardValue(card, trumpSuit);
        }, 0);
    }

    static isTrickComplete(trick: Card[]): boolean {
        return trick.length === 4;
    }

    static isHandComplete(hands: Record<string, Card[]>): boolean {
        return Object.values(hands).every(hand => hand.length === 0);
    }
}
