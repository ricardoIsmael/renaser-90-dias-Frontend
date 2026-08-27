import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MOCK_COURSES, CourseModule } from "../data/communityMockData";

export const CursosSection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 1. Banner de Lección del Día */}
      <View style={styles.featuredCard}>
        <View style={styles.featuredTag}>
          <Text style={styles.featuredTagText}>LECCIÓN RECOMENDADA DE HOY</Text>
        </View>
        <Text style={styles.featuredTitle}>
          Día 14: La Alquimia del Sueño y Rituales Nocturnos
        </Text>
        <Text style={styles.featuredMeta}>Módulo 2 • 18 min de video</Text>

        <Pressable style={styles.playButton}>
          <Text style={styles.playButtonText}>▶ Reproducir Clase</Text>
        </Pressable>
      </View>

      {/* 2. Catálogo de Cursos / Módulos */}
      <Text style={styles.sectionHeader}>Módulos del Programa (Skool)</Text>

      {MOCK_COURSES.map((course) => (
        <View key={course.id} style={styles.courseCard}>
          <Image
            source={{ uri: course.thumbnail }}
            style={styles.courseThumbnail}
          />
          <View style={styles.courseContent}>
            <View style={styles.courseTopRow}>
              <Text style={styles.courseCategory}>{course.category}</Text>
              {course.isCompleted && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>✓ Completado</Text>
                </View>
              )}
            </View>

            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseMeta}>
              {course.lessonsCount} lecciones • {course.duration}
            </Text>

            {/* Barra de Progreso */}
            <View style={styles.progressRow}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${course.progress}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressPercent}>{course.progress}%</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  featuredCard: {
    backgroundColor: "#0052EA",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  featuredTag: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  featuredTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 23,
    marginBottom: 6,
  },
  featuredMeta: {
    fontSize: 12.5,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 16,
  },
  playButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  playButtonText: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#0052EA",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  courseThumbnail: {
    width: "100%",
    height: 120,
  },
  courseContent: {
    padding: 16,
  },
  courseTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  courseCategory: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0052EA",
    textTransform: "uppercase",
  },
  completedBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  completedText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#10B981",
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  courseMeta: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0052EA",
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    width: 32,
    textAlign: "right",
  },
});
