import { Card, CardType } from '@/types/card';

export const convertToCard = (cardType: CardType): Card => ({
  suit: cardType.suit,
  value: cardType.rank,
  id: `${cardType.suit}-${cardType.rank}`,
  isPlayed: false
});
