import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";

interface ShimmerSubtitleProps {
  text?: string;
}

export const ShimmerSubtitle: React.FC<ShimmerSubtitleProps> = ({
  text = "Tu Bienestar Elevado",
}) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 600, easing: Easing.linear })
      ),
      -1,
      false
    );
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.65, 1, 0.65]);
    const letterSpacing = interpolate(shimmer.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
    return {
      opacity,
      letterSpacing,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    paddingVertical: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B", // Clean slate
    textAlign: "center",
  },
});
