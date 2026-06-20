import { useState, type ReactNode } from "react";
import { RegistryContext, type RegistryState } from "./RegistryContext";
import type { Reference } from "../../models/types";

const STORAGE_KEY = "eco-mod-tool-registry";

function loadInitial(): RegistryState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as RegistryState;
  } catch {
    // localStorage indisponible ou JSON corrompu : on repart à vide.
  }
  return { customSkills: [], customTables: [], customItems: [], customTalents: [] };
}

function persist(state: RegistryState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // stockage plein ou indisponible : tant pis, l'export manuel reste possible.
  }
}

function dedupe(list: Reference[]): Reference[] {
  const seen = new Set<string>();
  return list.filter((r) => {
    if (seen.has(r.className)) return false;
    seen.add(r.className);
    return true;
  });
}

export default function RegistryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RegistryState>(loadInitial);

  const update = (patch: Partial<RegistryState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  };

  const addSkill = (ref: Reference) => update({ customSkills: dedupe([...state.customSkills, ref]) });
  const addTable = (ref: Reference) => update({ customTables: dedupe([...state.customTables, ref]) });
  const addItem = (ref: Reference) => update({ customItems: dedupe([...state.customItems, ref]) });
  const addTalent = (ref: Reference) => update({ customTalents: dedupe([...state.customTalents, ref]) });

  const exportRegistry = () => JSON.stringify(state, null, 2);

  const importRegistry = (json: string) => {
    const parsed = JSON.parse(json) as Partial<RegistryState>;
    update({
      customSkills: dedupe([...state.customSkills, ...(parsed.customSkills ?? [])]),
      customTables: dedupe([...state.customTables, ...(parsed.customTables ?? [])]),
      customItems: dedupe([...state.customItems, ...(parsed.customItems ?? [])]),
      customTalents: dedupe([...state.customTalents, ...(parsed.customTalents ?? [])]),
    });
  };

  const clearRegistry = () => update({ customSkills: [], customTables: [], customItems: [], customTalents: [] });

  return (
    <RegistryContext.Provider
      value={{ ...state, addSkill, addTable, addItem, addTalent, exportRegistry, importRegistry, clearRegistry }}
    >
      {children}
    </RegistryContext.Provider>
  );
}
