import { SuitType } from "./card";
import { PlayerSideType } from "./player";

export type BidStateType = {
  isDealing: boolean;
  setIsDealing: (isDealing: boolean) => void;
}

export type BiddingModalType = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export type BidType = {
  player: PlayerSideType;
  suit: SuitType;
  value: number;
  passed: boolean;
  chosen: boolean;
}