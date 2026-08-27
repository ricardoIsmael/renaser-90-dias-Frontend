import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { EagleAnimatedEmblem } from "./EagleAnimatedEmblem";
import { CurvedBrandHeader } from "./CurvedBrandHeader";
import { KineticAuthInput } from "./KineticAuthInput";
import { KineticAuthButton } from "./KineticAuthButton";

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log("[RENASER:LOGIN_SCREEN] LoginScreen mounted successfully");
  }, []);

  const handleContinue = () => {
    if (submitting) return;
    setSubmitting(true);
    // Acceso directo e inmediato al dashboard de hábitos sin bloqueo de credenciales
    setTimeout(() => {
      setSubmitting(false);
      router.replace("/(tabs)/habitos");
    }, 200);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* 1. Fondo de Seda Blanco-Aperlada Limpio del Usuario */}
      <Image
        source={require("../../../../assets/images/clean_waves_background.jpg")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* 2. Interfaz Limpia y Flotante */}
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Águila 3D Cromada Holográfica con patas y garras completas */}
            <EagleAnimatedEmblem />

            {/* Título de Marca RENASER + Subtítulo en Español */}
            <CurvedBrandHeader />

            {/* Formulario Flotante sin marco exterior envolvente */}
            <View style={styles.formContainer}>
              {/* Input Correo Electrónico con Label Superior */}
              <KineticAuthInput
                label="Correo Electrónico"
                iconType="mail"
                placeholder="name@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!submitting}
              />

              {/* Input Contraseña con Label Superior y Resplandor Neón Cian */}
              <KineticAuthInput
                label="Contraseña"
                iconType="lock"
                placeholder="••••••••"
                isPassword
                value={password}
                onChangeText={setPassword}
                editable={!submitting}
                onSubmitEditing={handleContinue}
                autoComplete="password"
              />

              {/* Link ¿Olvidaste tu contraseña? */}
              <Pressable
                onPress={handleContinue}
                style={styles.forgotPasswordContainer}
                hitSlop={10}
              >
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
              </Pressable>

              {/* Botón Principal CTA: Continuar en Azul Real #0052EA */}
              <KineticAuthButton
                label="Continuar"
                onPress={handleContinue}
                loading={submitting}
              />
            </View>

            {/* Enlaces Sociales Inferiores */}
            <View style={styles.bottomSection}>
              {/* Continuar con Apple */}
              <Pressable
                onPress={handleContinue}
                style={styles.linkRow}
              >
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="#0F172A">
                  <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.55.63-1.03 1.66-.9 2.69 1 .08 2.01-.51 2.59-1.18z" />
                </Svg>
                <Text style={styles.linkText}>Continuar con Apple</Text>
              </Pressable>

              {/* Continuar con Google */}
              <Pressable
                onPress={handleContinue}
                style={styles.linkRow}
              >
                <Svg width={16} height={16} viewBox="0 0 24 24">
                  <Path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <Path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <Path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <Path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </Svg>
                <Text style={styles.linkText}>Continuar con Google</Text>
              </Pressable>

              {/* Separador Fino */}
              <View style={styles.divider} />

              {/* Crear una cuenta */}
              <Pressable
                onPress={handleContinue}
                style={styles.linkRow}
              >
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="#0F172A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                    stroke="#0F172A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
                <Text style={styles.linkText}>Crear una cuenta</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 6,
    paddingBottom: 32,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  formContainer: {
    width: "100%",
    marginTop: 4,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: 10,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#0F172A",
    letterSpacing: 0.1,
  },
  bottomSection: {
    marginTop: 18,
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 3,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
  },
  divider: {
    width: 220,
    height: 1,
    backgroundColor: "rgba(148, 163, 184, 0.35)",
    marginVertical: 4,
  },
});
