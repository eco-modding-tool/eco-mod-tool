import { useState } from "react"
import "./NavBar.css"

export default function NavBar(){
    const [ongletActif, setOngletActif] = useState<"item" | "recipe" | "object">("item");

    return (
    <nav className="navbar">
      <button
        className={`nav-item ${ongletActif === "item" ? "active" : ""}`}
        onClick={() => setOngletActif("item")}
      >
        ITEM
      </button>

      <button
        className={`nav-item ${ongletActif === "recipe" ? "active" : ""}`}
        onClick={() => setOngletActif("recipe")}
      >
        RECIPE
      </button>
      <button
        className={`nav-item ${ongletActif === "object" ? "active" : ""}`}
        onClick={() => setOngletActif("object")}
      >
        OBJECT
      </button>
    </nav>
  );
}