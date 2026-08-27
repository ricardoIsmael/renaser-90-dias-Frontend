import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  AXIS_LABEL,
  AxisBadge,
  ParetoDot,
} from "./AxisIcon";
import { RockItem } from "../data/objetivosMockData";

interface RockCardProps {
  rock: RockItem;
  onToggle: (id: string) => void;
  onLogEvidence: (rock: RockItem) => void;
  onStartMonje: (rock: RockItem) => void;
}

export const RockCard: React.FC<RockCardProps> = ({
  rock,
  onToggle,
  onLogEvidence,
  onStartMonje,
}) => {
  if (rock.completed) {
    return (
      <Pressable
        style={[styles.card, styles.cardCompleted]}
        onPress={() => onToggle(rock.id)}
      >
        <View style={styles.topRow}>
          <AxisBadge axis={rock.goalAxis} size={32} />
          <View style={styles.infoCol}>
            <View style={styles.axisPillRow}>
              <ParetoDot pareto={rock.paretoColor} size={6} />
              <Text style={styles.axisSubtext}>
                {AXIS_LABEL[rock.goalAxis].toUpperCase()} · OBJETIVO {rock.position}
              </Text>
            </View>

            <Text style={styles.completedTitle} numberOfLines={1}>
              {rock.title}
            </Text>
            <Text style={styles.completedTime}>
              Completada{rock.completedAt ? ` a las ${rock.completedAt}` : ""}
            </Text>
          </View>

          <View style={styles.doneCheckCircle}>
            <Text style={styles.doneCheckText}>✓</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, rock.isNow && styles.cardNow]}>
      <View style={styles.topRow}>
        <AxisBadge axis={rock.goalAxis} size={34} glow={rock.isNow} />
        <View style={styles.infoCol}>
          <View style={styles.axisPillRow}>
            <ParetoDot pareto={rock.paretoColor} size={6} />
            <Text style={styles.axisSubtext}>
              {AXIS_LABEL[rock.goalAxis].toUpperCase()} · OBJETIVO {rock.position}
            </Text>
          </View>

          <Text style={styles.title}>{rock.title}</Text>
          {rock.weeklyRockTitle && (
            <Text style={styles.weeklySubtext}>↳ {rock.weeklyRockTitle}</Text>
          )}

          <View style={styles.timeRow}>
            <Text
              style={[
                styles.timeText,
                rock.isNow && styles.timeTextNow,
              ]}
            >
              🕒 {rock.startTime} – {rock.endTime}
              {rock.isNow ? " · ahora" : ""}
            </Text>
          </View>
        </View>

        {rock.isNow && (
          <View style={styles.nowBadge}>
            <Text style={styles.nowBadgeText}>AHORA</Text>
          </View>
        )}
      </View>

      {/* Acciones */}
      <View style={styles.actionRow}>
        {rock.isFuture ? (
          <View style={styles.futureContainer}>
            <Text style={styles.futureText}>
              Se activa a las {rock.startTime}
            </Text>
          </View>
        ) : (
          <View style={styles.activeBtnGroup}>
            <Pressable
              style={styles.evidenceBtn}
              onPress={() => onLogEvidence(rock)}
            >
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                  stroke="#0F172A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  stroke="#0F172A"
                  strokeWidth="2.2"
                />
              </Svg>
              <Text style={styles.evidenceBtnText}>Registrar evidencia</Text>
            </Pressable>

            <Pressable
              style={styles.monjeBtn}
              onPress={() => onStartMonje(rock)}
            >
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  stroke="#64748B"
                  strokeWidth="2"
                />
              </Svg>
              <Text style={styles.monjeBtnText}>Monje</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardNow: {
    borderColor: "#0052EA",
    borderWidth: 1.5,
  },
  cardCompleted: {
    backgroundColor: "#F8FAFC",
    borderColor: "rgba(16, 185, 129, 0.35)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoCol: {
    flex: 1,
  },
  axisPillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 3,
  },
  axisSubtext: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#64748B",
  },
  title: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 20,
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
    textDecorationLine: "line-through",
  },
  completedTime: {
    fontSize: 11.5,
    color: "#94A3B8",
    marginTop: 2,
  },
  weeklySubtext: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeText: {
    fontSize: 11.5,
    color: "#64748B",
  },
  timeTextNow: {
    fontWeight: "700",
    color: "#0052EA",
  },
  nowBadge: {
    backgroundColor: "#0052EA",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  nowBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#FFFFFF",
  },
  doneCheckCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  doneCheckText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#10B981",
  },
  actionRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  futureContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  futureText: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#64748B",
  },
  activeBtnGroup: {
    flexDirection: "row",
    gap: 8,
  },
  evidenceBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#F59E0B", // Gold
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  evidenceBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },
  monjeBtn: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  monjeBtnText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#64748B",
  },
});
