import { PlayerCardsType, PlayerSideType, TeamType } from "./player";
import { CardType, SuitType } from "./card";
import { BidType } from "./bid";

export type PlayerHand = {
    north: CardType[];
    east: CardType[];
    south: CardType[];
    west: CardType[];
}

export type PlayedCard = {
    player: PlayerSideType;
    card: CardType;
}

export interface GameState {
    currentPlayer: 'north' | 'east' | 'south' | 'west';
    hands: PlayerHand;
    playedCards: PlayedCard[];
    trumpSuit: '♠' | '♥' | '♣' | '♦' | null;
    scores: {
        northSouth: number;
        eastWest: number;
    };
    currentTrick: number;
    totalTricks: number;
}

export type TrickStep = 'initial' | 'bid' | 'trick1' | 'trick2' | 'trick3' | 'trick4' | 'trick5' | 'trick6' | 'trick7' | 'trick8' | 'last';

export type RoundType = {
  round: number;
  winner: TeamType;
  score: number;
  winningBid: BidType;
  cardDistributor: PlayerSideType;
};

export type GameWiningType = {
  type: 'rounds' | 'points';
  winningScore: number | null;
  winningRound: number | null
}

export type GameType = {
  gameWinningType: GameWiningType;
  rounds: RoundType[] | [];
  west: PlayerCardsType;
  north: PlayerCardsType;
  east: PlayerCardsType;
  south: PlayerCardsType;
};
