import { Animated } from 'react-native';

export class DealingAnimationService {
  private static instance: DealingAnimationService;
  
  private constructor() {}

  public static getInstance(): DealingAnimationService {
    if (!DealingAnimationService.instance) {
      DealingAnimationService.instance = new DealingAnimationService();
    }
    return DealingAnimationService.instance;
  }

  public createDealingAnimation(
    position: 'north' | 'east' | 'south' | 'west',
    index: number,
    round: 1 | 2 | 3
  ): {
    translateX: Animated.Value;
    translateY: Animated.Value;
    rotate: Animated.Value;
    scale: Animated.Value;
    opacity: Animated.Value;
  } {
    const translateX = new Animated.Value(0);
    const translateY = new Animated.Value(0);
    const rotate = new Animated.Value(0);
    const scale = new Animated.Value(0);
    const opacity = new Animated.Value(0);

    // Calculate delay based on dealing order
    const playerOrder = ['south', 'west', 'north', 'east'];
    const playerIndex = playerOrder.indexOf(position);
    const baseDelay = (playerIndex * (round === 2 ? 2 : 3) + index) * 100;

    // Calculate target position based on player position
    const targetPositions = {
      north: { x: 0, y: -150 },
      east: { x: 150, y: 0 },
      south: { x: 0, y: 150 },
      west: { x: -150, y: 0 }
    };

    // Create animation sequence
    Animated.sequence([
      // Wait for turn
      Animated.delay(baseDelay),
      // Start animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: targetPositions[position].x,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: targetPositions[position].y,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    return {
      translateX,
      translateY,
      rotate,
      scale,
      opacity,
    };
  }
}

export const dealingAnimationService = DealingAnimationService.getInstance();
