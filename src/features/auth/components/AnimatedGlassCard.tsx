import React, { useEffect } from "react";
import { StyleSheet, ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AnimatedGlassCardProps extends ViewProps {
  children: React.ReactNode;
}

export const AnimatedGlassCard: React.FC<AnimatedGlassCardProps> = ({
  children,
  style,
  ...props
}) => {
  const scale = useSharedValue(0.94);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 120 });
    opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: "rgba(226, 232, 240, 0.85)",
    padding: 24,
    width: "100%",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
});
