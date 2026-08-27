import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export const WeeklyDayPicker: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(14);

  const weekDays = [
    { day: "LUN", num: 14, completed: true, isToday: true },
    { day: "MAR", num: 15, completed: true, isToday: false },
    { day: "MIÉ", num: 16, completed: true, isToday: false },
    { day: "JUE", num: 17, completed: false, isToday: false },
    { day: "VIE", num: 18, completed: false, isToday: false },
    { day: "SÁB", num: 19, completed: false, isToday: false },
    { day: "DOM", num: 20, completed: false, isToday: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.daysRow}>
        {weekDays.map((item) => {
          const isSelected = selectedDay === item.num;
          return (
            <Pressable
              key={item.num}
              style={[styles.dayPill, isSelected && styles.dayPillSelected]}
              onPress={() => setSelectedDay(item.num)}
            >
              <Text
                style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}
              >
                {item.day}
              </Text>
              <Text
                style={[styles.numLabel, isSelected && styles.numLabelSelected]}
              >
                {item.num}
              </Text>
              <View
                style={[
                  styles.statusDot,
                  item.completed
                    ? isSelected
                      ? styles.dotCompletedSelected
                      : styles.dotCompleted
                    : styles.dotPending,
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayPill: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 14,
    width: "13%",
  },
  dayPillSelected: {
    backgroundColor: "#0052EA",
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 2,
  },
  dayLabelSelected: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  numLabel: {
    fontSize: 14.5,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  numLabelSelected: {
    color: "#FFFFFF",
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dotCompleted: {
    backgroundColor: "#10B981",
  },
  dotCompletedSelected: {
    backgroundColor: "#00E5FF",
  },
  dotPending: {
    backgroundColor: "#CBD5E1",
  },
});
