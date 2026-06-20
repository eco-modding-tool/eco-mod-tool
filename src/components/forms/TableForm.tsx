import { useState } from "react";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";
import ReferenceSelect from "./fields/ReferenceSelect";
import { useRegistry } from "../context/RegistryContext";
import { VANILLA_SKILLS, VANILLA_TABLES } from "../../data/vanillaData";
import { generateTableCode } from "../../generators/tableGenerator";

type TableFormProps = {
  onCodeChange: (code: string, filename: string) => void;
};

export default function TableForm({ onCodeChange }: TableFormProps) {
  const registry = useRegistry();

  const [className, setClassName] = useState("ProspectingTable");
  const [displayName, setDisplayName] = useState("Prospecting Table");
  const [description, setDescription] = useState("A table for prospecting research.");
  const [ecopediaCategory, setEcopediaCategory] = useState("Work Stations");
  const [ecopediaSubCategory, setEcopediaSubCategory] = useState("Craft Tables");
  const [dimX, setDimX] = useState(3);
  const [dimY, setDimY] = useState(2);
  const [dimZ, setDimZ] = useState(3);
  const [minimapCategory, setMinimapCategory] = useState("Crafting");

  const [buildRequiredSkill, setBuildRequiredSkill] = useState("LoggingSkill");
  const [buildRequiredLevel, setBuildRequiredLevel] = useState(4);
  const [ingredient1Name, setIngredient1Name] = useState("HewnLog");
  const [ingredient1Qty, setIngredient1Qty] = useState(10);
  const [ingredient2Name, setIngredient2Name] = useState("WoodBoard");
  const [ingredient2Qty, setIngredient2Qty] = useState(6);
  const [buildLaborCalories, setBuildLaborCalories] = useState(300);
  const [buildCraftMinutes, setBuildCraftMinutes] = useState(4);
  const [builtAtTable, setBuiltAtTable] = useState("CarpentryTableObject");

  const handleGenerate = () => {
    const code = generateTableCode({
      className,
      displayName,
      description,
      ecopediaCategory,
      ecopediaSubCategory,
      dimensionsX: dimX,
      dimensionsY: dimY,
      dimensionsZ: dimZ,
      minimapCategory,
      buildRequiredSkill,
      buildRequiredLevel,
      ingredient1Name,
      ingredient1Qty,
      ingredient2Name,
      ingredient2Qty,
      buildLaborCalories,
      buildCraftMinutes,
      builtAtTable,
    });
    onCodeChange(code, `${className}.cs`);
    registry.addTable({ className: `${className}Object`, label: displayName, source: "custom" });
  };

  return (
    <form className="entity-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Nouvelle Table de Craft</h3>

      <StringInput label="Nom de classe" value={className} onChange={setClassName} hint="-> génère {Nom}Object / {Nom}Item" />
      <StringInput label="Nom affiché" value={displayName} onChange={setDisplayName} />
      <StringInput label="Description" value={description} onChange={setDescription} />
      <StringInput label="Ecopedia catégorie" value={ecopediaCategory} onChange={setEcopediaCategory} />
      <StringInput label="Ecopedia sous-catégorie" value={ecopediaSubCategory} onChange={setEcopediaSubCategory} />
      <StringInput label="Catégorie minimap" value={minimapCategory} onChange={setMinimapCategory} />

      <h4>Dimensions (en blocs)</h4>
      <NumberInput label="Largeur (X)" value={dimX} onChange={setDimX} min={1} max={10} />
      <NumberInput label="Hauteur (Y)" value={dimY} onChange={setDimY} min={1} max={10} />
      <NumberInput label="Profondeur (Z)" value={dimZ} onChange={setDimZ} min={1} max={10} />
      <p className="form-note">
        Génère automatiquement la liste de BlockOccupancy pour un pavé {dimX}×{dimY}×{dimZ}. Adapte si la forme n'est
        pas un pavé plein.
      </p>

      <h4>Recette de fabrication de la table</h4>
      <ReferenceSelect
        label="Compétence requise"
        value={buildRequiredSkill}
        vanillaOptions={VANILLA_SKILLS}
        customOptions={registry.customSkills}
        onChange={setBuildRequiredSkill}
      />
      <NumberInput label="Niveau requis" value={buildRequiredLevel} onChange={setBuildRequiredLevel} min={0} max={7} />
      <StringInput label="Ingrédient 1 (nom)" value={ingredient1Name} onChange={setIngredient1Name} />
      <NumberInput label="Qté ingrédient 1" value={ingredient1Qty} onChange={setIngredient1Qty} min={1} />
      <StringInput label="Ingrédient 2 (nom)" value={ingredient2Name} onChange={setIngredient2Name} />
      <NumberInput label="Qté ingrédient 2" value={ingredient2Qty} onChange={setIngredient2Qty} min={1} />
      <NumberInput label="Calories" value={buildLaborCalories} onChange={setBuildLaborCalories} min={0} />
      <NumberInput label="Temps (min)" value={buildCraftMinutes} onChange={setBuildCraftMinutes} min={0} />
      <ReferenceSelect
        label="Fabriquée sur"
        value={builtAtTable}
        vanillaOptions={VANILLA_TABLES}
        customOptions={registry.customTables}
        onChange={setBuiltAtTable}
      />

      <button type="button" onClick={handleGenerate} className="btn-generate">
        Générer le code
      </button>
      <p className="form-note">La table sera automatiquement ajoutée au registre pour être proposée ailleurs.</p>
    </form>
  );
}
