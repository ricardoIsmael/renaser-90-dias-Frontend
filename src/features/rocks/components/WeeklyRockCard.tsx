import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { WeeklyRock } from "../data/objetivosMockData";

interface WeeklyRockCardProps {
  weeklyRock: WeeklyRock;
}

export const WeeklyRockCard: React.FC<WeeklyRockCardProps> = ({
  weeklyRock,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>OBJETIVO SEMANAL</Text>
        <Text style={styles.countText}>
          {weeklyRock.completedCount} de {weeklyRock.totalCount}
        </Text>
      </View>

      <Text style={styles.title}>{weeklyRock.title}</Text>

      {/* Cuadrícula de 7 días */}
      <View style={styles.gridRow}>
        {weeklyRock.weekDays.map((item, index) => (
          <View key={index} style={styles.dayCol}>
            <Text
              style={[
                styles.dayLabel,
                item.isToday && styles.dayLabelToday,
              ]}
            >
              {item.day}
            </Text>
            <View
              style={[
                styles.dayBox,
                item.completed && styles.dayBoxCompleted,
                item.isToday && !item.completed && styles.dayBoxToday,
              ]}
            >
              {item.completed && <Text style={styles.checkIcon}>✓</Text>}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#64748B",
  },
  countText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  title: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 20,
    marginBottom: 14,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCol: {
    alignItems: "center",
    width: "12%",
  },
  dayLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 4,
  },
  dayLabelToday: {
    color: "#0052EA",
  },
  dayBox: {
    width: "100%",
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  dayBoxCompleted: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "#10B981",
  },
  dayBoxToday: {
    backgroundColor: "rgba(0, 82, 234, 0.08)",
    borderColor: "#0052EA",
    borderWidth: 1.5,
  },
  checkIcon: {
    fontSize: 12,
    fontWeight: "800",
    color: "#10B981",
  },
});
