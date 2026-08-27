# RENASER OS · Guía de Screaming Architecture, Reutilización y Build en Android Studio

Esta guía documenta la estructura estándar **Screaming Architecture**, el catálogo de componentes reutilizables y el procedimiento exacto paso a paso para compilar la aplicación en **Android Studio** evitando errores de build.

---

## 1. Estructura Estándar: Screaming Architecture (Feature-First)

En lugar de agrupar archivos por tipo técnico (`screens/`, `components/`, `utils/`), la arquitectura grita el dominio del negocio (`features/`):

```
renaser90-app/
├── assets/                           # Imágenes, fuentes e iconos estáticos
├── src/
│   ├── app/                          # 👈 Capa fina de Expo Router (Solo monta features)
│   │   ├── _layout.tsx               # Root Stack / ThemeProvider
│   │   ├── index.tsx                 # Redirección / Entrada a Login
│   │   ├── (auth)/                   # Rutas de autenticación
│   │   │   ├── login.tsx             # -> monta <LoginScreen />
│   │   │   ├── signup.tsx            # -> monta <SignupScreen />
│   │   │   └── recuperar.tsx         # -> monta <ForgotPasswordScreen />
│   │   └── (app)/                    # Rutas autenticadas
│   │       ├── _layout.tsx           # Layout con BottomTabs o Drawer
│   │       ├── home.tsx              # -> monta <HomeScreen />
│   │       ├── routine.tsx           # -> monta <HabitsRoutineScreen />
│   │       ├── rocks.tsx             # -> monta <RocksScreen />
│   │       ├── comunidad.tsx         # -> monta <CommunityScreen />
│   │       └── profile/              # -> monta <ProfileScreen />
│   │
│   ├── features/                     # 👈 DOMINIOS DEL SISTEMA (Autocontenidos)
│   │   ├── auth/                     # Dominio: Autenticación
│   │   │   ├── components/           # AuthHeader, AuthInput, AuthButton, etc.
│   │   │   ├── hooks/                # useLogin, useSignup, useAuthSession
│   │   │   ├── services/             # authService (Supabase / API REST)
│   │   │   ├── types/                # auth.types.ts
│   │   │   └── index.ts              # Public API
│   │   ├── habits/                   # Dominio: Hábitos y Rutina Diaria
│   │   │   ├── components/           # HabitCard, TimerSheet, EvidenceModal
│   │   │   ├── hooks/                # useHabitsToday, useHabitTimer
│   │   │   ├── services/             # habitsService
│   │   │   ├── types/                # habit.types.ts
│   │   │   └── index.ts
│   │   ├── rocks/                    # Dominio: Rocas y Bloques de Enfoque
│   │   │   ├── components/           # RockCard, PomodoroTimer, WeeklyPlanner
│   │   │   ├── hooks/                # useRocks, useFocusTimer
│   │   │   └── index.ts
│   │   ├── journal/                  # Dominio: Diario y Espejo de la Sombra
│   │   ├── community/                # Dominio: Muros, Posts y Chat de Célula
│   │   ├── academy/                  # Dominio: Cursos, Clases y Audioterapia
│   │   ├── radar/                    # Dominio: Radar de Conciencia
│   │   └── onboarding/               # Dominio: Ficha Diagnóstica y Variable 90
│   │
│   ├── shared/                       # 👈 COMPONENTES Y UTILIDADES TRANSVERSALES
│   │   ├── components/               # GlassCard, GradientButton, Modal, Input, Badge
│   │   ├── theme/                    # Tokens (Colors, Radii, Typography, Shadows)
│   │   ├── lib/                      # SupabaseClient, HttpClient, Storage, DateHelpers
│   │   └── hooks/                    # useAppTheme, useOnlineStatus, useKeyboard
```

---

## 2. Estrategia de Reutilización de Componentes

Podemos migrar y reutilizar los componentes del repositorio anterior (`RenaserPlayStoreCopy/components/`) organizándolos directamente en la nueva arquitectura:

