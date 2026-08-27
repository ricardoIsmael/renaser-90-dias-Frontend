import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import {
  GoalAxis,
  AXIS_LABEL,
  AxisIconSvg,
} from "./AxisIcon";
import {
  INITIAL_MASTER_ROCKS,
  INITIAL_WEEKLY_ROCKS,
  INITIAL_TODAY_ROCKS,
  RockItem,
} from "../data/objetivosMockData";
import { TodayProgressPanoramaCard } from "./TodayProgressPanoramaCard";
import { MasterObjectiveCard } from "./MasterObjectiveCard";
import { WeeklyRockCard } from "./WeeklyRockCard";
import { RockCard } from "./RockCard";
import { ModoMonjeModal } from "./ModoMonjeModal";
import { LogEvidenceModal } from "@/features/habits/components/LogEvidenceModal";

export const ObjetivosScreen: React.FC = () => {
  const [selectedAxis, setSelectedAxis] = useState<GoalAxis>("BODY");
  const [todayRocks, setTodayRocks] =
    useState<RockItem[]>(INITIAL_TODAY_ROCKS);
  const [monjeRock, setMonjeRock] = useState<RockItem | null>(null);
  const [evidenceRock, setEvidenceRock] = useState<RockItem | null>(null);

  const masterRock = INITIAL_MASTER_ROCKS[selectedAxis];
  const weeklyRock = INITIAL_WEEKLY_ROCKS[selectedAxis];
  const axisRocks = todayRocks.filter((r) => r.goalAxis === selectedAxis);

  const completedTotal = todayRocks.filter((r) => r.completed).length;
  const totalRocks = todayRocks.length;

  const handleToggleRock = (id: string) => {
    setTodayRocks((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              completed: !r.completed,
              completedAt: !r.completed ? "Ahora" : undefined,
            }
          : r
      )
    );
  };

  const handleSaveEvidence = (rockId: string) => {
    setTodayRocks((prev) =>
      prev.map((r) =>
        r.id === rockId
          ? {
              ...r,
              completed: true,
              completedAt: "Ahora",
            }
          : r
      )
    );
  };

  const axes: GoalAxis[] = ["BODY", "WORK", "RELATIONSHIPS"];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header Superior */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>
            Día 14 de 90 · miércoles
          </Text>
          <View style={styles.titleRow}>
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <Path
                d="M8 3l4 8 5-5 5 15H2L8 3z"
                stroke="#F59E0B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.headerTitle}>Tus Objetivos</Text>
          </View>
        </View>

        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>Día 14 / 90</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Tarjeta Panorama con ROCAS.png */}
        <TodayProgressPanoramaCard
          completedCount={completedTotal}
          totalCount={totalRocks}
        />

        {/* 2. Pestañas de Ejes (Salud / Dinero / Relaciones) */}
        <View style={styles.axisTabsRow}>
          {axes.map((axis) => {
            const isActive = selectedAxis === axis;
            const count = todayRocks.filter((r) => r.goalAxis === axis).length;
            return (
              <Pressable
                key={axis}
                style={[styles.axisTab, isActive && styles.axisTabActive]}
                onPress={() => setSelectedAxis(axis)}
              >
                <AxisIconSvg
                  axis={axis}
                  size={18}
                  color={isActive ? "#0052EA" : "#64748B"}
                />
                <View style={styles.tabTextGroup}>
                  <Text
                    style={[
                      styles.axisTabLabel,
                      isActive && styles.axisTabLabelActive,
                    ]}
                  >
                    {AXIS_LABEL[axis]}
                  </Text>
                  <View
                    style={[
                      styles.countChip,
                      isActive && styles.countChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.countChipText,
                        isActive && styles.countChipTextActive,
                      ]}
                    >
                      {count}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* 3. Tarjeta de Objetivo Maestro Trimestral con Ilustración Real */}
        <MasterObjectiveCard masterRock={masterRock} />

        {/* 4. Tarjeta de Objetivo Semanal con Cuadrícula de 7 Días */}
        <WeeklyRockCard weeklyRock={weeklyRock} />

        {/* 5. Lista de Objetivos de Hoy para el Eje Seleccionado */}
        <Text style={styles.sectionHeader}>
          Objetivos de Hoy · {AXIS_LABEL[selectedAxis]}
        </Text>

        {axisRocks.map((rock) => (
          <RockCard
            key={rock.id}
            rock={rock}
            onToggle={handleToggleRock}
            onLogEvidence={setEvidenceRock}
            onStartMonje={setMonjeRock}
          />
        ))}
      </ScrollView>

      {/* Modal Modo Monje */}
      <ModoMonjeModal
        rock={monjeRock}
        visible={Boolean(monjeRock)}
        onClose={() => setMonjeRock(null)}
      />

      {/* Modal Registrar Evidencia */}
      <LogEvidenceModal
        habit={
          evidenceRock
            ? {
                id: evidenceRock.id,
                title: evidenceRock.title,
                category: AXIS_LABEL[evidenceRock.goalAxis],
                time: evidenceRock.startTime,
                completed: evidenceRock.completed,
                streak: 14,
              }
            : null
        }
        visible={Boolean(evidenceRock)}
        onClose={() => setEvidenceRock(null)}
        onSave={handleSaveEvidence}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  greetingText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#64748B",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  dayBadge: {
    backgroundColor: "rgba(0, 82, 234, 0.08)",
    borderWidth: 1.2,
    borderColor: "rgba(0, 82, 234, 0.25)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dayBadgeText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#0052EA",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 110, // Liquid tab bar padding
  },
  axisTabsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  axisTab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  axisTabActive: {
    borderColor: "#0052EA",
    borderWidth: 1.5,
  },
  tabTextGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  axisTabLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  axisTabLabelActive: {
    color: "#0052EA",
    fontWeight: "700",
  },
  countChip: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  countChipActive: {
    backgroundColor: "#0052EA",
  },
  countChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
  },
  countChipTextActive: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
    marginTop: 4,
  },
});
