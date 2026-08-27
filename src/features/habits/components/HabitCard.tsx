import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CategorizedHabit } from "../data/habitsMockData";

interface HabitCardProps {
  habit: CategorizedHabit;
  onToggle: (id: string) => void;
  onLogEvidence: (habit: CategorizedHabit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggle,
  onLogEvidence,
}) => {
  return (
    <Pressable
      style={[
        styles.card,
        habit.completed && styles.cardCompleted,
      ]}
      onPress={() => onToggle(habit.id)}
    >
      <View style={styles.leftCol}>
        {/* Status Icon Box */}
        <View
          style={[
            styles.statusIconBox,
            habit.completed
              ? styles.statusIconBoxCompleted
              : styles.statusIconBoxPending,
          ]}
        >
          {habit.completed ? (
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M20 6L9 17l-5-5"
                stroke="#10B981"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2v10l4 2"
                stroke="#D97706"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
                stroke="#D97706"
                strokeWidth="2.2"
              />
            </Svg>
          )}
        </View>

        {/* Text Group */}
        <View style={styles.textGroup}>
          <Text
            style={[
              styles.title,
              habit.completed && styles.titleCompleted,
            ]}
            numberOfLines={1}
          >
            {habit.title}
          </Text>

          <Text style={styles.timeWindow}>{habit.timeWindow}</Text>
        </View>
      </View>

      {/* Right Column Action */}
      <View style={styles.rightCol}>
        {habit.completed ? (
          <View style={styles.pointsChip}>
            <Text style={styles.pointsText}>+{habit.points} pts</Text>
          </View>
        ) : (
          <Pressable
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              onLogEvidence(habit);
            }}
          >
            <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.actionButtonText}>Cumplir</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    padding: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardCompleted: {
    borderColor: "rgba(16, 185, 129, 0.35)",
    backgroundColor: "rgba(16, 185, 129, 0.04)",
  },
  leftCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  statusIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusIconBoxCompleted: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
  },
  statusIconBoxPending: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },
  timeWindow: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
  rightCol: {
    marginLeft: 8,
  },
  pointsChip: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pointsText: {
    color: "#059669",
    fontSize: 11.5,
    fontWeight: "700",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F59E0B", // Gold
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#0F172A",
  },
});
