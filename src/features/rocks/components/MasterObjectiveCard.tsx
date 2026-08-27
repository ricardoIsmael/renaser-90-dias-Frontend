import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import {
  AXIS_LABEL,
  AXIS_ILLUSTRATION,
  GoalAxis,
} from "./AxisIcon";
import { MasterRock } from "../data/objetivosMockData";

interface MasterObjectiveCardProps {
  masterRock: MasterRock;
}

export const MasterObjectiveCard: React.FC<MasterObjectiveCardProps> = ({
  masterRock,
}) => {
  const axis = masterRock.goalAxis;
  const illustration = AXIS_ILLUSTRATION[axis];

  return (
    <View style={styles.card}>
      {/* Ilustración de fondo a la derecha */}
      {illustration && (
        <Image
          source={illustration}
          style={styles.illustration}
          resizeMode={axis === "BODY" ? "contain" : "cover"}
        />
      )}

      {/* Degradado para fundir suavemente la ilustración con el fondo oscuro */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="masterFade" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#0A0A0B" stopOpacity={1} />
            <Stop offset="0.5" stopColor="#0A0A0B" stopOpacity={0.94} />
            <Stop offset="0.8" stopColor="#0A0A0B" stopOpacity={0.4} />
            <Stop offset="1" stopColor="#0A0A0B" stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#masterFade)" />
      </Svg>

      {/* Contenido Superior */}
      <View style={styles.content}>
        <View style={styles.headerStack}>
          <Text style={styles.eyebrow}>
            OBJETIVO MAESTRO · {AXIS_LABEL[axis].toUpperCase()}
          </Text>

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              ritmo {masterRock.rhythmStatus}
            </Text>
          </View>
        </View>

        {/* Título de la meta */}
        <Text style={styles.title} numberOfLines={3}>
          {masterRock.objective}
        </Text>

        {/* Barra de Avance */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${masterRock.progressPct}%` },
              ]}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.progressLabel}>
              {masterRock.progressPct}% del camino
            </Text>
            <Text style={styles.daysLabel}>
              {masterRock.daysRemaining} días restantes
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#0A0A0B",
    minHeight: 180,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#27272A",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  illustration: {
    position: "absolute",
    right: -12,
    top: -8,
    width: 170,
    height: 190,
  },
  content: {
    padding: 18,
    zIndex: 2,
    maxWidth: "80%",
  },
  headerStack: {
    marginBottom: 12,
    gap: 6,
  },
  eyebrow: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  statusText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    color: "#FFFFFF",
    marginBottom: 14,
  },
  progressContainer: {
    gap: 6,
  },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: "#F59E0B", // Gold
    borderRadius: 3,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  progressLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.65)",
  },
  daysLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.85)",
  },
});
