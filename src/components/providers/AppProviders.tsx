"use client";

import React, { useEffect } from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("app-ready");
    return () => {
      document.body.classList.remove("app-ready");
    };
  }, []);

  return <>{children}</>;
}
