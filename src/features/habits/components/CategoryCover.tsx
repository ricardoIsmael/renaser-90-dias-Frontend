import React, { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop, Path } from "react-native-svg";

const PORTADAS: Record<string, any> = {
  BODY: require("../../../../assets/images/categorias/cuerpo.webp"),
  MIND: require("../../../../assets/images/categorias/mente.webp"),
  CONSCIENCE: require("../../../../assets/images/categorias/emociones.webp"),
  SPIRIT: require("../../../../assets/images/categorias/espiritu.webp"),
  ROCAS: require("../../../../assets/images/categorias/negocio.webp"),
};

export function portadaDe(key: string) {
  return PORTADAS[key];
}

interface CategoryCoverProps {
  categoriaKey: string;
  label: string;
  iconType: "cuerpo" | "mente" | "emociones" | "espiritu" | "negocio";
  modo?: "plegable" | "navegacion";
  hechos?: number;
  total?: number;
  abierta?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  siguiente?: string | null;
  pie?: string;
  children?: ReactNode;
}

export const CategoryCover: React.FC<CategoryCoverProps> = ({
  categoriaKey,
  label,
  iconType,
  modo = "plegable",
  hechos = 0,
  total = 0,
  abierta = false,
  onToggle,
  onPress,
  siguiente = null,
  pie,
  children,
}) => {
  const navega = modo === "navegacion";
  const pct = total > 0 ? hechos / total : 0;
  const portada = portadaDe(categoriaKey);

  const renderIcon = () => {
    switch (iconType) {
      case "cuerpo":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M6 3h12l4 6-10 13L2 9l4-6z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "mente":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "emociones":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "espiritu":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
      case "negocio":
        return (
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        );
    }
  };

  return (
    <View style={[styles.wrapper, abierta && styles.wrapperActive]}>
      <Pressable
        onPress={navega ? onPress : onToggle}
        style={styles.pressableHeader}
      >
        {/* Imagen de Portada con Velo Degradado */}
        <View style={styles.imageContainer}>
          {portada ? (
            <Image source={portada} style={styles.coverImage} resizeMode="cover" />
          ) : (
            <View style={styles.fallbackBg} />
          )}

          {/* Velo Degradado SVG */}
          <Svg style={StyleSheet.absoluteFill} width="100%" height={104}>
            <Defs>
              <SvgGradient id={`veloPortada_${categoriaKey}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#000000" stopOpacity={0.15} />
                <Stop offset="100%" stopColor="#000000" stopOpacity={0.65} />
              </SvgGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height={104} fill={`url(#veloPortada_${categoriaKey})`} />
          </Svg>

          {/* Fila del Título y Contador */}
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>{renderIcon()}</View>
            <Text style={styles.titleText} numberOfLines={1}>
              {label.toUpperCase()}
            </Text>
            {!navega && (
              <Text style={styles.counterText}>
                {hechos}/{total}
              </Text>
            )}
          </View>
        </View>

        {/* Barra de Avance de la Categoría */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round(pct * 100)}%` },
            ]}
          />
        </View>

        {/* Pie de la Portada */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText} numberOfLines={1}>
            {navega || pie
              ? pie ?? ""
              : siguiente
              ? `Siguiente · ${siguiente}`
              : hechos === total && total > 0
              ? "✓ Todo hecho"
              : "Sin pendientes"}
          </Text>

          {/* Chevron */}
          <Svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            style={{
              transform: [{ rotate: !navega && abierta ? "90deg" : "0deg" }],
            }}
          >
            <Path
              d="M9 18l6-6-6-6"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </Pressable>

      {/* Contenido Desplegable (Hijos) */}
      {abierta && children ? (
        <View style={styles.childrenContainer}>{children}</View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  wrapperActive: {
    borderColor: "#0052EA",
  },
  pressableHeader: {
    width: "100%",
  },
  imageContainer: {
    height: 104,
    justifyContent: "flex-end",
    position: "relative",
  },
  coverImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 104,
    width: "100%",
  },
  fallbackBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 104,
    backgroundColor: "#1E293B",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingBottom: 12,
    zIndex: 2,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: "#FFFFFF",
  },
  counterText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.95)",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#F1F5F9",
  },
  progressFill: {
    height: 4,
    backgroundColor: "#F59E0B", // Color dorado / gold
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "600",
    color: "#64748B",
  },
  childrenContainer: {
    paddingHorizontal: 12,
    paddingBottom: 14,
    paddingTop: 4,
    gap: 10,
    backgroundColor: "#F8FAFC",
  },
});
