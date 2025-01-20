import { CardType } from "./card";

export type PlayerSideType = 'north' | 'east' | 'south' | 'west';
export type TeamType = 'EW' | 'NS';

export type PlayerType = {
    side: PlayerSideType;
    availableCards: CardType[];
    allowedCards: CardType[];
    team: TeamType;
    score: number;
  };