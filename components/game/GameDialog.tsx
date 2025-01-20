import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface GameDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  options: {
    text: string;
    value: any;
    onPress: (value: any) => void;
  }[];
  type?: 'bid' | 'round' | 'game';
}

export const GameDialog: React.FC<GameDialogProps> = ({
  visible,
  onClose,
  title,
  message,
  options,
  type = 'bid',
}) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    } else {
      scale.value = withSpring(0.8);
      opacity.value = withTiming(0);
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const dialogStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!visible) return null;

  const renderBidOptions = () => (
    <View style={styles.bidOptionsContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.bidButton}
          onPress={() => option.onPress(option.value)}
        >
          <Text style={styles.bidButtonText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderGameOverOptions = () => (
    <View style={styles.gameOverContainer}>
      <Text style={styles.winnerText}>{message}</Text>
      <View style={styles.gameOverButtons}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gameOverButton}
            onPress={() => option.onPress(option.value)}
          >
            <Text style={styles.gameOverButtonText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRoundWinnerMessage = () => (
    <View style={styles.roundWinnerContainer}>
      <Text style={styles.roundWinnerText}>{message}</Text>
      <TouchableOpacity
        style={styles.roundWinnerButton}
        onPress={() => options[0].onPress(options[0].value)}
      >
        <Text style={styles.roundWinnerButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.overlay, containerStyle]}>
        <Animated.View style={[styles.dialog, dialogStyle]}>
          <Text style={styles.title}>{title}</Text>
          {type === 'bid' && renderBidOptions()}
          {type === 'round' && renderRoundWinnerMessage()}
          {type === 'game' && renderGameOverOptions()}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    minWidth: 300,
    maxWidth: '80%',
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bidOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  bidButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    minWidth: 60,
    margin: 5,
  },
  bidButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  gameOverContainer: {
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  gameOverButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  gameOverButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  gameOverButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  roundWinnerContainer: {
    alignItems: 'center',
  },
  roundWinnerText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  roundWinnerButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
  },
  roundWinnerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
