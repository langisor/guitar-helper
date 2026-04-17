"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LeftHandedContextType {
  isLeftHanded: boolean;
  setLeftHanded: (value: boolean) => void;
  toggleLeftHanded: () => void;
}

const LeftHandedContext = createContext<LeftHandedContextType | undefined>(
  undefined
);

export function LeftHandedProvider({ children }: { children: ReactNode }) {
  const [isLeftHanded, setLeftHanded] = useState(false);

  const toggleLeftHanded = () => setLeftHanded((prev) => !prev);

  return (
    <LeftHandedContext.Provider
      value={{ isLeftHanded, setLeftHanded, toggleLeftHanded }}
    >
      {children}
    </LeftHandedContext.Provider>
  );
}

export function useLeftHanded() {
  const context = useContext(LeftHandedContext);
  if (context === undefined) {
    throw new Error("useLeftHanded must be used within a LeftHandedProvider");
  }
  return context;
}
