import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CommunityHeaderTabs,
  CommunityTabKey,
} from "./CommunityHeaderTabs";
import { MuroSection } from "./MuroSection";
import { RankingSection } from "./RankingSection";
import { CelulaSection } from "./CelulaSection";
import { ChatsSection } from "./ChatsSection";
import { EventosSection } from "./EventosSection";
import { CursosSection } from "./CursosSection";
import { TestimoniosSection } from "./TestimoniosSection";

export const ComunidadScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CommunityTabKey>("muro");

  const renderContent = () => {
    switch (activeTab) {
      case "muro":
        return <MuroSection />;
      case "ranking":
        return <RankingSection />;
      case "celula":
        return <CelulaSection onOpenChat={() => setActiveTab("chats")} />;
      case "chats":
        return <ChatsSection />;
      case "eventos":
        return <EventosSection />;
      case "cursos":
        return <CursosSection />;
      case "testimonios":
        return <TestimoniosSection />;
      default:
        return <MuroSection />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header Superior Principal */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text style={styles.title}>Tribu RENASER</Text>
          <View style={styles.liveUsersPill}>
            <View style={styles.greenPulse} />
            <Text style={styles.liveUsersText}>48 En Línea</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          Conecta, rinde cuentas y elévate con tus hermanos de camino.
        </Text>
      </View>

      {/* Selector de Pestañas Superior */}
      <CommunityHeaderTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Contenido Dinámico de la Sección Activa */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  liveUsersPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  greenPulse: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#10B981",
  },
  liveUsersText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#059669",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 110, // Margin for floating liquid tab bar
  },
});
