import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = "¡Bienvenido de nuevo!",
  subtitle = "Ingresa para continuar tu desarrollo",
}) => {
  return (
    <View style={styles.container}>
      {/* Emblem Logo Container */}
      <View style={styles.logoBadge}>
        <View style={styles.outerGlowCircle}>
          <View style={styles.innerRing}>
            {/* Phoenix Silhouette Art */}
            <Text style={styles.phoenixGlyph}>🦅</Text>
          </View>
        </View>
      </View>

      {/* Brand Title */}
      <Text style={styles.brandTitle}>RENASER</Text>

      {/* Blue Electric Accent Divider */}
      <View style={styles.accentLine} />

      {/* Motto */}
      <View style={styles.mottoContainer}>
        <Text style={styles.mottoText}>
          DISCIPLINA · EVOLUCIÓN · TRANSFORMACIÓN
        </Text>
      </View>

      {/* Screen Title & Subtitle */}
      <View style={styles.headingBlock}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  logoBadge: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  outerGlowCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 1.5,
    borderColor: "#38BDF8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  innerRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: "rgba(248, 250, 252, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B132B",
  },
  phoenixGlyph: {
    fontSize: 34,
    color: "#F8FAFC",
    textAlign: "center",
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: "300",
    letterSpacing: 10,
    color: "#F8FAFC",
    paddingLeft: 10, // Compensate right letter-spacing
    textAlign: "center",
  },
  accentLine: {
    width: 44,
    height: 2,
    backgroundColor: "#3B82F6",
    borderRadius: 1,
    marginTop: 8,
    marginBottom: 10,
  },
  mottoContainer: {
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  mottoText: {
    fontSize: 9.5,
    fontWeight: "500",
    color: "#64748B",
    letterSpacing: 1.6,
    textAlign: "center",
    textTransform: "uppercase",
  },
  headingBlock: {
    alignItems: "center",
    marginTop: 4,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 13.5,
    fontWeight: "400",
    color: "#94A3B8",
    textAlign: "center",
  },
});
