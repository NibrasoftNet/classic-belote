import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { CardType, SuitType, PlayerSideType, PlayerCardsType } from '@/types';
import ActualPlayer from './ActualPlayer';

const PlayerCards: React.FC<PlayerCardsType> = ({
  position,
  availableCards = [], // Provide default empty array
  isCurrentTurn,
  leadingSuit,
  trumpSuit,
  onCardPlay,
  isDealing,
  dealingComplete,
}) => {
  const dealingAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (availableCards && availableCards.length > 0) {
      dealingAnimations.current = availableCards.map(() => new Animated.Value(0));
    }
  }, [availableCards]);

  useEffect(() => {
    if (isDealing && dealingAnimations.current.length > 0) {
      dealingAnimations.current.forEach(anim => anim.setValue(0));
      
      availableCards.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(index * 350),
          Animated.spring(dealingAnimations.current[index], {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [isDealing, availableCards]);

  const isValidPlay = (card: CardType): boolean => {
    if (!isCurrentTurn) return false;
    
    if (!leadingSuit) return true;
    
    const hasLeadingSuit = availableCards.some(c => c.suit === leadingSuit);
    if (hasLeadingSuit) {
      return card.suit === leadingSuit;
    }
    
    return true;
  };

  const getCardPosition = (index: number, total: number) => {
    // Different spacing for different positions
    const spacing = {
      north: 5,
      south: 45, // Increased spacing for south position
      east: 5,
      west: 5
    }[position];

    const baseRotation = {
      north: 180,  
      south: 0,
      east: 90, 
      west: -90
    }[position];

    // Small rotation for stacking effect
    const rotationOffset = 3; // degrees
    const stackRotation = (index - (total - 1) / 2) * rotationOffset;

    const centerOffset = (total * spacing) / 2;
    let xPos = 0;
    let yPos = 0;

    if (position === 'north' || position === 'south') {
      yPos = 0;
      xPos = (index * spacing) - centerOffset;
    } else {
      // For east and west, stack vertically
      xPos = 0;
      yPos = (index * spacing) - centerOffset;
    }

    return {
      transform: [
        { translateX: xPos },
        { translateY: yPos },
        { rotate: `${baseRotation + stackRotation}deg` }
      ],
    };
  };

  const getSuitIcon = (suit: string) => {
    switch (suit) {
      case '♣': return 'cards-club-outline';
      case '♦': return 'cards-diamond-outline';
      case '♥': return 'cards-heart-outline';
      case '♠': return 'cards-spade-outline';
      default: return 'cards-club-outline';
    }
  };

  const isRedSuit = (suit: string) => suit === '♥' || suit === '♦';

  const isFaceCard = (rank: string): boolean => {
    return ['A', 'J', 'Q', 'K'].includes(rank);
  };

  const getRankNumber = (rank: string): number => {
    if (isFaceCard(rank)) return 1;
    return parseInt(rank, 10);
  };

  const getFaceCardIcon = (rank: string) => {
    switch (rank) {
      case 'J': return { icon: 'chess-knight', size: 32 };
      case 'Q': return { icon: 'chess-queen', size: 32 };
      case 'K': return { icon: 'chess-rook', size: 32 };
      default: return null;
    }
  };

  const renderCardBack = () => {
    return (
      <View style={styles.cardBack}>
        <FontAwesome6 
          name="joomla" 
          size={40} 
          color="#8B0000" 
          style={styles.cardBackIcon}
        />
      </View>
    );
  };

  const renderCardContent = (card: CardType) => {
    if (card.faceUp === 'back') {
      return renderCardBack();
    }

    const iconName = getSuitIcon(card.suit);
    const color = isRedSuit(card.suit) ? '#ff0000' : '#000';
    const count = getRankNumber(card.rank);
    
    if (isFaceCard(card.rank)) {
      const faceIcon = getFaceCardIcon(card.rank);
      return (
        <View style={styles.cardFace}>
          <View style={styles.cardCorner}>
            <Text style={[styles.cardValue, isRedSuit(card.suit) && styles.redCard]}>
              {card.rank}
            </Text>
            <MaterialCommunityIcons
              name={iconName}
              size={14}
              color={color}
              style={styles.cardSuit}
            />
          </View>
          {faceIcon ? (
            <FontAwesome6
              name={faceIcon.icon}
              size={faceIcon.size}
              color={color}
              style={styles.cardCenterSuit}
            />
          ) : (
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={color}
              style={styles.cardCenterSuit}
            />
          )}
          <View style={[styles.cardCorner, styles.bottomCorner]}>
            <Text style={[styles.cardValue, isRedSuit(card.suit) && styles.redCard]}>
              {card.rank}
            </Text>
            <MaterialCommunityIcons
              name={iconName}
              size={14}
              color={color}
              style={styles.cardSuit}
            />
          </View>
        </View>
      );
    }

    // For number cards
    const iconSize = 16;
    return (
      <ActualPlayer
        card={card}
        iconName={iconName}
        iconSize={iconSize}
        color={color}
        isRedSuit={isRedSuit(card.suit)}
      />
    );
  };

  const renderCard = (card: CardType, index: number) => {
    if (!card) return null;

    const isValid = isValidPlay(card);
    const isTrump = card.suit === trumpSuit;
    const { transform } = getCardPosition(index, availableCards.length);

    const animatedStyle = dealingAnimations.current[index] ? {
      transform: [
        ...transform,
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
        key={`${card.suit}-${card.rank}-${index}`}
        style={[styles.cardContainer, animatedStyle]}
      >
        <TouchableOpacity
          disabled={!isValid || !dealingComplete}
          onPress={() => onCardPlay?.(card, position as PlayerSideType)}
          style={[
            styles.card,
            !isValid && styles.invalidCard,
            isTrump && styles.trumpCard,
          ]}
        >
          {position === 'south' ? renderCardContent(card) : (
            <View style={styles.cardBack}>
              <FontAwesome6 
                name="joomla" 
                size={40} 
                color="#8B0000" 
                style={styles.cardBackIcon}
              />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // If no cards, don't render anything
  if (!availableCards || availableCards.length === 0) return null;

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
      {availableCards.map((card, index) => renderCard(card, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  northPosition: {
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  southPosition: {
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  eastPosition: {
    right: 40,
    top: 60,
    bottom: 60,
    flexDirection: 'column',
  },
  westPosition: {
    left: 40,
    top: 60,
    bottom: 60,
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
  },
  cardCorner: {
    alignItems: 'center',
  },
  bottomCorner: {
    transform: [{ rotate: '180deg' }],
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSuit: {
    marginTop: -5,
  },
  cardCenterSuit: {
    alignSelf: 'center',
  },
  redCard: {
    color: '#ff0000',
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackIcon: {
    opacity: 0.8,
  },
  invalidCard: {
    opacity: 0.5,
  },
  trumpCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  numberCardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  bottomIconRow: {
    transform: [{ rotate: '180deg' }],
  },
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  middleSideIcons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PlayerCards;
