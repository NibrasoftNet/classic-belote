import { PlayerType, TeamType } from "./player";
import { SuitType } from "./card";

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
  winningScore: number
  winningRound: number
}

export type GameType = {
  gameWinningType: GameWiningType;
  winningBid: BidType | null;
  rounds: RoundType[] | [];
  west: PlayerType;
  north: PlayerType;
  east: PlayerType;
  south: PlayerType;
};
