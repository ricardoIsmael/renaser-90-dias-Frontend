import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, {
  Defs,
  Circle,
  RadialGradient,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface HabitsCoherenceRingProps {
  completedCount: number;
  totalCount: number;
}

export const HabitsCoherenceRing: React.FC<HabitsCoherenceRingProps> = ({
  completedCount,
  totalCount,
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.card}>
      <View style={styles.ringWrapper}>
        <Svg width={140} height={140} viewBox="0 0 140 140">
          <Defs>
            <RadialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <Stop offset="70%" stopColor="#0052EA" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </RadialGradient>
            <LinearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#10B981" />
              <Stop offset="100%" stopColor="#00E5FF" />
            </LinearGradient>
          </Defs>

          {/* Resplandor de fondo */}
          <Circle cx="70" cy="70" r="68" fill="url(#ringGlow)" />

          {/* Pista base */}
          <Circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="10"
            fill="none"
          />

          {/* Arco de progreso */}
          <Circle
            cx="70"
            cy="70"
            r={radius}
            stroke="url(#gradientRing)"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 70 70)"
          />
        </Svg>

        <View style={styles.centerContent}>
          <Text style={styles.percentText}>{percentage}%</Text>
          <Text style={styles.labelText}>COHERENCIA</Text>
        </View>
      </View>

      <View style={styles.statsCol}>
        <Text style={styles.headline}>Progreso Diario</Text>
        <Text style={styles.subtitle}>
          {completedCount} de {totalCount} hábitos completados hoy
        </Text>
        <View style={styles.streakPill}>
          <Text style={styles.streakText}>🔥 14 Días de Racha Perfecta</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: "rgba(226, 232, 240, 0.9)",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  ringWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  centerContent: {
    position: "absolute",
    alignItems: "center",
  },
  percentText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  labelText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#059669",
    letterSpacing: 0.5,
  },
  statsCol: {
    flex: 1,
  },
  headline: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 2,
    marginBottom: 10,
  },
  streakPill: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  streakText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#D97706",
  },
});
