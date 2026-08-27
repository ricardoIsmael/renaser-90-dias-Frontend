import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
} from "react-native-svg";
import {
  MOCK_PODIUM_USERS,
  MOCK_CURRENT_USER_RANK,
  MOCK_RANKING_LIST,
  RankingUser,
} from "../data/communityMockData";

export const RankingSection: React.FC = () => {
  const [filter, setFilter] = useState<"Plataforma" | "Mi Célula" | "Hábitos">(
    "Plataforma"
  );

  const top1 = MOCK_PODIUM_USERS[0];
  const top2 = MOCK_PODIUM_USERS[1];
  const top3 = MOCK_PODIUM_USERS[2];

  return (
    <View style={styles.container}>
      {/* 1. Podio 3D Escultural Top 3 (Renderizado Nativo de Alto Impacto) */}
      <View style={styles.podiumStageCard}>
        <View style={styles.podiumStageRow}>
          {/* 🥈 2DO PUESTO (Plata Cromada) */}
          <View style={[styles.podiumCol, styles.colSilver]}>
            <View style={styles.avatarHolder}>
              <View style={[styles.haloRing, styles.silverRing]}>
                <Image
                  source={{ uri: top2.avatar }}
                  style={styles.podiumAvatar}
                />
              </View>
              <Text style={styles.crownEmoji}>👑</Text>
            </View>

            <Text style={styles.warriorName} numberOfLines={1}>
              {top2.name}
            </Text>
            <Text style={styles.warriorPts}>{top2.points} pts</Text>
            <Text style={styles.warriorBadge}>{top2.tier}</Text>

            {/* Pedestal Cilíndrico 3D Plata */}
            <View style={[styles.pedestalBlock, styles.pedestalSilver]}>
              <View style={styles.pedestalCapSilver} />
              <Text style={styles.pedestalNumberSilver}>#2</Text>
            </View>
          </View>

          {/* 🥇 1ER PUESTO (Oro Real, Elevado al Centro) */}
          <View style={[styles.podiumCol, styles.colGold]}>
            <View style={styles.avatarHolder}>
              <View style={[styles.haloRing, styles.goldRing]}>
                <Image
                  source={{ uri: top1.avatar }}
                  style={styles.podiumAvatarGold}
                />
              </View>
              <Text style={styles.crownEmojiGold}>👑</Text>
            </View>

            <Text style={styles.warriorNameGold} numberOfLines={1}>
              {top1.name}
            </Text>
            <Text style={styles.warriorPtsGold}>{top1.points} pts</Text>
            <View style={styles.eliteBadgePill}>
              <Text style={styles.eliteBadgeText}>{top1.tier}</Text>
            </View>

            {/* Pedestal Cilíndrico 3D Oro */}
            <View style={[styles.pedestalBlock, styles.pedestalGold]}>
              <View style={styles.pedestalCapGold} />
              <Text style={styles.pedestalNumberGold}>#1</Text>
            </View>
          </View>

          {/* 🥉 3ER PUESTO (Bronce Pulido) */}
          <View style={[styles.podiumCol, styles.colBronze]}>
            <View style={styles.avatarHolder}>
              <View style={[styles.haloRing, styles.bronzeRing]}>
                <Image
                  source={{ uri: top3.avatar }}
                  style={styles.podiumAvatar}
                />
              </View>
              <Text style={styles.crownEmoji}>👑</Text>
            </View>

            <Text style={styles.warriorName} numberOfLines={1}>
              {top3.name}
            </Text>
            <Text style={styles.warriorPts}>{top3.points} pts</Text>
            <Text style={styles.warriorBadge}>{top3.tier}</Text>

            {/* Pedestal Cilíndrico 3D Bronce */}
            <View style={[styles.pedestalBlock, styles.pedestalBronze]}>
              <View style={styles.pedestalCapBronze} />
              <Text style={styles.pedestalNumberBronze}>#3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. Filtros de Ranking */}
      <View style={styles.filterRow}>
        {(["Plataforma", "Mi Célula", "Hábitos"] as const).map((f) => (
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
        ))}
      </View>

      {/* 3. Tarjeta Fija del Usuario Actual (#4) */}
      <View style={styles.currentUserCard}>
        <View style={styles.rankLeft}>
          <Text style={styles.rankLeftLabel}>Mi Puesto</Text>
          <Text style={styles.rankLeftNum}>#{MOCK_CURRENT_USER_RANK.rank}</Text>
        </View>

        <Image
          source={{ uri: MOCK_CURRENT_USER_RANK.avatar }}
          style={styles.currentUserAvatar}
        />

        <View style={styles.currentUserMeta}>
          <Text style={styles.currentUserName}>
            {MOCK_CURRENT_USER_RANK.name}
          </Text>
          <Text style={styles.currentUserPoints}>
            {MOCK_CURRENT_USER_RANK.points} pts
          </Text>
          <Text style={styles.currentUserSubStats}>
            Días Activo: 21 • Entrenamientos: 64 • Mente: 19
          </Text>
        </View>

        <View style={styles.badgeCol}>
          <Text style={styles.badgeMedal}>🏅</Text>
          <Text style={styles.badgeTier}>{MOCK_CURRENT_USER_RANK.tier}</Text>
        </View>
      </View>

      {/* 4. Encabezados de la Tabla */}
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.thText, { width: 44 }]}>Puesto</Text>
        <Text style={[styles.thText, { flex: 1 }]}>Guerrero</Text>
        <Text style={[styles.thText, { width: 80 }]}>Disciplina</Text>
        <Text style={[styles.thText, { width: 68, textAlign: "right" }]}>
          Puntos
        </Text>
      </View>

      {/* 5. Lista de Clasificación */}
      {MOCK_RANKING_LIST.map((user) => (
        <View key={user.rank} style={styles.rankRow}>
          <Text style={styles.rowRankNum}>#{user.rank}</Text>
          <Image source={{ uri: user.avatar }} style={styles.rowAvatar} />
          <View style={styles.rowMeta}>
            <Text style={styles.rowName}>{user.name}</Text>
          </View>
          <Text style={styles.rowDiscipline}>{user.discipline}</Text>
          <View style={styles.rowScoreCol}>
            <Text style={styles.rowPoints}>{user.points}</Text>
            <Text style={styles.rowMedal}>🏅</Text>
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
  podiumStageCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 28,
    padding: 16,
    paddingTop: 18,
    borderWidth: 1.2,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
    marginBottom: 16,
  },
  podiumStageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
  },
  podiumCol: {
    alignItems: "center",
    flex: 1,
  },
  colGold: {
    flex: 1.15,
    transform: [{ translateY: -14 }],
  },
  colSilver: {},
  colBronze: {},
  avatarHolder: {
    position: "relative",
    alignItems: "center",
    marginBottom: 4,
  },
  haloRing: {
    padding: 3,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  goldRing: {
    borderWidth: 3,
    borderColor: "#F59E0B",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  silverRing: {
    borderWidth: 2.2,
    borderColor: "#94A3B8",
    shadowColor: "#94A3B8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bronzeRing: {
    borderWidth: 2.2,
    borderColor: "#D97706",
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  podiumAvatarGold: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  crownEmoji: {
    position: "absolute",
    top: -14,
    fontSize: 18,
  },
  crownEmojiGold: {
    position: "absolute",
    top: -16,
    fontSize: 22,
  },
  warriorName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 2,
  },
  warriorNameGold: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },
  warriorPts: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  warriorPtsGold: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#D97706",
  },
  warriorBadge: {
    fontSize: 9.5,
    color: "#94A3B8",
    marginTop: 1,
  },
  eliteBadgePill: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2,
  },
  eliteBadgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: "#D97706",
  },
  pedestalBlock: {
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    position: "relative",
  },
  pedestalGold: {
    height: 84,
    backgroundColor: "#FEF3C7",
    borderWidth: 1.5,
    borderColor: "#F59E0B",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  pedestalCapGold: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "rgba(245, 158, 11, 0.3)",
  },
  pedestalSilver: {
    height: 64,
    backgroundColor: "#F1F5F9",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
  },
  pedestalCapSilver: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "rgba(148, 163, 184, 0.25)",
  },
  pedestalBronze: {
    height: 52,
    backgroundColor: "#FFEDD5",
    borderWidth: 1.5,
    borderColor: "#FDBA74",
  },
  pedestalCapBronze: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "rgba(217, 119, 6, 0.2)",
  },
  pedestalNumberGold: {
    fontSize: 22,
    fontWeight: "900",
    color: "#B45309",
  },
  pedestalNumberSilver: {
    fontSize: 18,
    fontWeight: "900",
    color: "#64748B",
  },
  pedestalNumberBronze: {
    fontSize: 17,
    fontWeight: "900",
    color: "#C2410C",
  },
  filterRow: {
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.06)",
    borderRadius: 16,
    padding: 4,
    marginBottom: 14,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  filterPillActive: {
    backgroundColor: "#0052EA",
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  filterPillText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#64748B",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  currentUserCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1.8,
    borderColor: "#00E5FF",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  rankLeft: {
    alignItems: "center",
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
  },
  rankLeftLabel: {
    fontSize: 9.5,
    color: "#64748B",
    fontWeight: "600",
  },
  rankLeftNum: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0052EA",
  },
  currentUserAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  currentUserMeta: {
    flex: 1,
  },
  currentUserName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  currentUserPoints: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0052EA",
  },
  currentUserSubStats: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 2,
  },
  badgeCol: {
    alignItems: "center",
    marginLeft: 6,
  },
  badgeMedal: {
    fontSize: 16,
  },
  badgeTier: {
    fontSize: 9,
    fontWeight: "800",
    color: "#D97706",
    marginTop: 1,
  },
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  thText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  rankRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  rowRankNum: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    width: 28,
  },
  rowAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  rowMeta: {
    flex: 1,
  },
  rowName: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#1E293B",
  },
  rowDiscipline: {
    fontSize: 11.5,
    color: "#64748B",
    width: 80,
  },
  rowScoreCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 68,
    justifyContent: "flex-end",
  },
  rowPoints: {
    fontSize: 12.5,
    fontWeight: "800",
    color: "#0052EA",
  },
  rowMedal: {
    fontSize: 12,
  },
});
