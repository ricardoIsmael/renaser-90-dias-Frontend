import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  INITIAL_CATEGORIZED_HABITS,
  CategorizedHabit,
} from "../data/habitsMockData";
import { HabitsCoherenceRing } from "./HabitsCoherenceRing";
import { WeeklyDayPicker } from "./WeeklyDayPicker";
import { CategoryCover } from "./CategoryCover";
import { HabitCard } from "./HabitCard";
import { LogEvidenceModal } from "./LogEvidenceModal";

export const HabitsScreen: React.FC = () => {
  const router = useRouter();
  const [habits, setHabits] = useState<CategorizedHabit[]>(
    INITIAL_CATEGORIZED_HABITS
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    BODY: true,
    MIND: true,
    CONSCIENCE: true,
    SPIRIT: false,
  });
  const [selectedHabitForEvidence, setSelectedHabitForEvidence] =
    useState<CategorizedHabit | null>(null);

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completed: !h.completed,
              completedAt: !h.completed ? "Ahora" : undefined,
              streak: !h.completed ? h.streak + 1 : Math.max(0, h.streak - 1),
            }
          : h
      )
    );
  };

  const handleSaveEvidence = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? {
              ...h,
              completed: true,
              completedAt: "Ahora",
              streak: h.streak + 1,
            }
          : h
      )
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const totalCount = habits.length;

  const getCategoryHabits = (key: string) =>
    habits.filter((h) => h.categoryKey === key);

  const getCategoryStats = (key: string) => {
    const catHabits = getCategoryHabits(key);
    const hechos = catHabits.filter((h) => h.completed).length;
    return { hechos, total: catHabits.length };
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header Superior */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>¡Vamos Isabella! 🔥</Text>
          <Text style={styles.headerTitle}>Hábitos de Hoy</Text>
        </View>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>Día 14 / 90</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Anillo de Coherencia Diaria */}
        <HabitsCoherenceRing
          completedCount={completedCount}
          totalCount={totalCount}
        />

        {/* 2. Selector Semanal de 7 Días */}
        <WeeklyDayPicker />

        {/* 3. Desplegables de Portada por Categoría */}

        {/* CUERPO (BODY) */}
        <CategoryCover
          categoriaKey="BODY"
          label="Cuerpo"
          iconType="cuerpo"
          hechos={getCategoryStats("BODY").hechos}
          total={getCategoryStats("BODY").total}
          abierta={expandedCategories.BODY}
          onToggle={() => toggleCategory("BODY")}
          siguiente={
            getCategoryHabits("BODY").find((h) => !h.completed)?.title ?? null
          }
        >
          {getCategoryHabits("BODY").map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={handleToggleHabit}
              onLogEvidence={setSelectedHabitForEvidence}
            />
          ))}
        </CategoryCover>

        {/* MENTE (MIND) */}
        <CategoryCover
          categoriaKey="MIND"
          label="Mente"
          iconType="mente"
          hechos={getCategoryStats("MIND").hechos}
          total={getCategoryStats("MIND").total}
          abierta={expandedCategories.MIND}
          onToggle={() => toggleCategory("MIND")}
          siguiente={
            getCategoryHabits("MIND").find((h) => !h.completed)?.title ?? null
          }
        >
          {getCategoryHabits("MIND").map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={handleToggleHabit}
              onLogEvidence={setSelectedHabitForEvidence}
            />
          ))}
        </CategoryCover>

        {/* EMOCIONES (CONSCIENCE) */}
        <CategoryCover
          categoriaKey="CONSCIENCE"
          label="Emociones"
          iconType="emociones"
          hechos={getCategoryStats("CONSCIENCE").hechos}
          total={getCategoryStats("CONSCIENCE").total}
          abierta={expandedCategories.CONSCIENCE}
          onToggle={() => toggleCategory("CONSCIENCE")}
          siguiente={
            getCategoryHabits("CONSCIENCE").find((h) => !h.completed)?.title ??
            null
          }
        >
          {getCategoryHabits("CONSCIENCE").map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={handleToggleHabit}
              onLogEvidence={setSelectedHabitForEvidence}
            />
          ))}
        </CategoryCover>

        {/* ESPÍRITU (SPIRIT) */}
        <CategoryCover
          categoriaKey="SPIRIT"
          label="Espíritu"
          iconType="espiritu"
          hechos={getCategoryStats("SPIRIT").hechos}
          total={getCategoryStats("SPIRIT").total}
          abierta={expandedCategories.SPIRIT}
          onToggle={() => toggleCategory("SPIRIT")}
          siguiente={
            getCategoryHabits("SPIRIT").find((h) => !h.completed)?.title ?? null
          }
        >
          {getCategoryHabits("SPIRIT").map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={handleToggleHabit}
              onLogEvidence={setSelectedHabitForEvidence}
            />
          ))}
        </CategoryCover>

        {/* VIDA Y NEGOCIOS (ROCAS / OBJETIVOS - Modo Navegación) */}
        <CategoryCover
          categoriaKey="ROCAS"
          label="Vida y Negocios"
          iconType="negocio"
          modo="navegacion"
          pie="3 Objetivos trimestrales activos · Toca para abrir"
          onPress={() => router.push("/(tabs)/rocas")}
        />
      </ScrollView>

      {/* Modal de Registro de Evidencia */}
      <LogEvidenceModal
        habit={
          selectedHabitForEvidence
            ? {
                id: selectedHabitForEvidence.id,
                title: selectedHabitForEvidence.title,
                category:
                  selectedHabitForEvidence.categoryLabel as any,
                time: selectedHabitForEvidence.timeWindow,
                completed: selectedHabitForEvidence.completed,
                streak: selectedHabitForEvidence.streak,
              }
            : null
        }
        visible={Boolean(selectedHabitForEvidence)}
        onClose={() => setSelectedHabitForEvidence(null)}
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
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginTop: 2,
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
    paddingBottom: 110, // Margin for floating liquid tab bar
  },
});
