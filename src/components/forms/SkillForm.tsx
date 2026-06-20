import { useState } from "react";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";
import ReferenceSelect from "./fields/ReferenceSelect";
import { useRegistry } from "../context/RegistryContext";
import { VANILLA_ITEMS, VANILLA_SKILLS, VANILLA_TABLES } from "../../data/vanillaData";
import { generateSkillCode } from "../../generators/skillGenerator";

type SkillFormProps = {
  onCodeChange: (code: string, filename: string) => void;
};

export default function SkillForm({ onCodeChange }: SkillFormProps) {
  const registry = useRegistry();

  const [className, setClassName] = useState("Prospecting");
  const [displayName, setDisplayName] = useState("Prospecting");
  const [description, setDescription] = useState("A mining specialization in finding ore nuggets in rivers.");
  const [parentSkill, setParentSkill] = useState("MasonSkill");
  const [tag, setTag] = useState("Mason Specialty");
  const [tier, setTier] = useState(2);
  const [maxLevel, setMaxLevel] = useState(7);
  const [bookRequiredSkill, setBookRequiredSkill] = useState("MiningSkill");
  const [bookRequiredLevel, setBookRequiredLevel] = useState(1);
  const [bookIngredient1Item, setBookIngredient1Item] = useState("MetallurgyResearchPaperBasicItem");
  const [bookIngredient1Qty, setBookIngredient1Qty] = useState(5);
  const [bookIngredient2Item, setBookIngredient2Item] = useState("GeologyResearchPaperBasicItem");
  const [bookIngredient2Qty, setBookIngredient2Qty] = useState(5);
  const [bookCraftMinutes, setBookCraftMinutes] = useState(5);
  const [bookLaborCalories, setBookLaborCalories] = useState(1000);
  const [craftingTable, setCraftingTable] = useState("ResearchTableObject");

  const handleGenerate = () => {
    const code = generateSkillCode({
      className,
      displayName,
      description,
      parentSkill,
      tag,
      tier,
      maxLevel,
      bookRequiredSkill,
      bookRequiredLevel,
      bookIngredient1Item,
      bookIngredient1Qty,
      bookIngredient2Item,
      bookIngredient2Qty,
      bookCraftMinutes,
      bookLaborCalories,
      craftingTable,
    });
    onCodeChange(code, `${className}.cs`);
    registry.addSkill({ className: `${className}Skill`, label: displayName, source: "custom" });
  };

  return (
    <form className="entity-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Nouvelle Spécialité (Skill)</h3>

      <StringInput label="Nom de classe" value={className} onChange={setClassName} hint="-> génère {Nom}Skill" />
      <StringInput label="Nom affiché" value={displayName} onChange={setDisplayName} />
      <StringInput label="Description" value={description} onChange={setDescription} />

      <ReferenceSelect
        label="Métier parent"
        value={parentSkill}
        vanillaOptions={VANILLA_SKILLS}
        customOptions={registry.customSkills}
        onChange={setParentSkill}
        hint="Le métier (profession) dont cette spécialité dépend"
      />
      <StringInput label="Tag" value={tag} onChange={setTag} hint='ex: "Mason Specialty"' />
      <NumberInput label="Tier" value={tier} onChange={setTier} min={1} max={5} />
      <NumberInput label="Niveau max" value={maxLevel} onChange={setMaxLevel} min={1} max={10} />

      <h4>Skill Book (recette d'apprentissage)</h4>
      <ReferenceSelect
        label="Compétence requise"
        value={bookRequiredSkill}
        vanillaOptions={VANILLA_SKILLS}
        customOptions={registry.customSkills}
        onChange={setBookRequiredSkill}
      />
      <NumberInput label="Niveau requis" value={bookRequiredLevel} onChange={setBookRequiredLevel} min={0} max={7} />
      <ReferenceSelect
        label="Ingrédient 1"
        value={bookIngredient1Item}
        vanillaOptions={VANILLA_ITEMS}
        customOptions={registry.customItems}
        onChange={setBookIngredient1Item}
      />
      <NumberInput label="Qté ingrédient 1" value={bookIngredient1Qty} onChange={setBookIngredient1Qty} min={1} />
      <ReferenceSelect
        label="Ingrédient 2"
        value={bookIngredient2Item}
        vanillaOptions={VANILLA_ITEMS}
        customOptions={registry.customItems}
        onChange={setBookIngredient2Item}
      />
      <NumberInput label="Qté ingrédient 2" value={bookIngredient2Qty} onChange={setBookIngredient2Qty} min={1} />
      <NumberInput label="Calories" value={bookLaborCalories} onChange={setBookLaborCalories} min={0} />
      <NumberInput label="Temps (min)" value={bookCraftMinutes} onChange={setBookCraftMinutes} min={0} />
      <ReferenceSelect
        label="Table de craft"
        value={craftingTable}
        vanillaOptions={VANILLA_TABLES}
        customOptions={registry.customTables}
        onChange={setCraftingTable}
      />

      <button type="button" onClick={handleGenerate} className="btn-generate">
        Générer le code
      </button>
      <p className="form-note">
        Le skill sera automatiquement ajouté au registre pour être proposé dans les autres formulaires (recettes,
        talents, upgrade...).
      </p>
    </form>
  );
}
