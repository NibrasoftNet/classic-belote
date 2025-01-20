export type SuitType = '♥' | '♦' | '♣' | '♠';
export type RankType = '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export type CardType = {
    rank: RankType;
    suit: SuitType;
    faceUp?: boolean;
    isPlayable?: boolean;
    onPress?: () => void;
}