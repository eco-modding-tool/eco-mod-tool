import "./NavBar.css";
import { useFormsContext, type Onglet } from "../context/FormsContext";

const TABS: { id: Onglet; label: string }[] = [
  { id: "skill", label: "SKILL" },
  { id: "talent", label: "TALENT" },
  { id: "upgrade", label: "UPGRADE" },
  { id: "table", label: "TABLE" },
  { id: "item", label: "ITEM" },
  { id: "recipe", label: "RECIPE" },
  { id: "registry", label: "REGISTRE" },
];

export default function NavBar() {
  const { onglet, setOnglet } = useFormsContext();

  return (
    <nav className="navbar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${onglet === tab.id ? "active" : ""}`}
          onClick={() => setOnglet(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
