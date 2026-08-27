import type { SignInCredentials } from "../types/auth.types";

/**
 * Servicio de autenticación local / desacoplado para el rediseño UI.
 * Permite probar el flujo visual completo sin restricciones ni dependencias de backend.
 */
export const authService = {
  async login(credentials: SignInCredentials) {
    console.log("[AUTH_MOCK] Intentando login con:", credentials.email);
    // Simulación de respuesta rápida para UX fluida
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      user: {
        id: "mock-user-123",
        email: credentials.email,
        name: "Aprendiz Renaser",
      },
    };
  },

  async requestPasswordReset(email: string) {
    console.log("[AUTH_MOCK] Solicitud de restablecimiento para:", email);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },
};
