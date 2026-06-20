import { createContext, useContext, type Dispatch } from "react";

export type Onglet = "item" | "recipe" | "table" | "skill" | "talent" | "upgrade" | "registry";

type FormsContextType = {
  onglet: Onglet;
  setOnglet: Dispatch<React.SetStateAction<Onglet>>;
};

export const FormsContext = createContext<FormsContextType | null>(null);

export function useFormsContext(): FormsContextType {
  const context = useContext(FormsContext);
  if (!context) {
    throw new Error("useFormsContext must be used inside <FormsProvider>");
  }
  return context;
}
