import { Card } from '@/types/card';
import { CARD_SCORES, Trick, Bid } from '@/types/scoring';

export class GameLogic {
  static validateBid(bid: number, cards: Card[]): boolean {
    // Validate bid is between 90 and 180
    if (bid < 90 || bid > 180) {
      return false;
    }
    return true;
  }

  static calculateCardPoints(card: Card, trumpSuit: string): number {
    const score = CARD_SCORES[card.value];
    if (!score) return 0;
    
    return card.suit === trumpSuit ? score.trumpPoints : score.normalPoints;
  }

  static isValidPlay(
    card: Card,
    playerCards: Card[],
    currentTrick: Trick | null,
    trumpSuit: string
  ): boolean {
    if (!currentTrick || currentTrick.cards.length === 0) {
      // First card of the trick - any card is valid
      return true;
    }

    const leadingSuit = currentTrick.leadingSuit;
    
    // Check if player has any cards of the leading suit
    const hasLeadingSuit = playerCards.some(c => c.suit === leadingSuit);
    
    if (hasLeadingSuit) {
      // Must play leading suit if they have it
      return card.suit === leadingSuit;
    }
    
    // If no leading suit, any card is valid
    return true;
  }

  static determineWinningCard(trick: Trick): number {
    let winningCardIndex = 0;
    let highestPoints = 0;

    trick.cards.forEach((play, index) => {
      const points = this.calculateCardPoints(play.card, trick.trumpSuit);
      const isTrump = play.card.suit === trick.trumpSuit;
      const currentWinnerIsTrump = trick.cards[winningCardIndex].card.suit === trick.trumpSuit;

      if (
        (isTrump && !currentWinnerIsTrump) ||
        (isTrump === currentWinnerIsTrump && points > highestPoints) ||
        (play.card.suit === trick.leadingSuit && !currentWinnerIsTrump)
      ) {
        winningCardIndex = index;
        highestPoints = points;
      }
    });

    return winningCardIndex;
  }

  static calculateTrickPoints(trick: Trick): number {
    return trick.cards.reduce((total, play) => {
      return total + this.calculateCardPoints(play.card, trick.trumpSuit);
    }, 0);
  }
}

export const isValidBidValue = (value: number): boolean => {
  return value >= 90 && value <= 180 && value % 10 === 0;
};
