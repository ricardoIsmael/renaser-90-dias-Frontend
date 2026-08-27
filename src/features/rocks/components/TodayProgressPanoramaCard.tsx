import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { PANORAMA_ROCAS } from "./AxisIcon";

interface TodayProgressPanoramaCardProps {
  completedCount: number;
  totalCount: number;
}

export const TodayProgressPanoramaCard: React.FC<
  TodayProgressPanoramaCardProps
> = ({ completedCount, totalCount }) => {
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.card}>
      {/* Ilustración de ROCAS.png anclada a la derecha inferior */}
      <Image
        source={PANORAMA_ROCAS}
        style={styles.panoramaImage}
        resizeMode="contain"
      />

      {/* Ring de Progreso */}
      <View style={styles.ringWrapper}>
        <Svg width={64} height={64} viewBox="0 0 64 64">
          <Circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="5.5"
            fill="none"
          />
          <Circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#F59E0B"
            strokeWidth="5.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 32 32)"
          />
        </Svg>
        <View style={styles.centerTextContainer}>
          <Text style={styles.ringText}>
            {completedCount}/{totalCount}
          </Text>
        </View>
      </View>

      {/* Texto de la tarjeta */}
      <View style={styles.textCol}>
        <Text style={styles.eyebrow}>TU PROGRESO DE HOY</Text>
        <Text style={styles.headline}>{percentage}% completado</Text>
        <Text style={styles.subtext}>Salud, Dinero y Relaciones</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  panoramaImage: {
    position: "absolute",
    right: -12,
    bottom: -10,
    width: 145,
    height: 95,
  },
  ringWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  centerTextContainer: {
    position: "absolute",
  },
  ringText: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#0F172A",
  },
  textCol: {
    maxWidth: "58%",
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "#64748B",
  },
  headline: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },
  subtext: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
});
