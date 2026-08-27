import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MOCK_TESTIMONIALS, Testimonial } from "../data/communityMockData";

export const TestimoniosSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("Todos");
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(MOCK_TESTIMONIALS);

  const handlePraise = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              isPraised: !t.isPraised,
              praisesCount: t.isPraised
                ? t.praisesCount - 1
                : t.praisesCount + 1,
            }
          : t
      )
    );
  };

  const filteredTestimonials = testimonials.filter(
    (t) => filter === "Todos" || t.category === filter
  );

  return (
    <View style={styles.container}>
      {/* 1. Filtros por Categoría */}
      <View style={styles.filterRow}>
        {(["Todos", "Salud & Cuerpo", "Negocios", "Mentalidad"] as const).map(
          (f) => (
            <Pressable
              key={f}
              style={[styles.filterPill, filter === f && styles.filterPillActive]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  filter === f && styles.filterPillTextActive,
                ]}
              >
                {f}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* 2. Tarjetas de Transformación (Estilo Exacto del Mockup) */}
      {filteredTestimonials.map((item) => (
        <View key={item.id} style={styles.testimonialCard}>
          {/* Badge Dorado Central */}
          <View style={styles.goldBadgeWrapper}>
            <View style={styles.goldBadge}>
              <Text style={styles.goldBadgeText}>{item.category.toUpperCase()}</Text>
            </View>
          </View>

          {/* Comparativa Visual Antes / Después */}
          <View style={styles.comparisonRow}>
            {/* Lado Antes */}
            <View style={styles.sideCol}>
              <Text style={styles.stateLabel}>BEFORE</Text>
              <Text style={styles.personName}>{item.name.split(" ")[0]}</Text>
              <Text style={styles.dateLabel}>Nov 2023</Text>
              <Text style={styles.stateTag}>Tired, Unfit</Text>
            </View>

            {/* Avatar Antes */}
            <Image
              source={{ uri: item.beforeAvatar }}
              style={styles.avatarBefore}
            />

            {/* Avatar Después */}
            <Image
              source={{ uri: item.afterAvatar }}
              style={styles.avatarAfter}
            />

            {/* Lado Después */}
            <View style={styles.sideCol}>
              <Text style={styles.stateLabelActive}>AFTER</Text>
              <Text style={styles.personName}>{item.name.split(" ")[0]}</Text>
              <Text style={styles.dateLabel}>Mar 2024</Text>
              <Text style={styles.stateTagActive}>Confident, Fit</Text>
            </View>
          </View>

          {/* Título Principal de la Transformación */}
          <Text style={styles.headlineText}>{item.headline}</Text>
          <Text style={styles.metricsText}>{item.afterStats}</Text>

          {/* Cita */}
          <Text style={styles.quoteText}>"{item.quote}"</Text>
          <Text style={styles.authorLocation}>
            '{item.name} - {item.city}'
          </Text>

          {/* Sello de Endorsement */}
          <View style={styles.sealRow}>
            <Text style={styles.sealIcon}>🏅</Text>
            <View>
              <Text style={styles.sealTitle}>MENTOR ENDORSEMENT</Text>
              <Text style={styles.sealSubtitle}>ELEVATE CERTIFIED</Text>
            </View>
          </View>

          {/* Footer de Elogios */}
          <View style={styles.cardFooter}>
            <View style={styles.praiseCountCol}>
              <Text style={styles.praiseHeart}>💛</Text>
              <Text style={styles.praiseNumber}>
                {item.praisesCount} Praises
              </Text>
            </View>

            <Pressable
              style={[
                styles.praiseBtn,
                item.isPraised && styles.praiseBtnActive,
              ]}
              onPress={() => handlePraise(item.id)}
            >
              <Text style={styles.praiseBtnHeart}>💙</Text>
              <Text style={styles.praiseBtnText}>
                {item.isPraised ? "Praised!" : "Praise Her Story"}
              </Text>
            </Pressable>
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterPillActive: {
    backgroundColor: "#0052EA",
    borderColor: "#0052EA",
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  testimonialCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    position: "relative",
  },
  goldBadgeWrapper: {
    alignItems: "center",
    marginBottom: 14,
    marginTop: -4,
  },
  goldBadge: {
    backgroundColor: "#D97706",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  goldBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.6,
  },
  comparisonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sideCol: {
    alignItems: "center",
    width: 68,
  },
  stateLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.2,
  },
  stateLabelActive: {
    fontSize: 11,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: 0.2,
  },
  personName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  dateLabel: {
    fontSize: 9.5,
    color: "#64748B",
  },
  stateTag: {
    fontSize: 9.5,
    color: "#94A3B8",
    marginTop: 1,
  },
  stateTagActive: {
    fontSize: 9.5,
    fontWeight: "600",
    color: "#0052EA",
    marginTop: 1,
  },
  avatarBefore: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  avatarAfter: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#00E5FF",
  },
  headlineText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 2,
  },
  metricsText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0052EA",
    textAlign: "center",
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 13,
    color: "#334155",
    lineHeight: 19,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  authorLocation: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
  },
  sealRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(217, 119, 6, 0.08)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  sealIcon: {
    fontSize: 20,
  },
  sealTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#D97706",
    letterSpacing: 0.5,
  },
  sealSubtitle: {
    fontSize: 9,
    fontWeight: "700",
    color: "#B45309",
    letterSpacing: 0.3,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },
  praiseCountCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  praiseHeart: {
    fontSize: 14,
  },
  praiseNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  praiseBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(0, 82, 234, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(0, 82, 234, 0.25)",
  },
  praiseBtnActive: {
    backgroundColor: "#0052EA",
    borderColor: "#0052EA",
  },
  praiseBtnHeart: {
    fontSize: 12,
  },
  praiseBtnText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0052EA",
  },
});
