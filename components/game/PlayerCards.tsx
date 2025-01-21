import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { Card, SuitType, PlayerType } from '@/types/card';

interface PlayerCardsProps {
  position: 'north' | 'south' | 'east' | 'west';
  cards: Card[];
  isCurrentTurn: boolean;
  leadingSuit: SuitType | null;
  trumpSuit: SuitType | null;
  onCardPlay: (card: Card, position: PlayerType) => void;
  isDealing: boolean;
  dealingComplete: boolean;
}

const PlayerCards: React.FC<PlayerCardsProps> = ({
  position,
  cards = [], // Provide default empty array
  isCurrentTurn,
  leadingSuit,
  trumpSuit,
  onCardPlay,
  isDealing,
  dealingComplete,
}) => {
  const dealingAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (cards && cards.length > 0) {
      dealingAnimations.current = cards.map(() => new Animated.Value(0));
    }
  }, [cards]);

  useEffect(() => {
    if (isDealing && dealingAnimations.current.length > 0) {
      dealingAnimations.current.forEach(anim => anim.setValue(0));
      
      cards.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.spring(dealingAnimations.current[index], {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [isDealing, cards]);

  const isValidPlay = (card: Card): boolean => {
    if (!isCurrentTurn) return false;
    
    if (!leadingSuit) return true;
    
    const hasLeadingSuit = cards.some(c => c.suit === leadingSuit);
    if (hasLeadingSuit) {
      return card.suit === leadingSuit;
    }
    
    return true;
  };

  const getCardPosition = (index: number, total: number) => {
    const spacing = position === 'north' || position === 'south' ? 30 : 20;
    const baseRotation = {
      north: 180,
      south: 0,
      east: 90,
      west: -90
    }[position];

    const fanRotation = {
      north: -15,
      south: 15,
      east: -15,
      west: 15
    }[position];

    const centerOffset = (total * spacing) / 2;
    const xPos = (index * spacing) - centerOffset;
    const rotation = baseRotation + ((index - (total - 1) / 2) * fanRotation / total);

    return { xPos, rotation };
  };

  const renderCard = (card: Card, index: number) => {
    if (!card) return null;

    const isValid = isValidPlay(card);
    const isTrump = card.suit === trumpSuit;
    const { xPos, rotation } = getCardPosition(index, cards.length);

    const animatedStyle = dealingAnimations.current[index] ? {
      transform: [
        { translateX: xPos },
        { rotate: `${rotation}deg` },
        {
          scale: dealingAnimations.current[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
        {
          translateY: dealingAnimations.current[index].interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
      opacity: dealingAnimations.current[index],
    } : {};

    return (
      <Animated.View
        key={`${card.suit}-${card.value}-${index}`}
        style={[
          styles.cardContainer,
          animatedStyle,
        ]}
      >
        <TouchableOpacity
          disabled={!isValid || !dealingComplete}
          onPress={() => onCardPlay({ card, position: position as PlayerType })}
          style={[
            styles.card,
            !isValid && styles.invalidCard,
            isTrump && styles.trumpCard,
          ]}
        >
          {position === 'south' ? (
            <View style={styles.cardFace}>
              <View style={styles.cardCorner}>
                <Text style={[
                  styles.cardValue,
                  (card.suit === '♥' || card.suit === '♦') && styles.redCard
                ]}>
                  {card.value}
                </Text>
                <Text style={[
                  styles.cardSuit,
                  (card.suit === '♥' || card.suit === '♦') && styles.redCard
                ]}>
                  {card.suit}
                </Text>
              </View>
              <Text style={[
                styles.cardCenterSuit,
                (card.suit === '♥' || card.suit === '♦') && styles.redCard
              ]}>
                {card.suit}
              </Text>
              <View style={[styles.cardCorner, styles.bottomCorner]}>
                <Text style={[
                  styles.cardValue,
                  (card.suit === '♥' || card.suit === '♦') && styles.redCard
                ]}>
                  {card.value}
                </Text>
                <Text style={[
                  styles.cardSuit,
                  (card.suit === '♥' || card.suit === '♦') && styles.redCard
                ]}>
                  {card.suit}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.cardBack}>
              <View style={styles.cardBackPattern} />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // If no cards, don't render anything
  if (!cards || cards.length === 0) return null;

  return (
    <View
      style={[
        styles.container,
        position === 'north' && styles.northPosition,
        position === 'south' && styles.southPosition,
        position === 'east' && styles.eastPosition,
        position === 'west' && styles.westPosition,
      ]}
    >
      {cards.map((card, index) => renderCard(card, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  northPosition: {
    top: 10,
    left: 0,
    right: 0,
  },
  southPosition: {
    bottom: 10,
    left: 0,
    right: 0,
  },
  eastPosition: {
    right: 10,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  westPosition: {
    left: 10,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  cardContainer: {
    position: 'absolute',
  },
  card: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardFace: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-between',
  },
  cardCorner: {
    alignItems: 'center',
  },
  bottomCorner: {
    transform: [{ rotate: '180deg' }],
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSuit: {
    fontSize: 16,
    color: '#000',
    marginTop: -5,
  },
  cardCenterSuit: {
    fontSize: 32,
    alignSelf: 'center',
    color: '#000',
  },
  redCard: {
    color: '#ff0000',
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 4,
  },
  cardBackPattern: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
  },
  invalidCard: {
    opacity: 0.5,
  },
  trumpCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
});

export default PlayerCards;
