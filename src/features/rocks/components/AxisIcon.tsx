import React from "react";
import { Image, View, ImageSourcePropType, StyleSheet } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";

export type GoalAxis = "BODY" | "WORK" | "RELATIONSHIPS";

export const AXIS_LABEL: Record<GoalAxis, string> = {
  BODY: "Salud",
  WORK: "Dinero",
  RELATIONSHIPS: "Relaciones",
};

export const AXIS_ILLUSTRATION: Record<GoalAxis, any> = {
  BODY: require("../../../../assets/images/ROCA_ DE SALUD.png"),
  WORK: require("../../../../assets/images/ROCA_ DINERO.png"),
  RELATIONSHIPS: require("../../../../assets/images/ROCA_ RELACIONES.png"),
};

export const PANORAMA_ROCAS = require("../../../../assets/images/ROCAS.png");

export const AxisIconSvg: React.FC<{ axis: GoalAxis; size?: number; color?: string }> = ({
  axis,
  size = 18,
  color = "#0F172A",
}) => {
  switch (axis) {
    case "BODY":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M22 12h-4l-3 9L9 3l-3 9H2"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "WORK":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "RELATIONSHIPS":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
  }
};

export const AxisBadge: React.FC<{ axis: GoalAxis; size?: number; glow?: boolean }> = ({
  axis,
  size = 32,
  glow = false,
}) => {
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: glow ? "#0052EA" : "#E2E8F0",
          borderWidth: glow ? 2 : 1,
        },
      ]}
    >
      <AxisIconSvg axis={axis} size={size * 0.52} color="#0F172A" />
    </View>
  );
};

export const ParetoDot: React.FC<{ pareto: "GREEN" | "YELLOW" | "RED"; size?: number }> = ({
  pareto,
  size = 8,
}) => {
  const color =
    pareto === "RED" ? "#EF4444" : pareto === "YELLOW" ? "#F59E0B" : "#10B981";
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
});
