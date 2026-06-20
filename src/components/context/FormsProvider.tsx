import { useState, type ReactNode } from "react";
import { FormsContext, type Onglet } from "./FormsContext";

export default function FormsProvider({ children }: { children: ReactNode }) {
  const [onglet, setOnglet] = useState<Onglet>("item");

  return <FormsContext.Provider value={{ onglet, setOnglet }}>{children}</FormsContext.Provider>;
}
