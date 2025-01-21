import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import useGameStore from '@/store/gameStore';
import PlayerCards from './PlayerCards';
import PlayerAvatar from './PlayerAvatar';
import BiddingModal from './BiddingModal';
import CenterCards from './CenterCards';
import { Card, GameState, PlayedCard, PlayerHand, PlayerGameState } from '@/types/game';
import { PlayerType, TeamType } from '@/types/player';
import { SuitType } from '@/types/card';
import { convertToCard } from '@/utils/cardUtils';
import { biddingService } from '@/services/biddingService';
import { gameService } from '@/services/gameService';

interface BidType {
  player: PlayerType;
  suit: SuitType;
  value: number;
  passed: boolean;
  chosen: boolean;
}

const GameTable: React.FC = () => {
  const game = useGameStore(state => state.game);
  const [showBiddingModal, setShowBiddingModal] = useState(false);
  const [bids, setBids] = useState<BidType[]>([]);
  const [passedPlayers, setPassedPlayers] = useState<PlayerType[]>([]);
  const [biddingPhase, setBiddingPhase] = useState(true);
  const [currentBidder, setCurrentBidder] = useState<PlayerType>('south');

  const [playedCards, setPlayedCards] = useState<PlayedCard[]>([]);

  const [currentTurn, setCurrentTurn] = useState<PlayerType>('south');
  const [leadingSuit, setLeadingSuit] = useState<SuitType | null>(null);
  const [trumpSuit, setTrumpSuit] = useState<SuitType | null>(null);

  const [isDealing, setIsDealing] = useState(false);
  const [dealingComplete, setDealingComplete] = useState(false);

  const [scores, setScores] = useState<{
    northSouth: number;
    eastWest: number;
  }>({ northSouth: 0, eastWest: 0 });

  const [contract, setContract] = useState<{
    team: 'northSouth' | 'eastWest';
    value: number;
    isContree: boolean;
    isSurContree: boolean;
    suit: SuitType;
  } | null>(null);

  const [beloteTeam, setBeloteTeam] = useState<'northSouth' | 'eastWest' | null>(null);
  const [lastRoundWinner, setLastRoundWinner] = useState<'northSouth' | 'eastWest' | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (contract?.suit) {
      setTrumpSuit(contract.suit);
      if (
        gameService.hasBeloteRebelote(game.north?.availableCards || [], contract.suit) ||
        gameService.hasBeloteRebelote(game.south?.availableCards || [], contract.suit)
      ) {
        setBeloteTeam('northSouth');
      } else if (
        gameService.hasBeloteRebelote(game.east?.availableCards || [], contract.suit) ||
        gameService.hasBeloteRebelote(game.west?.availableCards || [], contract.suit)
      ) {
        setBeloteTeam('eastWest');
      }
    }
  }, [contract?.suit, game]);

  useEffect(() => {
    if (dealingComplete && biddingPhase) {
      setShowBiddingModal(true);
    }
  }, [dealingComplete, biddingPhase]);

  const handleBid = (suit: SuitType, value: number) => {
    const newBid: BidType = {
      player: currentBidder,
      suit,
      value,
      passed: false,
      chosen: false
    };
    
    setBids(prev => [...prev, newBid]);
    setCurrentBidder(biddingService.getNextPlayer(currentBidder));
  };

  const handlePass = () => {
    setPassedPlayers(prev => [...prev, currentBidder]);
    setCurrentBidder(biddingService.getNextPlayer(currentBidder));

    if (passedPlayers.length === 3) {
      const winningBid = bids[bids.length - 1];
      if (winningBid) {
        const contractTeam = 
          (winningBid.player === 'north' || winningBid.player === 'south')
            ? 'northSouth'
            : 'eastWest';
        
        setContract({
          team: contractTeam,
          value: winningBid.value,
          isContree: false,
          isSurContree: false,
          suit: winningBid.suit
        });

        setBiddingPhase(false);
        setShowBiddingModal(false);
        setCurrentTurn(winningBid.player);
      } else {
        startNewGame();
      }
    }
  };

  const handleContree = () => {
    if (!contract) return;

    const isOpposingTeam = (
      (currentBidder === 'north' || currentBidder === 'south') !== 
      (contract.team === 'northSouth')
    );

    if (isOpposingTeam && !contract.isContree) {
      setContract({
        ...contract,
        isContree: true
      });
      setCurrentBidder(biddingService.getNextPlayer(currentBidder));
    }
  };

  const handleSurContree = () => {
    if (!contract) return;

    const isContractTeam = (
      (currentBidder === 'north' || currentBidder === 'south') === 
      (contract.team === 'northSouth')
    );

    if (isContractTeam && contract.isContree && !contract.isSurContree) {
      setContract({
        ...contract,
        isSurContree: true
      });
      setCurrentBidder(biddingService.getNextPlayer(currentBidder));
    }
  };

  const handleCardPlay = (card: Card, position: PlayerType) => {
    if (position !== currentTurn || biddingPhase) return;

    if (playedCards.length === 0) {
      setLeadingSuit(card.suit);
    }

    setPlayedCards(prev => [...prev, {
      player: position,
      card,
    }]);

    const turns: PlayerType[] = ['south', 'west', 'north', 'east'];
    const currentIndex = turns.indexOf(currentTurn);
    const nextTurn = turns[(currentIndex + 1) % 4];
    setCurrentTurn(nextTurn);
  };

  const handleTrickComplete = () => {
    if (!contract || playedCards.length !== 4) return;

    const roundScore = gameService.calculateRoundScore(
      playedCards,
      contract.suit,
      contract,
      beloteTeam
    );

    setScores(prev => ({
      northSouth: prev.northSouth + roundScore.northSouth,
      eastWest: prev.eastWest + roundScore.eastWest
    }));

    setLastRoundWinner(
      roundScore.northSouth > roundScore.eastWest ? 'northSouth' : 'eastWest'
    );

    const winner = gameService.isGameWinner(scores, lastRoundWinner!);
    if (winner) {
      Alert.alert(
        'Game Over',
        `${winner === 'northSouth' ? 'North-South' : 'East-West'} team wins!`,
        [{ text: 'New Game', onPress: startNewGame }]
      );
      return;
    }

    setPlayedCards([]);
    setLeadingSuit(null);
  };

  useEffect(() => {
    if (playedCards.length === 4) {
      setTimeout(() => {
        handleTrickComplete();
      }, 1000);
    }
  }, [playedCards]);

  const startNewGame = () => {
    setIsDealing(true);
    
    // Deal cards to all players
    const hands = gameService.dealCards();
    const updatedGame: GameState = {
      north: {
        side: 'north',
        availableCards: hands.north,
        allowedCards: hands.north,
        team: 'northSouth',
        score: 0
      },
      south: {
        side: 'south',
        availableCards: hands.south,
        allowedCards: hands.south,
        team: 'northSouth',
        score: 0
      },
      east: {
        side: 'east',
        availableCards: hands.east,
        allowedCards: hands.east,
        team: 'eastWest',
        score: 0
      },
      west: {
        side: 'west',
        availableCards: hands.west,
        allowedCards: hands.west,
        team: 'eastWest',
        score: 0
      },
      gameWinningType: null,
      winningBid: null,
      rounds: []
    };
    
    // Update the game store
    const setGame = useGameStore.getState().setGame;
    setGame(updatedGame);
    
    setPlayedCards([]);
    setBids([]);
    setPassedPlayers([]);
    setCurrentBidder('south');
    setBiddingPhase(true);
    setCurrentTurn('south');
    setLeadingSuit(null);
    setTrumpSuit(null);
    setScores({ northSouth: 0, eastWest: 0 });
    setContract(null);
    setBeloteTeam(null);
    setLastRoundWinner(null);

    setTimeout(() => {
      setDealingComplete(true);
      setIsDealing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameContent}>
        {/* North Player */}
        {game.north?.availableCards && (
          <PlayerCards 
            cards={game.north.availableCards}
            position="north"
            isCurrentTurn={currentTurn === 'north'}
            leadingSuit={leadingSuit}
            trumpSuit={trumpSuit}
            onCardPlay={handleCardPlay}
            isDealing={isDealing}
            dealingComplete={dealingComplete}
          />
        )}

        {/* West Player */}
        {game.west?.availableCards && (
          <PlayerCards 
            cards={game.west.availableCards}
            position="west"
            isCurrentTurn={currentTurn === 'west'}
            leadingSuit={leadingSuit}
            trumpSuit={trumpSuit}
            onCardPlay={handleCardPlay}
            isDealing={isDealing}
            dealingComplete={dealingComplete}
          />
        )}

        {/* East Player */}
        {game.east?.availableCards && (
          <PlayerCards 
            cards={game.east.availableCards}
            position="east"
            isCurrentTurn={currentTurn === 'east'}
            leadingSuit={leadingSuit}
            trumpSuit={trumpSuit}
            onCardPlay={handleCardPlay}
            isDealing={isDealing}
            dealingComplete={dealingComplete}
          />
        )}

        {/* Center Area */}
        <CenterCards playedCards={playedCards} />

        {/* South Player */}
        {game.south?.availableCards && (
          <View style={styles.southSection}>
            <PlayerCards 
              cards={game.south.availableCards}
              position="south"
              isCurrentTurn={currentTurn === 'south'}
              leadingSuit={leadingSuit}
              trumpSuit={trumpSuit}
              onCardPlay={handleCardPlay}
              isDealing={isDealing}
              dealingComplete={dealingComplete}
            />
          </View>
        )}

        {/* Toggle Bidding Button */}
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setShowBiddingModal(!showBiddingModal)}
        >
          <Text style={styles.toggleButtonText}>
            {showBiddingModal ? 'Hide Bidding' : 'Show Bidding'}
          </Text>
        </TouchableOpacity>

        {/* Bidding Modal */}
        <BiddingModal
          visible={showBiddingModal}
          onBid={handleBid}
          onPass={handlePass}
          onContree={handleContree}
          onSurContree={handleSurContree}
          canBid={currentBidder === 'south' && biddingPhase}
          canContree={false}
          canSurContree={false}
          bids={[]} // TODO: Get bids from game state
          lastBid={80}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#076324',
  },
  gameContent: {
    flex: 1,
    position: 'relative',
  },
  southSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameTable;
