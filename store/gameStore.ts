import { create } from "zustand";
import { GameType, TrickStep } from "@/types/game";

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
      winningRound: 3, // Default winning round
    },
    rounds: [], // No rounds played yet
    west: {
      position: "west",
      availableCards: [],
      allowedCards: [],
      team: "EW",
      score: 0,
    },
    north: {
      position: "north",
      availableCards: [],
      allowedCards: [],
      team: "NS",
      score: 0,
    },
    east: {
      position: "east",
      availableCards: [],
      allowedCards: [],
      team: "EW",
      score: 0,
    },
    south: {
      position: "south",
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