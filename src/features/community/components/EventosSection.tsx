import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MOCK_EVENTS, CommunityEvent } from "../data/communityMockData";

export const EventosSection: React.FC = () => {
  const [events, setEvents] = useState<CommunityEvent[]>(MOCK_EVENTS);
  const [selectedDay, setSelectedDay] = useState(24);

  const handleToggleRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isRsvp: !e.isRsvp,
              attendeesCount: e.isRsvp
                ? e.attendeesCount - 1
                : e.attendeesCount + 1,
            }
          : e
      )
    );
  };

  const days = [
    { day: "LUN", num: 21 },
    { day: "MAR", num: 22 },
    { day: "MIÉ", num: 23 },
    { day: "JUE", num: 24 },
    { day: "VIE", num: 25 },
    { day: "SÁB", num: 26 },
    { day: "DOM", num: 27 },
  ];

  return (
    <View style={styles.container}>
      {/* 1. Selector Semanal */}
      <View style={styles.weekSelector}>
        <Text style={styles.monthLabel}>OCTUBRE 2026</Text>
        <View style={styles.daysRow}>
          {days.map((d) => (
            <Pressable
              key={d.num}
              style={[
                styles.dayCol,
                selectedDay === d.num && styles.dayColActive,
              ]}
              onPress={() => setSelectedDay(d.num)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === d.num && styles.dayTextActive,
                ]}
              >
                {d.day}
              </Text>
              <Text
                style={[
                  styles.numText,
                  selectedDay === d.num && styles.numTextActive,
                ]}
              >
                {d.num}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* 2. Lista de Eventos */}
      <Text style={styles.sectionHeader}>Eventos del Programa</Text>

      {events.map((ev) => (
        <View key={ev.id} style={styles.eventCard}>
          {/* Badge En Vivo / Fecha */}
          <View style={styles.eventTopRow}>
            <Text style={styles.eventTime}>{ev.time}</Text>
            {ev.isLiveNow ? (
              <View style={styles.liveBadge}>
                <View style={styles.livePulseDot} />
                <Text style={styles.liveBadgeText}>EN VIVO AHORA</Text>
              </View>
            ) : (
              <View style={styles.upcomingBadge}>
                <Text style={styles.upcomingBadgeText}>PRÓXIMO</Text>
              </View>
            )}
          </View>

          {/* Título */}
          <Text style={styles.eventTitle}>{ev.title}</Text>

          {/* Mentor */}
          <View style={styles.mentorRow}>
            <Image
              source={{ uri: ev.mentorAvatar }}
              style={styles.eventMentorAvatar}
            />
            <View>
              <Text style={styles.eventMentorName}>{ev.mentor}</Text>
              <Text style={styles.eventMentorRole}>{ev.mentorRole}</Text>
            </View>
          </View>

          {/* Descripción */}
          <Text style={styles.eventDescription}>{ev.description}</Text>

          {/* Asistentes y CTA */}
          <View style={styles.eventFooter}>
            <Text style={styles.attendeesText}>
              👥 {ev.attendeesCount} guerreros asistiendo
            </Text>

            <Pressable
              style={[
                styles.rsvpBtn,
                ev.isRsvp ? styles.rsvpBtnActive : styles.rsvpBtnDefault,
              ]}
              onPress={() => handleToggleRsvp(ev.id)}
            >
              <Text
                style={[
                  styles.rsvpBtnText,
                  ev.isRsvp && styles.rsvpBtnTextActive,
                ]}
              >
                {ev.isLiveNow
                  ? "▶ Entrar al En Vivo"
                  : ev.isRsvp
                  ? "✓ Asistiendo"
                  : "+ Confirmar RSVP"}
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
  weekSelector: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.8,
    marginBottom: 12,
    textAlign: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCol: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  dayColActive: {
    backgroundColor: "#0052EA",
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  dayText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 4,
  },
  dayTextActive: {
    color: "#FFFFFF",
  },
  numText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  numTextActive: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  eventTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  eventTime: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  liveBadgeText: {
    fontSize: 10.5,
    fontWeight: "900",
    color: "#DC2626",
    letterSpacing: 0.4,
  },
  upcomingBadge: {
    backgroundColor: "rgba(0, 82, 234, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#0052EA",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 22,
    marginBottom: 12,
  },
  mentorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  eventMentorAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  eventMentorName: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  eventMentorRole: {
    fontSize: 11.5,
    color: "#64748B",
  },
  eventDescription: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 19,
    marginBottom: 14,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
  },
  attendeesText: {
    fontSize: 11.5,
    color: "#64748B",
    fontWeight: "500",
  },
  rsvpBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  rsvpBtnDefault: {
    backgroundColor: "#0052EA",
  },
  rsvpBtnActive: {
    backgroundColor: "rgba(0, 82, 234, 0.12)",
    borderWidth: 1,
    borderColor: "#0052EA",
  },
  rsvpBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  rsvpBtnTextActive: {
    color: "#0052EA",
  },
});
