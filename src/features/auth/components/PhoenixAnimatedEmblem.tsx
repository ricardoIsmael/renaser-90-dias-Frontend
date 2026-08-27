import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Path,
  Circle,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

export const PhoenixAnimatedEmblem: React.FC = () => {
  // Levitación vertical suave continua
  const floatAnim = useSharedValue(0);
  // Inclinación 3D cinética sutil
  const tiltAnim = useSharedValue(0);
  // Pulso de resplandor ambiental
  const glowAnim = useSharedValue(0.4);
  // Partículas en órbita
  const particleAnim = useSharedValue(0);

  useEffect(() => {
    // 1. Levitación continua (arriba y abajo suave)
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );

    // 2. Inclinación 3D cinética
    tiltAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4200, easing: Easing.inOut(Easing.quad) }),
        withTiming(-1, { duration: 4200, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // 3. Resplandor pulsante
    glowAnim.value = withRepeat(
      withSequence(
        withTiming(0.85, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 2200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // 4. Partículas en rotación continua
    particleAnim.value = withRepeat(
      withTiming(1, { duration: 6500, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedEmblemStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatAnim.value, [0, 1], [0, -8]);
    const rotateZ = `${interpolate(tiltAnim.value, [-1, 1], [-1.5, 1.5])}deg`;
    const scale = interpolate(floatAnim.value, [0, 1], [1, 1.02]);

    return {
      transform: [{ translateY }, { rotateZ }, { scale }],
    };
  });

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowAnim.value,
      transform: [
        { scale: interpolate(glowAnim.value, [0.4, 0.85], [0.95, 1.1]) },
      ],
    };
  });

  const animatedParticleStyle1 = useAnimatedStyle(() => {
    const angle = particleAnim.value * 2 * Math.PI;
    const x = Math.cos(angle) * 82;
    const y = Math.sin(angle) * 64;
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity: interpolate(Math.sin(angle), [-1, 1], [0.2, 0.95]),
    };
  });

  const animatedParticleStyle2 = useAnimatedStyle(() => {
    const angle = (particleAnim.value + 0.33) * 2 * Math.PI;
    const x = Math.cos(-angle) * 94;
    const y = Math.sin(-angle) * 72;
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity: interpolate(Math.cos(angle), [-1, 1], [0.3, 1]),
    };
  });

  const animatedParticleStyle3 = useAnimatedStyle(() => {
    const angle = (particleAnim.value + 0.66) * 2 * Math.PI;
    const x = Math.sin(angle) * 98;
    const y = Math.cos(angle) * 58;
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity: interpolate(Math.sin(angle), [-1, 1], [0.15, 0.85]),
    };
  });

  return (
    <View style={styles.container}>
      {/* Resplandor ambiental de luz zafiro/plata difuso del Mockup */}
      <Animated.View style={[styles.ambientGlow, animatedGlowStyle]}>
        <Svg width={280} height={280} viewBox="0 0 280 280">
          <Defs>
            <RadialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
              <Stop offset="40%" stopColor="#818CF8" stopOpacity="0.18" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="140" cy="140" r="140" fill="url(#auraGlow)" />
        </Svg>
      </Animated.View>

      {/* Partículas de destellos orbitales brillantes */}
      <Animated.View style={[styles.sparkleParticle, animatedParticleStyle1]}>
        <SparkleIcon size={14} color="#38BDF8" />
      </Animated.View>
      <Animated.View style={[styles.sparkleParticle, animatedParticleStyle2]}>
        <SparkleIcon size={12} color="#60A5FA" />
      </Animated.View>
      <Animated.View style={[styles.sparkleParticle, animatedParticleStyle3]}>
        <SparkleIcon size={16} color="#93C5FD" />
      </Animated.View>

      {/* Emblema Principal Completo con Cola y Alas en Proporción Real */}
      <Animated.View style={[styles.emblemWrapper, animatedEmblemStyle]}>
        <Image
          source={require("../../../../assets/images/phoenix_3d_chrome.png")}
          style={styles.phoenixImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

// Componente de estrella de destello de 4 puntas
const SparkleIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 195,
    width: "100%",
    marginBottom: 6,
  },
  ambientGlow: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  emblemWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  phoenixImage: {
    width: 250,
    height: 195,
  },
  sparkleParticle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