| Componente Anterior | Destino en Screaming Architecture | Función y Beneficio |
| :--- | :--- | :--- |
| `theme.ts`, `theme.dark.ts`, `theme.light.ts` | `src/shared/theme/` | Paleta de colores viva y tokens de diseño Obsidian/Zafiro. |
| `GradientButton.tsx` | `src/shared/components/GradientButton.tsx` | Botones con degradado y retroalimentación táctil. |
| `GlassCard.tsx` / `Card.tsx` | `src/shared/components/GlassCard.tsx` | Contenedores con efecto de cristal y bordes sutiles. |
| `SignaturePad.tsx` | `src/features/onboarding/components/SignaturePad.tsx` | Lienzo para la firma digital del pacto de compromiso. |
| `PhotoCaptureField.tsx` | `src/features/habits/components/PhotoCaptureField.tsx` | Selector y cámara para captura de evidencia multimedia. |
| `AudioRecorderCard.tsx` | `src/features/habits/components/AudioRecorderCard.tsx` | Grabador y reproductor de notas de voz. |
| `RuedaColumna.tsx` / `ProgressRing.tsx` | `src/shared/components/ProgressRing.tsx` | Anillos y gráficos de progreso circular para el semáforo. |
| `PlanificacionSemanal.tsx` | `src/features/rocks/components/WeeklyPlanningSheet.tsx` | Planificador dominical de Rocas Semanales. |
| `Avatar.tsx` / `AnimatedAvatar.tsx` | `src/features/profile/components/AnimatedAvatar.tsx` | Sistema de evolución de arquetipos (Macaco a Águila). |
| `AvisoCajaRenaser.tsx` | `src/features/habits/components/HabitWindowAlert.tsx` | Modal de advertencia de ventanas de entrega y extensión. |

---

## 3. Guía Paso a Paso para Compilar y Correr en Android Studio

Para compilar el proyecto nativo en **Android Studio** sin errores de Gradle ni dependencias nativas:

### Paso 1: Configurar Variables de Entorno (Windows)
Asegúrate de tener configuradas las siguientes variables del sistema:
- `JAVA_HOME`: `C:\Program Files\Android\Android Studio\jbr` (o ruta de tu JDK 17).
- `ANDROID_HOME`: `C:\Users\<TuUsuario>\AppData\Local\Android\Sdk`.
- En el `Path`: `%ANDROID_HOME%\platform-tools` y `%ANDROID_HOME%\tools`.

### Paso 2: Generar la Carpeta Nativa de Android (Prebuild)
En tu terminal, dentro de `C:\Renaser 90 dias rediseno\renaser90-app`:
```bash
npx expo prebuild --platform android
```
> *Este comando lee `app.json` y genera la carpeta `android/` con los archivos `build.gradle`, `settings.gradle` y `AndroidManifest.xml` configurados.*

### Paso 3: Abrir el Proyecto en Android Studio
1. Abre **Android Studio**.
2. Selecciona **Open** (o *File > Open*).
3. Navega hasta la carpeta:
   `C:\Renaser 90 dias rediseno\renaser90-app\android` 👈 *(Abre la subcarpeta `android`, no la raíz).*
4. Espera a que Android Studio ejecute la sincronización inicial de Gradle (**Gradle Sync**).

### Paso 4: Evitar Errores Comunes de Build

1. **Error de versión de Java / Gradle:**
   - En Android Studio ve a: *File > Settings > Build, Execution, Deployment > Build Tools > Gradle*.
   - Asegúrate de que **Gradle JDK** esté configurado en **Embedded JDK 17** (jbr-17).
2. **Limpiar caché de Gradle:**
   - En la terminal dentro de `android/`:
     ```bash
     .\gradlew clean
     ```
3. **Ejecutar el Build y Lanzar en Emulador:**
   - Selecciona tu emulador en la barra superior de Android Studio y presiona el botón verde de **Run (Play)**.
   - O desde la terminal en la raíz del proyecto:
     ```bash
     npx expo run:android
     ```

---

## 4. Próximos Pasos Recomendados

1. **Modulo de Registro (`Signup`):** Implementar `src/features/auth/components/SignupScreen.tsx`.
2. **Modulo de Hábitos (`Habits`):** Migrar el checklist diario y el reloj de tiempo a `src/features/habits/`.
3. **Modulo de Rocas (`Rocks`):** Migrar el temporizador Pomodoro y las 3 Daily Rocks a `src/features/rocks/`.
