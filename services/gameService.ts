import { Card, GameState, PlayedCard, PlayerHand } from '@/types/game';
import { SuitType } from '@/types/card';

export class GameService {
  private static instance: GameService;
  private deck: Card[] = [];
  
  private constructor() {
    this.initializeDeck();
  }

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  private initializeDeck(): void {
    const suits: SuitType[] = ['♠', '♥', '♣', '♦'];
    const values = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    this.deck = suits.flatMap(suit =>
      values.map(value => ({
        suit,
        value,
        id: `${suit}-${value}`,
        isPlayed: false
      }))
    );
  }

  public shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  public dealCards(): PlayerHand {
    this.shuffleDeck();
    
    // Initialize empty hands
    const hands: PlayerHand = {
      north: [],
      east: [],
      south: [],
      west: []
    };

    // Deal 8 cards to each player
    for (let i = 0; i < 8; i++) {
      hands.south.push(this.deck[i]);
      hands.west.push(this.deck[i + 8]);
      hands.north.push(this.deck[i + 16]);
      hands.east.push(this.deck[i + 24]);
    }

    return hands;
  }

  public getCardPoints(card: Card, trumpSuit: SuitType | null): number {
    const points: { [key: string]: { trump: number; normal: number } } = {
      'J': { trump: 20, normal: 2 },
      '9': { trump: 14, normal: 0 },
      'A': { trump: 11, normal: 11 },
      '10': { trump: 10, normal: 10 },
      'K': { trump: 4, normal: 4 },
      'Q': { trump: 3, normal: 3 },
      '7': { trump: 0, normal: 0 },
      '8': { trump: 0, normal: 0 }
    };

    const isTrump = trumpSuit && card.suit === trumpSuit;
    return points[card.value][isTrump ? 'trump' : 'normal'];
  }

  public calculateTrickWinner(
    playedCards: PlayedCard[],
    trumpSuit: SuitType | null,
    leadingSuit: SuitType
  ): 'north' | 'east' | 'south' | 'west' {
    let winningCard = playedCards[0];
    let highestPoints = this.getCardPoints(playedCards[0].card, trumpSuit);

    for (let i = 1; i < playedCards.length; i++) {
      const currentCard = playedCards[i];
      const currentPoints = this.getCardPoints(currentCard.card, trumpSuit);
      
      const isCurrentTrump = trumpSuit && currentCard.card.suit === trumpSuit;
      const isWinningTrump = trumpSuit && winningCard.card.suit === trumpSuit;
      
      if (
        (isCurrentTrump && !isWinningTrump) ||
        (isCurrentTrump && isWinningTrump && currentPoints > highestPoints) ||
        (!isCurrentTrump && !isWinningTrump && currentCard.card.suit === leadingSuit && currentPoints > highestPoints)
      ) {
        winningCard = currentCard;
        highestPoints = currentPoints;
      }
    }

    return winningCard.player;
  }

  public isValidPlay(
    card: Card,
    hand: Card[],
    playedCards: PlayedCard[],
    trumpSuit: SuitType | null
  ): boolean {
    // First card of the trick - any card is valid
    if (playedCards.length === 0) return true;

    const leadingSuit = playedCards[0].card.suit;
    const hasLeadingSuit = hand.some(c => c.suit === leadingSuit);
    
    // Must follow suit if possible
    if (hasLeadingSuit) {
      return card.suit === leadingSuit;
    }

    // If no leading suit, any card is valid
    return true;
  }

  public getNextPlayer(currentPlayer: 'north' | 'east' | 'south' | 'west'): 'north' | 'east' | 'south' | 'west' {
    const order = ['south', 'west', 'north', 'east'];
    const currentIndex = order.indexOf(currentPlayer);
    return order[(currentIndex + 1) % 4] as 'north' | 'east' | 'south' | 'west';
  }

  public calculateTeamScore(playedCards: PlayedCard[], trumpSuit: SuitType | null): {
    northSouth: number;
    eastWest: number;
  } {
    let northSouthScore = 0;
    let eastWestScore = 0;

    playedCards.forEach(({ player, card }) => {
      const points = this.getCardPoints(card, trumpSuit);
      if (player === 'north' || player === 'south') {
        northSouthScore += points;
      } else {
        eastWestScore += points;
      }
    });

    return { northSouth: northSouthScore, eastWest: eastWestScore };
  }

