import React from "react";
import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export type CommunityTabKey =
  | "muro"
  | "ranking"
  | "celula"
  | "chats"
  | "eventos"
  | "cursos"
  | "testimonios";

interface CommunityHeaderTabsProps {
  activeTab: CommunityTabKey;
  onTabChange: (tab: CommunityTabKey) => void;
}

interface TabConfig {
  key: CommunityTabKey;
  label: string;
  badge?: number;
}

const TABS: TabConfig[] = [
  { key: "muro", label: "Muro" },
  { key: "ranking", label: "Ranking" },
  { key: "celula", label: "Mi Célula" },
  { key: "chats", label: "Chats", badge: 3 },
  { key: "eventos", label: "Eventos" },
  { key: "cursos", label: "Cursos" },
  { key: "testimonios", label: "Testimonios" },
];

export const CommunityHeaderTabs: React.FC<CommunityHeaderTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => onTabChange(tab.key)}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab.label}
              </Text>
              {Boolean(tab.badge && tab.badge > 0) && (
                <View
                  style={[
                    styles.badge,
                    isActive ? styles.badgeActive : styles.badgeInactive,
                  ]}
                >
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.8)",
  },
  tabButtonActive: {
    backgroundColor: "#0052EA",
    borderColor: "#0052EA",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  tabLabelActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  badge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeActive: {
    backgroundColor: "#00E5FF",
  },
  badgeInactive: {
    backgroundColor: "#E2E8F0",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0F172A",
  },
});
