import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";

interface LiquidTabItemProps {
  label: string;
  routeName: string;
  isFocused: boolean;
  onPress: () => void;
  iconType: "habits" | "rocks" | "community" | "profile";
}

export const LiquidTabItem: React.FC<LiquidTabItemProps> = ({
  label,
  isFocused,
  onPress,
  iconType,
}) => {
  const animatedIconStyle = useAnimatedStyle(() => {
    const translateY = withSpring(isFocused ? -12 : 0, {
      damping: 14,
      stiffness: 180,
    });
    const scale = withSpring(isFocused ? 1.15 : 1, {
      damping: 12,
      stiffness: 200,
    });

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = withSpring(isFocused ? 1 : 0.6, {
      damping: 15,
      stiffness: 180,
    });
    const translateY = withSpring(isFocused ? -6 : 0, {
      damping: 14,
      stiffness: 180,
    });

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const renderIcon = (focused: boolean) => {
    const color = focused ? "#0052EA" : "#64748B";
    const strokeWidth = focused ? 2.2 : 1.8;

    switch (iconType) {
      case "habits":
        // Icono de Hábitos / Hoja - Check
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "rocks":
        // Icono de Rocas / Montaña - Diamante
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M6 3h12l4 6-10 13L2 9l4-6z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "community":
        // Icono de Comunidad / Usuarios
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M23 21v-2a4 4 0 0 0-3-3.87"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M16 3.13a4 4 0 0 1 0 7.75"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "profile":
        // Icono de Perfil / Usuario
        return (
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Animated.View
        style={[
          styles.iconWrapper,
          animatedIconStyle,
          isFocused && styles.activeIconWrapper,
        ]}
      >
        {renderIcon(isFocused)}
      </Animated.View>

      <Animated.Text
        style={[
          styles.label,
          animatedTextStyle,
          isFocused ? styles.activeLabel : styles.inactiveLabel,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    zIndex: 10,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activeIconWrapper: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  activeLabel: {
    fontWeight: "700",
    color: "#0052EA",
  },
  inactiveLabel: {
    fontWeight: "500",
    color: "#64748B",
  },
});
