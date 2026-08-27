import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Defs,
  Stop,
  Circle,
  RadialGradient,
} from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from "react-native-reanimated";
import { LiquidTabItem } from "./LiquidTabItem";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_BAR_MARGIN = 16;
const TAB_BAR_WIDTH = SCREEN_WIDTH - TAB_BAR_MARGIN * 2;
const TAB_COUNT = 4;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

export interface LiquidTabBarProps {
  state: any;
  descriptors?: any;
  navigation: any;
}

export const LiquidTabBar: React.FC<LiquidTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const activeIndex = state.index;

  // Posición X del resorte animado de la gota líquida
  const animatedIndex = useDerivedValue(() => {
    return withSpring(activeIndex, {
      damping: 15,
      stiffness: 160,
      mass: 0.8,
    });
  }, [activeIndex]);

  // Estilo animado para la burbuja de luz líquida
  const animatedBubbleStyle = useAnimatedStyle(() => {
    const translateX = animatedIndex.value * TAB_WIDTH + TAB_WIDTH / 2 - 28;
    return {
      transform: [{ translateX }],
    };
  });

  const getTabDetails = (name: string) => {
    switch (name) {
      case "habitos":
        return { label: "Hábitos", iconType: "habits" as const };
      case "rocas":
      case "objetivos":
        return { label: "Objetivos", iconType: "rocks" as const };
      case "comunidad":
        return { label: "Comunidad", iconType: "community" as const };
      case "perfil":
        return { label: "Perfil", iconType: "profile" as const };
      default:
        return { label: name, iconType: "habits" as const };
    }
  };

  return (
    <View
      style={[
        styles.outerContainer,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <View style={styles.tabBarContainer}>
        {/* Capa de Fondo Líquida con Resplandor Neón Cian */}
        <Animated.View
          style={[styles.liquidBubbleContainer, animatedBubbleStyle]}
          pointerEvents="none"
        >
          <Svg width={56} height={56} viewBox="0 0 56 56">
            <Defs>
              <RadialGradient id="liquidGlow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                <Stop offset="60%" stopColor="#0052EA" stopOpacity="0.15" />
                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="28" cy="28" r="28" fill="url(#liquidGlow)" />
          </Svg>
        </Animated.View>

        {/* Pestañas Interactivas */}
        <View style={styles.tabsRow}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const { label, iconType } = getTabDetails(route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event?.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <LiquidTabItem
                key={route.key}
                label={label}
                routeName={route.name}
                isFocused={isFocused}
                onPress={onPress}
                iconType={iconType}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: TAB_BAR_MARGIN,
    pointerEvents: "box-none",
  },
  tabBarContainer: {
    width: TAB_BAR_WIDTH,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "visible",
  },
  liquidBubbleContainer: {
    position: "absolute",
    top: -14,
    left: 0,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabsRow: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    zIndex: 2,
  },
});
