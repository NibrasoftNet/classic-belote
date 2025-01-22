export interface CardScore {
  value: string;
  trumpPoints: number;
  normalPoints: number;
}

export const CARD_SCORES: { [key: string]: CardScore } = {
  'J': { value: 'J', trumpPoints: 20, normalPoints: 2 },  // Valet
  '9': { value: '9', trumpPoints: 14, normalPoints: 0 },
  'A': { value: 'A', trumpPoints: 11, normalPoints: 11 },
  'K': { value: 'K', trumpPoints: 4, normalPoints: 4 },
  'Q': { value: 'Q', trumpPoints: 3, normalPoints: 3 },
  '7': { value: '7', trumpPoints: 0, normalPoints: 0 },
  '8': { value: '8', trumpPoints: 0, normalPoints: 0 },
  '10': { value: '10', trumpPoints: 10, normalPoints: 10 }
};

export interface Bid {
  player: string;
  suit: string;
  value: number;
  pass?: boolean;
  contree?: boolean;
  surcontree?: boolean;
}

export interface Trick {
  cards: Array<{
    playerId: string;
    card: {
      suit: string;
      value: string;
    };
  }>;
  leadingSuit: string;
  trumpSuit: string;
}