  public hasBeloteRebelote(hand: Card[], trumpSuit: SuitType): boolean {
    return hand.some(card => card.suit === trumpSuit && card.value === 'K') &&
           hand.some(card => card.suit === trumpSuit && card.value === 'Q');
  }

  public calculateRoundScore(
    playedCards: PlayedCard[],
    trumpSuit: SuitType,
    contract: {
      team: 'northSouth' | 'eastWest',
      value: number,
      isContree: boolean,
      isSurContree: boolean
    },
    beloteTeam: 'northSouth' | 'eastWest' | null
  ): {
    northSouth: number,
    eastWest: number,
    contractFulfilled: boolean
  } {
    let northSouthScore = 0;
    let eastWestScore = 0;
    let lastTrickWinner: 'north' | 'south' | 'east' | 'west' | null = null;

    // Calculate basic points from tricks
    playedCards.forEach((played, index) => {
      const points = this.getCardPoints(played.card, trumpSuit);
      
      if (played.player === 'north' || played.player === 'south') {
        northSouthScore += points;
      } else {
        eastWestScore += points;
      }

      // Track last trick winner for "Dix de Der" (10 points for last trick)
      if (index === playedCards.length - 1) {
        lastTrickWinner = played.player;
      }
    });

    // Add "Dix de Der" points (10 points for winning last trick)
    if (lastTrickWinner === 'north' || lastTrickWinner === 'south') {
      northSouthScore += 10;
    } else if (lastTrickWinner === 'east' || lastTrickWinner === 'west') {
      eastWestScore += 10;
    }

    // Add Belote-Rebelote bonus (20 points)
    if (beloteTeam === 'northSouth') {
      northSouthScore += 20;
    } else if (beloteTeam === 'eastWest') {
      eastWestScore += 20;
    }

    // Check for Capot (winning all tricks)
    const isCapot = northSouthScore === 162 || eastWestScore === 162;
    if (isCapot) {
      if (northSouthScore === 162) {
        northSouthScore += 100; // Capot bonus
      } else {
        eastWestScore += 100; // Capot bonus
      }
    }

    // Calculate if contract is fulfilled
    const contractTeamScore = contract.team === 'northSouth' ? northSouthScore : eastWestScore;
    const contractFulfilled = contractTeamScore >= contract.value;

    // Apply contract multipliers
    if (contractFulfilled) {
      // Contract team wins
      if (contract.isSurContree) {
        // Quadruple points for sur-contrée
        if (contract.team === 'northSouth') {
          northSouthScore *= 4;
        } else {
          eastWestScore *= 4;
        }
      } else if (contract.isContree) {
        // Double points for contrée
        if (contract.team === 'northSouth') {
          northSouthScore *= 2;
        } else {
          eastWestScore *= 2;
        }
      }
    } else {
      // Contract team loses
      if (contract.team === 'northSouth') {
        // Defense (East-West) wins
        eastWestScore = 162;
        if (contract.isSurContree) {
          eastWestScore *= 4;
        } else if (contract.isContree) {
          eastWestScore *= 2;
        }
        northSouthScore = beloteTeam === 'northSouth' ? 20 : 0; // Only keep Belote points
      } else {
        // Defense (North-South) wins
        northSouthScore = 162;
        if (contract.isSurContree) {
          northSouthScore *= 4;
        } else if (contract.isContree) {
          northSouthScore *= 2;
        }
        eastWestScore = beloteTeam === 'eastWest' ? 20 : 0; // Only keep Belote points
      }
    }

    return {
      northSouth: northSouthScore,
      eastWest: eastWestScore,
      contractFulfilled
    };
  }

  public isGameWinner(
    totalScores: { northSouth: number, eastWest: number },
    lastRoundWinner: 'northSouth' | 'eastWest'
  ): 'northSouth' | 'eastWest' | null {
    if (totalScores.northSouth > totalScores.eastWest) {
      return 'northSouth';
    } else if (totalScores.eastWest > totalScores.northSouth) {
      return 'eastWest';
    } else {
      // If scores are tied, last round winner wins
      return lastRoundWinner;
    }
  }
}

export const gameService = GameService.getInstance();
