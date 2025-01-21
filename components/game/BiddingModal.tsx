import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { SuitType } from '@/types/card';
import { PlayerType } from '@/types/player';

interface BiddingModalProps {
  onBid: (suit: SuitType, value: number) => void;
  onPass: () => void;
  onContree: () => void;
  onSurContree: () => void;
  visible: boolean;
  currentBidder: PlayerType;
  lastBid?: number;
  players: { [key in PlayerType]: { name: string; bid?: { suit: SuitType; value: number } } };
}

const BiddingModal: React.FC<BiddingModalProps> = ({
  onBid,
  onPass,
  onContree,
  onSurContree,
  visible,
  currentBidder,
  lastBid = 80,
  players = {
    south: { name: 'South', bid: { suit: '♦', value: 0 } },
    west: { name: 'West', bid: { suit: '♦', value: 0 } },
    north: { name: 'North', bid: { suit: '♦', value: 0 } },
    east: { name: 'East', bid: { suit: '♦', value: 0 } }
  },
}) => {
  const [selectedSuit, setSelectedSuit] = useState<SuitType | null>(null);
  const [bidValue, setBidValue] = useState(Math.max(90, lastBid + 10));

  const suits: SuitType[] = ['♠', '♥', '♣', '♦'];
  const playerOrder: PlayerType[] = ['south', 'west', 'north', 'east'];

  const handleBidValueChange = (increment: boolean) => {
    setBidValue(prev => {
      const newValue = increment ? prev + 10 : prev - 10;
      return Math.min(Math.max(newValue, Math.max(90, lastBid + 10)), 180);
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* First Row - 2/3 height */}
          <View style={styles.topSection}>
            {/* Players Column */}
            <View style={styles.playersColumn}>
              {playerOrder.map(position => (
                <View key={position} style={styles.playerRow}>
                  <View style={styles.playerInfo}>
                    <Text style={[
                      styles.playerName,
                      position === currentBidder && styles.currentBidder
                    ]}>
                      {players[position]?.name || position}
                    </Text>
                    <Text style={styles.bidText}>
                      {players[position]?.bid ? `${players[position].bid.value} ${players[position].bid.suit}` : '0 ♦'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Suits Column */}
            <View style={styles.suitsColumn}>
              <View style={styles.suitsGrid}>
                {suits.map(suit => (
                  <TouchableOpacity
                    key={suit}
                    style={[
                      styles.suitButton,
                      selectedSuit === suit && styles.selectedSuit
                    ]}
                    onPress={() => setSelectedSuit(suit)}
                  >
                    <Text style={[
                      styles.suitText,
                      { color: ['♥', '♦'].includes(suit) ? '#FF0000' : '#000000' }
                    ]}>
                      {suit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bid Value Column */}
            <View style={styles.bidValueColumn}>
              <View style={styles.bidValueControls}>
                <TouchableOpacity
                  style={styles.bidValueButton}
                  onPress={() => handleBidValueChange(false)}
                >
                  <Text style={styles.buttonText}>◀</Text>
                </TouchableOpacity>
                
                <View style={styles.bidValueDisplay}>
                  <Text style={styles.bidValueText}>{bidValue}</Text>
                </View>

                <TouchableOpacity
                  style={styles.bidValueButton}
                  onPress={() => handleBidValueChange(true)}
                >
                  <Text style={styles.buttonText}>▶</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Second Row - 1/3 height */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={[styles.actionButton, styles.passButton]}
              onPress={onPass}
            >
              <Text style={styles.passButtonText}>Pass</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.contreeButton]}
              onPress={onContree}
            >
              <Text style={styles.contreeButtonText}>Contrée</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.surContreeButton]}
              onPress={onSurContree}
            >
              <Text style={styles.surContreeButtonText}>Sur-Contrée</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.bidButton]}
              onPress={() => selectedSuit && onBid(selectedSuit, bidValue)}
              disabled={!selectedSuit}
            >
              <Text style={styles.bidButtonText}>Bid</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: Dimensions.get('window').height * 0.66,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  topSection: {
    flex: 2,
    flexDirection: 'row',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  playersColumn: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  playerRow: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  currentBidder: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  bidText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  suitsColumn: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suitsGrid: {
    width: '70%',
    height: '70%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 10,
    marginBottom: 40,
  },
  suitButton: {
    width: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: '5%',
  },
  selectedSuit: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  suitText: {
    fontSize: 24,
  },
  bidValueColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bidValueControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  bidValueButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
  bidValueDisplay: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
  },
  bidValueText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    color: '#2196F3',
  },
  actionButton: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passButton: {
    backgroundColor: '#9E9E9E',
  },
  contreeButton: {
    backgroundColor: '#FF9800',
  },
  surContreeButton: {
    backgroundColor: '#F44336',
  },
  bidButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  passButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  contreeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  surContreeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  bidButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});

export default BiddingModal;
