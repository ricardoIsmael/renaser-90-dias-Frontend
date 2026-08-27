import React from "react";
import { Tabs } from "expo-router";
import { LiquidTabBar } from "@/features/navigation";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <LiquidTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="habitos"
        options={{
          title: "Hábitos",
        }}
      />
      <Tabs.Screen
        name="rocas"
        options={{
          title: "Objetivos",
        }}
      />
      <Tabs.Screen
        name="comunidad"
        options={{
          title: "Comunidad",
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
