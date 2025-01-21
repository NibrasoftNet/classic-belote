import { PlayerType, TeamType } from "./player";
import { SuitType } from "./card";

export interface Card {
    suit: '♠' | '♥' | '♣' | '♦';
    value: '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
    id: string;
    isPlayed: boolean;
}

export interface PlayerHand {
    north: Card[];
    east: Card[];
    south: Card[];
    west: Card[];
}

export interface PlayedCard {
    player: 'north' | 'east' | 'south' | 'west';
    card: Card;
}

export interface PlayerGameState {
    side: PlayerType;
    availableCards: Card[];
    allowedCards: Card[];
    team: TeamType;
    score: number;
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

export type BidType = {
  player: PlayerType;
  suit: SuitType;
  value: number;
  passed: boolean;
  chosen: boolean;
}

export type RoundType = {
  round: number;
  winner: TeamType;
  score: number
};

export type GameWiningType = {
  type: 'rounds' | 'points';
  winningScore: number | null;
  winningRound: number | null
}

export type GameType = {
  gameWinningType: GameWiningType;
  winningBid: BidType | null;
  rounds: RoundType[] | [];
  west: PlayerGameState;
  north: PlayerGameState;
  east: PlayerGameState;
  south: PlayerGameState;
};
