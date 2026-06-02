// src/hooks/useAppContext.js

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext는 AppProvider 안에서만 사용할 수 있습니다.");
  }

  return context;
}