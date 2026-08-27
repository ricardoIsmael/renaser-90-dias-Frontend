import React, { useEffect } from "react";
import { DefaultTheme, ThemeProvider, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    console.log("[RENASER:ROOT_LAYOUT] Mounting RootLayout...");
    SplashScreen.hideAsync()
      .then(() => console.log("[RENASER:ROOT_LAYOUT] SplashScreen hidden successfully"))
      .catch((err) => console.log("[RENASER:ROOT_LAYOUT] SplashScreen hide warning:", err));
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F8FAFC" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
