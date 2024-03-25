import React from "react";
import { ReactNode, createContext, useContext, useState } from "react";
import { InitialColumnsData } from "@/App";

interface Context {
  contextState: InitialColumnsData;
  setContextState: React.Dispatch<React.SetStateAction<InitialColumnsData>>;
}

export const GroceryContext = createContext<Context | null>(null);

interface GroceryProviderProps {
  children: ReactNode;
  value: InitialColumnsData;
}

export const GroceryProvider = ({ children, value }: GroceryProviderProps) => {
  const [contextState, setContextState] = useState(value);
  const contextValue = { contextState, setContextState };

  return (
    <GroceryContext.Provider value={contextValue}>
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error("useGrocery must be used within a GroceryProvider");
  }
  return context;
};
