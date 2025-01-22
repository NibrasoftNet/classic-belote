import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActualPlayerProps } from '@/types';

const ActualPlayer: React.FC<ActualPlayerProps> = ({
  card,
  iconName,
  iconSize,
  color,
  isRedSuit,
}) => {
  const count = parseInt(card.rank, 10);
  const isNumberCard = count >= 7 && count <= 10;

  const renderIcon = (key: string) => (
    <MaterialCommunityIcons
      key={key}
      name={iconName}
      size={iconSize}
      color={color}
    />
  );

  const renderSideIcons = (side: 'left' | 'right', count: number) => (
    <View style={styles.middleSideIcons}>
      {Array.from({ length: count }).map((_, i) => renderIcon(`${side}-${i}`))}
    </View>
  );

  const renderNumberCard = () => {
    // Special case for 7
    if (count === 7) {
      return (
        <View style={styles.numberCardContent}>
          {/* Top single icon */}
          <View style={styles.iconRow}>
            <View style={styles.centerIcon}>{renderIcon('top')}</View>
          </View>
          
          {/* Middle section with 6 icons (3 on each side) */}
          <View style={styles.middleSection}>
            {renderSideIcons('left', 3)}
            <Text style={[styles.centerRank, isRedSuit && styles.redCard]}>
              {card.rank}
            </Text>
            {renderSideIcons('right', 3)}
          </View>

          {/* Empty bottom row */}
          <View style={styles.iconRow} />
        </View>
      );
    }

    // Special case for 9
    if (count === 9) {
      return (
        <View style={styles.numberCardContent}>
          {/* Top single icon */}
          <View style={styles.iconRow}>
            <View style={styles.centerIcon}>{renderIcon('top')}</View>
          </View>
          
          {/* Middle section with 8 icons (4 on each side) */}
          <View style={styles.middleSection}>
            {renderSideIcons('left', 4)}
            <Text style={[styles.centerRank, isRedSuit && styles.redCard]}>
              {card.rank}
            </Text>
            {renderSideIcons('right', 4)}
          </View>

          {/* Empty bottom row */}
          <View style={styles.iconRow} />
        </View>
      );
    }

    // Special case for 8
    if (count === 8) {
      return (
        <View style={styles.numberCardContent}>
          <View style={styles.iconRow} />
          
          {/* Middle section with 8 icons (4 on each side) */}
          <View style={styles.middleSection}>
            {renderSideIcons('left', 4)}
            <Text style={[styles.centerRank, isRedSuit && styles.redCard]}>
              {card.rank}
            </Text>
            {renderSideIcons('right', 4)}
          </View>

          <View style={styles.iconRow} />
        </View>
      );
    }

    // Special case for 10
    return (
      <View style={styles.numberCardContent}>
        {/* Top single icon */}
        <View style={styles.iconRow}>
          <View style={styles.centerIcon}>{renderIcon('top')}</View>
        </View>
        
        {/* Middle section with rank and 8 icons (4 on each side) */}
        <View style={styles.middleSection}>
          {renderSideIcons('left', 4)}
          <Text style={[styles.centerRank, isRedSuit && styles.redCard]}>
            {card.rank}
          </Text>
          {renderSideIcons('right', 4)}
        </View>

        {/* Bottom single icon */}
        <View style={[styles.iconRow, styles.bottomIconRow]}>
          <View style={styles.centerIcon}>{renderIcon('bottom')}</View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cardFace}>
      {isNumberCard ? renderNumberCard() : (
        <View style={styles.numberCardContent}>
          <Text style={[styles.centerRank, isRedSuit && styles.redCard]}>
            {card.rank}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardFace: {
    flex: 1,
    padding: 3,
  },
  numberCardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 3,
    minHeight: 16,
  },
  bottomIconRow: {
    transform: [{ rotate: '180deg' }],
  },
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 3,
  },
  middleSideIcons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  centerRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 2,
  },
  redCard: {
    color: '#ff0000',
  },
  centerIcon: {
    alignItems: 'center',
  },
});

export default ActualPlayer;
