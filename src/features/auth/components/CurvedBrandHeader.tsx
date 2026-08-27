import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CurvedBrandHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Título RENASER centrado en línea recta sin media luna */}
      <Text style={styles.title}>RENASER</Text>
      {/* Subtítulo en Español */}
      <Text style={styles.subtitle}>Eleva Tu Camino.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: -2,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 5.5,
    color: "#0B132B", // Deep Obsidian Navy
    textAlign: "center",
    paddingLeft: 5.5, // Balance letter spacing
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569", // Slate 600
    letterSpacing: 0.4,
    textAlign: "center",
    marginTop: 4,
  },
});
