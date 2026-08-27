import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MOCK_CELL_MEMBERS } from "../data/communityMockData";

interface CelulaSectionProps {
  onOpenChat: () => void;
}

export const CelulaSection: React.FC<CelulaSectionProps> = ({ onOpenChat }) => {
  return (
    <View style={styles.container}>
      {/* 1. Tarjeta Principal: Célula Fénix 04 & Coherencia */}
      <View style={styles.mainCellCard}>
        <Text style={styles.cellTitle}>CÉLULA FÉNIX 04</Text>

        <View style={styles.coherenceRow}>
          {/* Anillo de Coherencia 89% */}
          <View style={styles.ringWrapper}>
            <Svg width={90} height={90} viewBox="0 0 100 100">
              {/* Círculo base */}
              <Circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E2E8F0"
                strokeWidth="8"
                fill="none"
              />
              {/* Círculo progreso 89% (perímetro = 251.2, dashoffset = 27.6) */}
              <Circle
                cx="50"
                cy="50"
                r="40"
                stroke="#0052EA"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="27.6"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90 50 50)"
              />
            </Svg>
            <View style={styles.ringCenterText}>
              <Text style={styles.ringPercent}>89%</Text>
              <Text style={styles.ringLabel}>COHERENCIA</Text>
            </View>
          </View>

          {/* Mentor Asignado */}
          <View style={styles.mentorInfo}>
            <View style={styles.mentorAvatarWrapper}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
                }}
                style={styles.mentorAvatar}
              />
              <Text style={styles.mentorCrown}>👑</Text>
            </View>
            <Text style={styles.mentorRoleLabel}>MENTOR ASIGNADO</Text>
            <Text style={styles.mentorName}>Elara Vance</Text>
          </View>
        </View>

        {/* Botón Chat de Célula */}
        <Pressable style={styles.cellChatBtn} onPress={onOpenChat}>
          <Text style={styles.cellChatBtnText}>💬 Abrir Chat de Célula (5)</Text>
        </Pressable>
      </View>

      {/* 2. Cuadrícula de los 10 Guerreros */}
      <Text style={styles.gridTitle}>Los 10 Guerreros de tu Célula</Text>
      <View style={styles.membersGrid}>
        {MOCK_CELL_MEMBERS.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberAvatarContainer}>
              <Image
                source={{ uri: member.avatar }}
                style={styles.memberAvatar}
              />
              {member.todayHabitsDone && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={styles.memberName} numberOfLines={1}>
              {member.name}
            </Text>
            <Text style={styles.memberStreak}>🔥 {member.streakDays}d</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  mainCellCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.2,
    borderColor: "rgba(226, 232, 240, 0.9)",
    marginBottom: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  cellTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 16,
  },
  coherenceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 18,
  },
  ringWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  ringCenterText: {
    position: "absolute",
    alignItems: "center",
  },
  ringPercent: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0052EA",
  },
  ringLabel: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  mentorInfo: {
    alignItems: "center",
  },
  mentorAvatarWrapper: {
    position: "relative",
    marginBottom: 6,
  },
  mentorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#F59E0B",
  },
  mentorCrown: {
    position: "absolute",
    bottom: -4,
    right: -4,
    fontSize: 14,
  },
  mentorRoleLabel: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#D97706",
    letterSpacing: 0.5,
  },
  mentorName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },
  cellChatBtn: {
    backgroundColor: "#0052EA",
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cellChatBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  membersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  memberCard: {
    width: "18%",
    alignItems: "center",
    marginBottom: 8,
  },
  memberAvatarContainer: {
    position: "relative",
    marginBottom: 4,
  },
  memberAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  checkBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  checkText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  memberName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334155",
  },
  memberStreak: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 1,
  },
});
