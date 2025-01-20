import { create } from "zustand";
import { GameType, TrickStep, BidType, RoundType, GameWiningType } from "@/types/game";
import { PlayerType, PlayerSideType, TeamType } from "@/types/player";
import { CardType, SuitType, RankType } from "@/types/card";

// Define the store type
type GameStore = {
  trickStep: TrickStep; // Current step in the game
  game: GameType; // Game state
  setTrickStep: (step: TrickStep) => void; // Action to update trickStep
  setGame: (game: GameType) => void; // Action to update game
};

// Create the Zustand store
const useGameStore = create<GameStore>((set) => ({
  // Initial state
  trickStep: "initial", // Start with the initial step
  game: {
    gameWinningType: {
      type: "rounds", // Default winning type
      winningScore: 1000, // Default winning score
      winningRound: 10, // Default winning round
    },
    winningBid: null,
    rounds: [], // No rounds played yet
    west: {
      side: "west",
      availableCards: [],
      allowedCards: [],
      team: "EW",
      score: 0,
    },
    north: {
      side: "north",
      availableCards: [],
      allowedCards: [],
      team: "NS",
      score: 0,
    },
    east: {
      side: "east",
      availableCards: [],
      allowedCards: [],
      team: "EW",
      score: 0,
    },
    south: {
      side: "south",
      availableCards: [],
      allowedCards: [],
      team: "NS",
      score: 0,
    },
  },

  // Actions
  setTrickStep: (step) => set({ trickStep: step }), // Update trickStep
  setGame: (game) => set({ game }), // Update game
}));

export default useGameStore;