import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { MOCK_CHATS, ChatMessage } from "../data/communityMockData";

export const ChatsSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const [chatFilter, setChatFilter] = useState<
    "todos" | "general" | "celula" | "direct"
  >("todos");

  const filteredChats = MOCK_CHATS.filter((c) => {
    const matchesSearch =
      c.sender.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      chatFilter === "todos" || c.type === chatFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      {/* 1. Buscador de Miembros y Chats */}
      <View style={styles.searchBarContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar miembros, mentores y salas..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 2. Filtros de Sala */}
      <View style={styles.subFilterRow}>
        {(
          [
            { key: "todos", label: "Todos" },
            { key: "general", label: "General" },
            { key: "celula", label: "Mi Célula" },
            { key: "direct", label: "Directos" },
          ] as const
        ).map((tab) => (
          <Pressable
            key={tab.key}
            style={[
              styles.subFilterPill,
              chatFilter === tab.key && styles.subFilterPillActive,
            ]}
            onPress={() => setChatFilter(tab.key)}
          >
            <Text
              style={[
                styles.subFilterText,
                chatFilter === tab.key && styles.subFilterTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 3. Lista de Conversaciones */}
      {filteredChats.map((chat) => (
        <Pressable key={chat.id} style={styles.chatRow}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
            {chat.isOnline && <View style={styles.onlineDot} />}
          </View>

          <View style={styles.chatMeta}>
            <View style={styles.chatTopRow}>
              <Text style={styles.chatSender}>{chat.sender}</Text>
              <Text style={styles.chatTime}>{chat.time}</Text>
            </View>

            <View style={styles.chatBottomRow}>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {chat.lastMessage}
              </Text>
              {chat.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
    height: 48,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: "#0F172A",
  },
  subFilterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  subFilterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  subFilterPillActive: {
    backgroundColor: "#0052EA",
  },
  subFilterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  subFilterTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  chatRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 12,
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  chatMeta: {
    flex: 1,
  },
  chatTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatSender: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  chatTime: {
    fontSize: 11,
    color: "#94A3B8",
  },
  chatBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 13,
    color: "#64748B",
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: "#00E5FF",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  unreadCount: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#0F172A",
  },
});
