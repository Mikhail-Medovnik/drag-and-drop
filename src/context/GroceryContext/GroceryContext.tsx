import React from "react";
import { ReactNode, createContext, useContext, useState } from "react";

export interface GroceryType {
  id: string;
  name: string;
}

interface Context {
  contextState: GroceryType[];
  setContextState: React.Dispatch<React.SetStateAction<GroceryType[]>>;
}

export const GroceryContext = createContext<Context | null>(null);

interface GroceryProviderProps {
  children: ReactNode;
  value: GroceryType[];
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
