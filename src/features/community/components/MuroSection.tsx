import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  MOCK_SPARKS,
  MOCK_POSTS,
  WallPost,
  SparkStory,
} from "../data/communityMockData";

export const MuroSection: React.FC = () => {
  const [posts, setPosts] = useState<WallPost[]>(MOCK_POSTS);
  const [isComposeVisible, setIsComposeVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "Hábito Diario" | "Gran Victoria" | "Reflexión" | "Presentación"
  >("Hábito Diario");
  const [selectedSpark, setSelectedSpark] = useState<SparkStory | null>(null);

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, flames: p.flames + 1 } : p
      )
    );
  };

  const handlePublishPost = () => {
    if (!newPostText.trim()) return;

    const newPost: WallPost = {
      id: `post-${Date.now()}`,
      author: "David K. (Tú)",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Pro Elite",
      timeAgo: "Hace un momento",
      category: selectedCategory,
      text: newPostText,
      imageUrl:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
      flames: 1,
      commentsCount: 0,
      tags: ["#renaser", "#victoria", "#dia14"],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setIsComposeVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 1. Sparks Diarios de Hábitos Completados */}
      <View style={styles.sparksContainer}>
        <Text style={styles.sparksTitle}>🔥 Sparks de la Tribu Hoy</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sparksScroll}
        >
          {MOCK_SPARKS.map((spark) => (
            <Pressable
              key={spark.id}
              style={styles.sparkItem}
              onPress={() => setSelectedSpark(spark)}
            >
              <View
                style={[
                  styles.avatarRing,
                  spark.hasRing && styles.avatarRingActive,
                ]}
              >
                <Image source={{ uri: spark.avatar }} style={styles.sparkAvatar} />
              </View>
              <Text style={styles.sparkName} numberOfLines={1}>
                {spark.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* 2. Botón Rápido para Publicar Victoria */}
      <Pressable
        style={styles.composeTriggerCard}
        onPress={() => setIsComposeVisible(true)}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
          }}
          style={styles.userSmallAvatar}
        />
        <Text style={styles.composePlaceholder}>
          Comparte tu victoria o hábito con la tribu...
        </Text>
        <View style={styles.plusIcon}>
          <Text style={styles.plusIconText}>+</Text>
        </View>
      </Pressable>

      {/* 3. Feed de Publicaciones */}
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          {/* Header del Post */}
          <View style={styles.postHeader}>
            <Image source={{ uri: post.avatar }} style={styles.authorAvatar} />
            <View style={styles.authorMeta}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.authorRole}>
                {post.role} • {post.timeAgo}
              </Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{post.category}</Text>
            </View>
          </View>

          {/* Texto del Post */}
          <Text style={styles.postText}>{post.text}</Text>

          {/* Imagen de Evidencia */}
          {Boolean(post.imageUrl) && (
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.postImage}
              resizeMode="cover"
            />
          )}

          {/* Tags */}
          <View style={styles.tagsRow}>
            {post.tags.map((tag, idx) => (
              <Text key={idx} style={styles.tagText}>
                {tag}
              </Text>
            ))}
          </View>

          {/* Footer de Interacciones */}
          <View style={styles.postFooter}>
            <Pressable
              style={styles.actionButton}
              onPress={() => handleLikePost(post.id)}
            >
              <Text style={styles.actionEmoji}>🔥</Text>
              <Text style={styles.actionCount}>{post.flames} Apoyos</Text>
            </Pressable>

            <Pressable style={styles.actionButton}>
              <Text style={styles.actionEmoji}>💬</Text>
              <Text style={styles.actionCount}>
                {post.commentsCount} Comentarios
              </Text>
            </Pressable>
          </View>
        </View>
      ))}

      {/* MODAL PARA SUBIR PUBLICACIÓN */}
      <Modal
        visible={isComposeVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsComposeVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NUEVA PUBLICACIÓN</Text>
              <Pressable onPress={() => setIsComposeVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>

            {/* Selector de Categoría */}
            <Text style={styles.fieldLabel}>Categoría</Text>
            <View style={styles.categorySelector}>
              {(
                [
                  "Hábito Diario",
                  "Gran Victoria",
                  "Reflexión",
                  "Presentación",
                ] as const
              ).map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.catPill,
                    selectedCategory === cat && styles.catPillActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.catPillText,
                      selectedCategory === cat && styles.catPillTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Input de Texto */}
            <TextInput
              style={styles.modalTextInput}
              placeholder="Comparte tu avance o reflexión con la tribu..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={newPostText}
              onChangeText={setNewPostText}
            />

            {/* Vista Previa de Evidencia */}
            <Text style={styles.fieldLabel}>Foto de Evidencia</Text>
            <View style={styles.evidenceContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
                }}
                style={styles.evidencePreview}
              />
              <View style={styles.evidenceBadge}>
                <Text style={styles.evidenceBadgeText}>✓ Adjunta</Text>
              </View>
            </View>

            {/* Botón Publicar */}
            <Pressable
              style={styles.publishButton}
              onPress={handlePublishPost}
            >
              <Text style={styles.publishButtonText}>Publicar en la Tribu</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  sparksContainer: {
    marginBottom: 16,
  },
  sparksTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  sparksScroll: {
    gap: 14,
  },
  sparkItem: {
    alignItems: "center",
    width: 66,
  },
  avatarRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  avatarRingActive: {
    borderColor: "#00E5FF",
    borderWidth: 2.2,
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  sparkAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sparkName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334155",
    marginTop: 4,
  },
  composeTriggerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.9)",
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  userSmallAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  composePlaceholder: {
    flex: 1,
    fontSize: 13,
    color: "#64748B",
  },
  plusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0052EA",
    alignItems: "center",
    justifyContent: "center",
  },
  plusIconText: {
    fontSize: 20,
    color: "#FFFFFF",
    lineHeight: 22,
    fontWeight: "600",
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  authorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  authorMeta: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  authorRole: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 1,
  },
  categoryBadge: {
    backgroundColor: "rgba(0, 82, 234, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0052EA",
  },
  postText: {
    fontSize: 14,
    color: "#1E293B",
    lineHeight: 21,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#0052EA",
    fontWeight: "500",
  },
  postFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
    gap: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionEmoji: {
    fontSize: 16,
  },
  actionCount: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#475569",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
  },
  modalClose: {
    fontSize: 18,
    color: "#64748B",
    padding: 4,
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
    marginTop: 6,
  },
  categorySelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
  },
  catPillActive: {
    backgroundColor: "#0052EA",
  },
  catPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  catPillTextActive: {
    color: "#FFFFFF",
  },
  modalTextInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    fontSize: 14,
    color: "#0F172A",
    textAlignVertical: "top",
    marginBottom: 14,
  },
  evidenceContainer: {
    position: "relative",
    width: "100%",
    height: 120,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "#00E5FF",
  },
  evidencePreview: {
    width: "100%",
    height: "100%",
  },
  evidenceBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 229, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  evidenceBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#0F172A",
  },
  publishButton: {
    backgroundColor: "#0052EA",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  publishButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
