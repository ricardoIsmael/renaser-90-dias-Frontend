import React, { useEffect } from "react";
import { LoginScreen } from "@/features/auth";

export default function IndexPage() {
  useEffect(() => {
    console.log("[RENASER:INDEX_ROUTE] Index route mounted, rendering LoginScreen");
  }, []);

  console.log("[RENASER:INDEX_ROUTE] Executing IndexPage component");
  return <LoginScreen />;
}
