import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface RequestAccessCardProps {
  onRequestPress?: () => void;
}

export const RequestAccessCard: React.FC<RequestAccessCardProps> = ({
  onRequestPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerQuestion}>¿Todavía no eres aprendiz?</Text>

      <Pressable
        onPress={onRequestPress}
        style={({ pressed }) => [
          styles.cardButton,
          pressed && styles.cardButtonPressed,
        ]}
      >
        <View style={styles.iconWrapper}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M19 8v6M22 11h-6"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <Text style={styles.buttonText}>Solicitar mi lugar</Text>
      </Pressable>

      <View style={styles.badgeRow}>
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="m9 12 2 2 4-4"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={styles.badgeText}>
          Cada solicitud la revisa un administrador.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  headerQuestion: {
    fontSize: 13.5,
    color: "#94A3B8",
    fontWeight: "400",
    marginBottom: 12,
    textAlign: "center",
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B132B", // Subtle dark navy glass
    borderWidth: 1.2,
    borderColor: "#1D283A",
    borderRadius: 14,
    height: 50,
    width: "100%",
    gap: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  cardButtonPressed: {
    backgroundColor: "#111C3D",
    borderColor: "#2563EB",
    transform: [{ scale: 0.99 }],
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#F8FAFC",
    letterSpacing: 0.2,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  badgeText: {
    fontSize: 11.5,
    color: "#64748B",
    fontWeight: "400",
  },
});
