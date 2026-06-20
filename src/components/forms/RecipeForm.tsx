import { useState } from "react";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";
import ReferenceSelect from "./fields/ReferenceSelect";
import { useRegistry } from "../context/RegistryContext";
import { VANILLA_ITEMS, VANILLA_SKILLS, VANILLA_TABLES } from "../../data/vanillaData";
import { generateRecipeCode, type RecipeFormValues } from "../../generators/recipeGenerator";
import type { IngredientLine, OutputLine } from "../../models/types";

let lineIdCounter = 0;
const nextId = () => `line-${lineIdCounter++}`;

type RecipeFormProps = {
  onCodeChange: (code: string, filename: string) => void;
};

export default function RecipeForm({ onCodeChange }: RecipeFormProps) {
  const registry = useRegistry();

  const [className, setClassName] = useState("TradeBasicGeologyPaper");
  const [recipeName, setRecipeName] = useState("TradeGeologyBasicPaper");
  const [displayName, setDisplayName] = useState("Trade Basic Geology Research Paper");
  const [requiredSkill, setRequiredSkill] = useState("MiningSkill");
  const [requiredLevel, setRequiredLevel] = useState(0);
  const [experience, setExperience] = useState(2);
  const [calories, setCalories] = useState(75);
  const [craftMinutes, setCraftMinutes] = useState(15);
  const [craftingTable, setCraftingTable] = useState("ResearchTableObject");

  const [ingredients, setIngredients] = useState<IngredientLine[]>([
    { id: nextId(), item: "Basic Research", quantity: 1, isStatic: true },
  ]);
  const [outputs, setOutputs] = useState<OutputLine[]>([
    { id: nextId(), item: "GeologyResearchPaperBasicItem", quantity: 1 },
  ]);

  const allSkills = [...VANILLA_SKILLS, ...registry.customSkills];
  const allTables = [...VANILLA_TABLES, ...registry.customTables];
  const allItems = [...VANILLA_ITEMS, ...registry.customItems];

  const addIngredient = () =>
    setIngredients((prev) => [...prev, { id: nextId(), item: "", quantity: 1, isStatic: false, skill: requiredSkill }]);
  const removeIngredient = (id: string) => setIngredients((prev) => prev.filter((i) => i.id !== id));
  const updateIngredient = (id: string, patch: Partial<IngredientLine>) =>
    setIngredients((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const addOutput = () => setOutputs((prev) => [...prev, { id: nextId(), item: "", quantity: 1 }]);
  const removeOutput = (id: string) => setOutputs((prev) => prev.filter((o) => o.id !== id));
  const updateOutput = (id: string, patch: Partial<OutputLine>) =>
    setOutputs((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const buildValues = (): RecipeFormValues => ({
    className,
    recipeName,
    displayName,
    requiredSkill,
    requiredLevel,
    ingredients,
    outputs,
    experienceOnCraft: experience,
    laborCalories: calories,
    craftMinutes,
    craftMinutesTalents: [],
    craftingTable,
  });

  const handleGenerate = () => {
    const code = generateRecipeCode(buildValues());
    onCodeChange(code, `${className}Recipe.cs`);
  };

  return (
    <form className="entity-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Nouvelle Recette</h3>

      <StringInput label="Nom de classe" value={className} onChange={setClassName} hint="-> génère {Nom}Recipe" />
      <StringInput label="Nom interne (recipe.Init)" value={recipeName} onChange={setRecipeName} />
      <StringInput label="Nom affiché" value={displayName} onChange={setDisplayName} />

      <ReferenceSelect
        label="Compétence requise"
        value={requiredSkill}
        vanillaOptions={VANILLA_SKILLS}
        customOptions={registry.customSkills}
        onChange={setRequiredSkill}
      />
      <NumberInput label="Niveau requis" value={requiredLevel} onChange={setRequiredLevel} min={0} max={7} />

      <h4>Ingrédients</h4>
      {ingredients.map((ing) => (
        <div key={ing.id} className="dynamic-line">
          <ReferenceSelect
            label="Item"
            value={ing.item}
            vanillaOptions={allItems}
            customOptions={[]}
            onChange={(val) => updateIngredient(ing.id, { item: val })}
          />
          <NumberInput
            label="Qté"
            value={ing.quantity}
            onChange={(val) => updateIngredient(ing.id, { quantity: val })}
            min={1}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={ing.isStatic}
              onChange={(e) => updateIngredient(ing.id, { isStatic: e.target.checked })}
            />
            Quantité fixe (ne scale pas avec les talents)
          </label>
          {!ing.isStatic && (
            <ReferenceSelect
              label="Skill associé"
              value={ing.skill ?? requiredSkill}
              vanillaOptions={allSkills}
              customOptions={[]}
              onChange={(val) => updateIngredient(ing.id, { skill: val })}
            />
          )}
          <button type="button" onClick={() => removeIngredient(ing.id)} className="btn-remove">
            Retirer
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredient} className="btn-add">
        + Ajouter un ingrédient
      </button>

      <h4>Résultats</h4>
      {outputs.map((out) => (
        <div key={out.id} className="dynamic-line">
          <ReferenceSelect
            label="Item produit"
            value={out.item}
            vanillaOptions={allItems}
            customOptions={registry.customItems}
            onChange={(val) => updateOutput(out.id, { item: val })}
          />
          <NumberInput label="Qté" value={out.quantity} onChange={(val) => updateOutput(out.id, { quantity: val })} min={1} />
          <button type="button" onClick={() => removeOutput(out.id)} className="btn-remove">
            Retirer
          </button>
        </div>
      ))}
      <button type="button" onClick={addOutput} className="btn-add">
        + Ajouter un résultat
      </button>

      <h4>Coûts</h4>
      <NumberInput label="XP gagnée" value={experience} onChange={setExperience} min={0} step={0.5} />
      <NumberInput label="Calories" value={calories} onChange={setCalories} min={0} />
      <NumberInput label="Temps (min)" value={craftMinutes} onChange={setCraftMinutes} min={0} step={0.5} />

      <ReferenceSelect
        label="Table de craft"
        value={craftingTable}
        vanillaOptions={allTables}
        customOptions={registry.customTables}
        onChange={setCraftingTable}
      />

      <button type="button" onClick={handleGenerate} className="btn-generate">
        Générer le code
      </button>
    </form>
  );
}
