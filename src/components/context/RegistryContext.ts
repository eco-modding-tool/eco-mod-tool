import { createContext, useContext } from "react";
import type { Reference } from "../../models/types";

export type RegistryState = {
  customSkills: Reference[];
  customTables: Reference[];
  customItems: Reference[];
  customTalents: Reference[];
};

export type RegistryContextType = RegistryState & {
  addSkill: (ref: Reference) => void;
  addTable: (ref: Reference) => void;
  addItem: (ref: Reference) => void;
  addTalent: (ref: Reference) => void;
  exportRegistry: () => string; // JSON sérialisé, pour sauvegarder/partager
  importRegistry: (json: string) => void; // fusionne un export précédent (le tien ou un autre mod)
  clearRegistry: () => void;
};

export const RegistryContext = createContext<RegistryContextType | null>(null);

export function useRegistry(): RegistryContextType {
  const ctx = useContext(RegistryContext);
  if (!ctx) throw new Error("useRegistry must be used inside <RegistryProvider>");
  return ctx;
}
