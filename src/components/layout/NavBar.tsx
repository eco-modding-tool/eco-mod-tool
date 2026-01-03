import "./NavBar.css"
import { useFormsContext } from "../context/FormsContext";

export default function NavBar() {
  const context = useFormsContext();
  const {onglet, setOnglet} = context;

  return (
    <nav className="navbar">
      <button
        className={`nav-item ${onglet === "item" ? "active" : ""}`}
        onClick={() => setOnglet("item")}
      >
        ITEM
      </button>

      <button
        className={`nav-item ${onglet === "recipe" ? "active" : ""}`}
        onClick={() => setOnglet("recipe")}
      >
        RECIPE
      </button>
      <button
        className={`nav-item ${onglet === "object" ? "active" : ""}`}
        onClick={() => setOnglet("object")}
      >
        OBJECT
      </button>
    </nav>
  );
}