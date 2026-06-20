import { useState } from "react";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";
import { useRegistry } from "../context/RegistryContext";
import { generateItemCode } from "../../generators/itemGenerator";

type ItemFormProps = {
  onCodeChange: (code: string, filename: string) => void;
};

export default function ItemForm({ onCodeChange }: ItemFormProps) {
  const registry = useRegistry();

  const [className, setClassName] = useState("FishOil");
  const [displayName, setDisplayName] = useState("Fish Oil");
  const [description, setDescription] = useState("A by-product of fish processing.");
  const [weight, setWeight] = useState(1);
  const [ecopediaCategory, setEcopediaCategory] = useState("Items");
  const [ecopediaSubCategory, setEcopediaSubCategory] = useState("Resources");

  const handleGenerate = () => {
    const code = generateItemCode({
      className,
      displayName,
      description,
      weight,
      ecopediaCategory,
      ecopediaSubCategory,
    });
    onCodeChange(code, `${className}Item.cs`);
    registry.addItem({ className: `${className}Item`, label: displayName, source: "custom" });
  };

  return (
    <form className="entity-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Nouvel Item</h3>
      <StringInput label="Nom de classe" value={className} onChange={setClassName} hint="-> génère {Nom}Item" />
      <StringInput label="Nom affiché" value={displayName} onChange={setDisplayName} />
      <StringInput label="Description" value={description} onChange={setDescription} />
      <NumberInput label="Poids" value={weight} onChange={setWeight} min={0} />
      <StringInput label="Ecopedia catégorie" value={ecopediaCategory} onChange={setEcopediaCategory} />
      <StringInput label="Ecopedia sous-catégorie" value={ecopediaSubCategory} onChange={setEcopediaSubCategory} />

      <button type="button" onClick={handleGenerate} className="btn-generate">
        Générer le code
      </button>
      <p className="form-note">L'item sera automatiquement ajouté au registre pour être proposé ailleurs.</p>
    </form>
  );
}
