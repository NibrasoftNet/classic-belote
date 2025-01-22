import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import useGameStore from '@/store/gameStore';
import { useBidStore } from '@/store/bidStore';
import PlayerCards from './PlayerCards';
import BiddingModal from './BiddingModal';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { distributeCards } from '@/utils/distributeCards';
import CardCardSuitsRedBackground from '../CardSuitsRedBackground';
import PlayersScoreCard from './PlayersScoreCard';

const GameTable: React.FC<{ newGame: boolean }> = ({ newGame }) => {
  const { game, setGame} = useGameStore();
  const { isDealing, setIsDealing } = useBidStore();
  const [showBiddingModal, setShowBiddingModal] = useState(false);

  const getRandomSuit = () => {
    const suits = ['cards-club', 'cards-diamond', 'cards-heart', 'cards-spade'];
    return suits[Math.floor(Math.random() * suits.length)];
  };

  const handleRedistributeCards = () => {
    setIsDealing(true);
    const players = distributeCards();
    setGame({
      ...game,
      north: players.north,
      east: players.east,
      south: players.south,
      west: players.west
    });
    setTimeout(() => {
      setIsDealing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <CardCardSuitsRedBackground />
      <View style={styles.gameContent}>
        {/* Players Score Card */}
        {game.north && game.south && game.east && game.west && (
          <PlayersScoreCard
            players={{
              north: game.north,
              south: game.south,
              east: game.east,
              west: game.west,
            }}
          />
        )}
        
        {/* North Player */}
        {game.north?.availableCards && (
          <PlayerCards 
            availableCards={game.north.availableCards}
            allowedCards={game.north.allowedCards}
            score={game.north.score}
            team={game.north.team}
            position="north"
            isDealing={isDealing}
          />
        )}

        {/* West Player */}
        {game.west?.availableCards && (
          <PlayerCards 
            availableCards={game.west.availableCards}
            allowedCards={game.west.allowedCards}
            score={game.west.score}
            team={game.west.team}
            position="west"
            isDealing={isDealing}
          />
        )}

        {/* East Player */}
        {game.east?.availableCards && (
          <PlayerCards 
            availableCards={game.east.availableCards}
            allowedCards={game.east.allowedCards}
            score={game.east.score}
            team={game.east.team}
            position="east"
            isDealing={isDealing}
          />
        )}
        {/* South Player */}
        {game.south?.availableCards && (
          <View style={styles.southSection}>
            <PlayerCards 
              availableCards={game.south.availableCards}
              allowedCards={game.south.allowedCards}
              score={game.south.score}
              team={game.south.team}
              position="south"
              isCurrentTurn={true}
              isDealing={isDealing}
            />
          </View>
        )}

        {/* Game Controls */}
        { 
          newGame && (
            <View style={styles.gameControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => setShowBiddingModal(!showBiddingModal)}
              >
                <Text style={styles.buttonText}>
                  {showBiddingModal ? <Ionicons name="flash-off" size={28} color="white" /> : <Ionicons name="flash" size={28} color="white" />}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleRedistributeCards}
              >
                <Text style={styles.buttonText}>
                  <Ionicons name="shuffle" size={28} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
        {/* Bidding Modal */}
        <BiddingModal
          visible={showBiddingModal}
          setVisible={setShowBiddingModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
    position: 'relative',
    overflow: 'hidden',
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
  gameControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    zIndex: 1,
  },
  controlButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'blue',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameTable;
