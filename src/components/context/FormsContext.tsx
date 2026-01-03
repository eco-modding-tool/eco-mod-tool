import { createContext, useContext, type Dispatch } from "react";

type FormsContextType = {
    onglet: string; 
    setOnglet: Dispatch<React.SetStateAction<"object" | "item" | "recipe">>;
}

export const FormsContext = createContext<FormsContextType | null>(null);

export function useFormsContext(): FormsContextType {
  const context = useContext(FormsContext);
  if (!context) {
    throw new Error("useFormsContext must be used inside <Context>");
  }
  return context;
}