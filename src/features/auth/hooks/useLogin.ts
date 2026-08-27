import { useState } from "react";
import { useRouter } from "expo-router";
import { authService } from "../services/authService";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("aprendiz@renaser.com");
  const [password, setPassword] = useState("12345678");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const clearError = () => {
    if (errorMsg) setErrorMsg(null);
    if (successMsg) setSuccessMsg(null);
  };

  const handleLogin = async () => {
    if (submitting) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      console.log("[AUTH] Validación fallida: faltan campos");
      setErrorMsg("Por favor ingresa tu correo y contraseña");
      return;
    }

    console.log("[AUTH] Procesando inicio de sesión...");
    setSubmitting(true);

    try {
      const response = await authService.login({
        email: cleanEmail,
        password,
      });

      setSubmitting(false);

      if (response.success) {
        console.log("[AUTH] Login exitoso para:", cleanEmail);
        setSuccessMsg("¡Sesión iniciada correctamente! Bienvenido.");
        // Navegación fluida de prueba
      }
    } catch (err) {
      setSubmitting(false);
      setErrorMsg("No se pudo iniciar sesión. Intenta nuevamente.");
    }
  };

  const handleForgotPassword = () => {
    console.log("[AUTH] Navegando a recuperar contraseña");
    setSuccessMsg("Enlace de recuperación simulado para: " + email);
  };

  const handleRequestAccess = () => {
    console.log("[AUTH] Navegando a solicitud de nuevo lugar");
    setSuccessMsg("Formulario de solicitud de nuevo aprendiz abierto.");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,
    successMsg,
    submitting,
    clearError,
    handleLogin,
    handleForgotPassword,
    handleRequestAccess,
  };
}
