import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { CategorizedHabit } from "../data/habitsMockData";

interface LogEvidenceModalProps {
  habit: {
    id: string;
    title: string;
    category?: string;
    time?: string;
    completed: boolean;
    streak: number;
  } | null;
  visible: boolean;
  onClose: () => void;
  onSave: (habitId: string) => void;
}

export const LogEvidenceModal: React.FC<LogEvidenceModalProps> = ({
  habit,
  visible,
  onClose,
  onSave,
}) => {
  const [note, setNote] = useState("");

  if (!habit) return null;

  const handleConfirm = () => {
    onSave(habit.id);
    setNote("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>REGISTRAR EVIDENCIA</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.habitName}>{habit.title}</Text>

          {/* Vista previa de foto de evidencia */}
          <Text style={styles.label}>Foto de Comprobación</Text>
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
              }}
              style={styles.photo}
            />
            <View style={styles.attachedPill}>
              <Text style={styles.attachedText}>✓ Foto Capturada</Text>
            </View>
          </View>

          {/* Nota opcional */}
          <Text style={styles.label}>Reflexión / Nota (Opcional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="¿Cómo te sentiste realizando este hábito hoy?"
            placeholderTextColor="#94A3B8"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
          />

          {/* Botón Confirmar */}
          <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmBtnText}>Confirmar y Completar Hábito</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.5,
  },
  closeBtn: {
    fontSize: 18,
    color: "#64748B",
    padding: 4,
  },
  habitName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0052EA",
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
  },
  photoContainer: {
    position: "relative",
    width: "100%",
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "#00E5FF",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  attachedPill: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 229, 255, 0.95)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  attachedText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
  },
  textInput: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    fontSize: 13.5,
    color: "#0F172A",
    textAlignVertical: "top",
    marginBottom: 18,
  },
  confirmBtn: {
    backgroundColor: "#0052EA",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#0052EA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
