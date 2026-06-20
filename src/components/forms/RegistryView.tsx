import { useRef, useState } from "react";
import { useRegistry } from "../context/RegistryContext";

export default function RegistryView() {
  const registry = useRegistry();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const handleExport = () => {
    const blob = new Blob([registry.exportRegistry()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eco-mod-registry.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (file: File) => {
    try {
      const text = await file.text();
      registry.importRegistry(text);
      setImportError(null);
    } catch {
      setImportError("Fichier JSON invalide ou illisible.");
    }
  };

  return (
    <div className="entity-form">
      <h3>Registre des entités custom</h3>
      <p className="form-note">
        Toutes les entités créées dans cet outil sont enregistrées ici et proposées dans les menus déroulants des
        autres formulaires. Tu peux exporter ce registre pour le sauvegarder, ou en importer un (le tien d'une
        session précédente, ou celui d'un autre mod) pour fusionner ses entités dans les dropdowns.
      </p>

      <div className="registry-actions">
        <button type="button" onClick={handleExport} className="btn-generate">
          Exporter le registre (.json)
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-add">
          Importer un registre (.json)
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm("Vider tout le registre custom ? Cette action est irréversible.")) registry.clearRegistry();
          }}
          className="btn-remove"
        >
          Vider le registre
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImportFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {importError && <p className="form-error">{importError}</p>}

      <RegistrySection title="Skills" items={registry.customSkills} />
      <RegistrySection title="Tables de craft" items={registry.customTables} />
      <RegistrySection title="Items" items={registry.customItems} />
      <RegistrySection title="Talents" items={registry.customTalents} />
    </div>
  );
}

function RegistrySection({ title, items }: { title: string; items: { className: string; label: string }[] }) {
  return (
    <div className="registry-section">
      <h4>
        {title} ({items.length})
      </h4>
      {items.length === 0 ? (
        <p className="form-note">Aucune entrée.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.className}>
              <code>{item.className}</code> — {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
