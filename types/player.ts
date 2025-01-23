import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CardType, SuitType } from "./card";
import { ImageSourcePropType } from "react-native";

export type PlayerSideType = 'north' | 'east' | 'south' | 'west';
export type TeamType = 'EW' | 'NS';

export type PlayersScoreCardProps = {
    players: {
      north: PlayerCardsType;
      south: PlayerCardsType;
      east: PlayerCardsType;
      west: PlayerCardsType;
    };
  };

export type PlayerCardsType = {
    position: PlayerSideType;
    availableCards: CardType[];
    allowedCards: CardType[];
    team: TeamType;
    score: number;
    avatar?: ImageSourcePropType;
    isCurrentTurn?: boolean;
    leadingSuit?: SuitType | null;
    trumpSuit?: SuitType | null;
    isDealing?: boolean;
    dealingComplete?: boolean;
    onCardPlay?: (card: CardType, player: PlayerSideType) => void;
}


export type  ActualPlayerProps = {
  card: CardType;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconSize: number;
  color: string;
  isRedSuit: boolean;
}