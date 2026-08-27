import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { RockItem } from "../data/objetivosMockData";

interface ModoMonjeModalProps {
  rock: RockItem | null;
  visible: boolean;
  onClose: () => void;
}

export const ModoMonjeModal: React.FC<ModoMonjeModalProps> = ({
  rock,
  visible,
  onClose,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(3600); // 60 min
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!visible || !rock) return;
    setSecondsLeft(3600);
    setIsPaused(false);
  }, [visible, rock]);

  useEffect(() => {
    if (!visible || isPaused || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [visible, isPaused, secondsLeft]);

  if (!rock) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatNum = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.tag}>MODO MONJE · BLOQUE DE ENFOQUE</Text>

          <Text style={styles.rockTitle}>{rock.title}</Text>

          {/* Temporizador Gigante */}
          <View style={styles.timerBox}>
            <Text style={styles.timerText}>
              {formatNum(minutes)}:{formatNum(seconds)}
            </Text>
            <Text style={styles.timerSub}>Cero distracciones</Text>
          </View>

          {/* Botones */}
          <View style={styles.btnRow}>
            <Pressable
              style={styles.pauseBtn}
              onPress={() => setIsPaused(!isPaused)}
            >
              <Text style={styles.pauseBtnText}>
                {isPaused ? "Reanudar" : "Pausar"}
              </Text>
            </Pressable>

            <Pressable style={styles.exitBtn} onPress={onClose}>
              <Text style={styles.exitBtnText}>Salir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(10, 10, 11, 0.94)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#18181B",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  tag: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#F59E0B",
    marginBottom: 10,
  },
  rockTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },
  timerBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 2,
    borderColor: "#F59E0B",
    marginBottom: 28,
  },
  timerText: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    fontVariant: ["tabular-nums"],
  },
  timerSub: {
    fontSize: 12,
    color: "#A1A1AA",
    marginTop: 4,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  pauseBtn: {
    flex: 1,
    backgroundColor: "#F59E0B",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  pauseBtnText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  exitBtn: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  exitBtnText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
