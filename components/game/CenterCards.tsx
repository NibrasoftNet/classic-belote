import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { Card, PlayedCard } from '@/types/card';

interface CenterCardsProps {
  playedCards: PlayedCard[];
}

const CenterCards: React.FC<CenterCardsProps> = ({ playedCards }) => {
  const getCardPosition = (position: string) => {
    switch (position) {
      case 'north':
        return { top: -30 };
      case 'south':
        return { bottom: -30 };
      case 'east':
        return { right: -30 };
      case 'west':
        return { left: -30 };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      {playedCards.map((playedCard, index) => (
        <Animated.View
          key={`${playedCard.player}-${playedCard.card.id}`}
          style={[
            styles.cardContainer,
            getCardPosition(playedCard.player)
          ]}
        >
          <View style={[
            styles.card,
            { transform: [{ rotate: `${(index * 5)}deg` }] }
          ]}>
            <View style={styles.cardCorner}>
              <Text style={[
                styles.cardValue,
                { color: playedCard.card.suit === '♥' || playedCard.card.suit === '♦' ? '#ff0000' : '#000000' }
              ]}>
                {playedCard.card.value}
              </Text>
              <Text style={[
                styles.cornerSuit,
                { color: playedCard.card.suit === '♥' || playedCard.card.suit === '♦' ? '#ff0000' : '#000000' }
              ]}>
                {playedCard.card.suit}
              </Text>
            </View>
            
            <Text style={[
              styles.cardSuit,
              { color: playedCard.card.suit === '♥' || playedCard.card.suit === '♦' ? '#ff0000' : '#000000' }
            ]}>
              {playedCard.card.suit}
            </Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  cardContainer: {
    position: 'absolute',
    width: 50,
    height: 75,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardCorner: {
    alignItems: 'center',
    position: 'absolute',
    left: 4,
    top: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  cornerSuit: {
    fontSize: 12,
    lineHeight: 12,
  },
  cardSuit: {
    fontSize: 28,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -14 }],
  },
});

export default CenterCards;
