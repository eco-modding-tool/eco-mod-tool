import { useState } from "react";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";
import ReferenceSelect from "./fields/ReferenceSelect";
import { useRegistry } from "../context/RegistryContext";
import { VANILLA_ITEMS, VANILLA_SKILLS } from "../../data/vanillaData";
import { generateUpgradeCode } from "../../generators/upgradeGenerator";

type UpgradeFormProps = {
  onCodeChange: (code: string, filename: string) => void;
};

export default function UpgradeForm({ onCodeChange }: UpgradeFormProps) {
  const registry = useRegistry();

  const [prefix, setPrefix] = useState("Prospecting");
  const [ownerSkill, setOwnerSkill] = useState("ProspectingSkill");
  const [requiredLevel, setRequiredLevel] = useState(7);
  const [focusedTalent, setFocusedTalent] = useState("ProspectingFocusedSpeedTalent");
  const [parallelTalent, setParallelTalent] = useState("ProspectingParallelSpeedTalent");
  const [baseUpgradeTier, setBaseUpgradeTier] = useState("BasicUpgradeLvl4Item");
  const [efficiencyValue, setEfficiencyValue] = useState(0.55);
  const [weight, setWeight] = useState(1);
  const [laborCalories, setLaborCalories] = useState(5000);
  const [craftMinutes, setCraftMinutes] = useState(10);
  const [experienceOnCraft, setExperienceOnCraft] = useState(4);

  const allSkills = [...VANILLA_SKILLS, ...registry.customSkills];
  const allTalents = registry.customTalents; // les talents focused/parallel sont presque toujours custom

  const handleGenerate = () => {
    const code = generateUpgradeCode({
      prefix,
      ownerSkill,
      requiredLevel,
      focusedTalent,
      parallelTalent,
      baseUpgradeTier,
      efficiencyValue,
      weight,
      laborCalories,
      craftMinutes,
      experienceOnCraft,
    });
    onCodeChange(code, `${prefix}Upgrade.cs`);
  };

  return (
    <form className="entity-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Nouveau Module d'Upgrade</h3>

      <StringInput label="Préfixe (nom du métier)" value={prefix} onChange={setPrefix} hint="ex: Prospecting" />
      <ReferenceSelect
        label="Skill propriétaire"
        value={ownerSkill}
        vanillaOptions={allSkills}
        customOptions={registry.customSkills}
        onChange={setOwnerSkill}
      />
      <NumberInput label="Niveau requis" value={requiredLevel} onChange={setRequiredLevel} min={1} max={7} />

      <ReferenceSelect
        label="Talent #1 (optionnel, pour CraftMinutes)"
        value={focusedTalent}
        vanillaOptions={[]}
        customOptions={allTalents}
        onChange={setFocusedTalent}
        hint="Crée d'abord le(s) talent(s) dans l'onglet Talent si besoin. N'importe quel talent custom peut être référencé ici, le système 13.x n'impose plus de type spécifique."
      />
      <ReferenceSelect
        label="Talent #2 (optionnel, pour CraftMinutes)"
        value={parallelTalent}
        vanillaOptions={[]}
        customOptions={allTalents}
        onChange={setParallelTalent}
      />

      <ReferenceSelect
        label="Base d'upgrade requise"
        value={baseUpgradeTier}
        vanillaOptions={VANILLA_ITEMS}
        customOptions={registry.customItems}
        onChange={setBaseUpgradeTier}
        hint="ex: BasicUpgradeLvl4Item"
      />
      <NumberInput label="Efficacité totale" value={efficiencyValue} onChange={setEfficiencyValue} step={0.01} />
      <NumberInput label="Poids" value={weight} onChange={setWeight} min={0} />
      <NumberInput label="Calories" value={laborCalories} onChange={setLaborCalories} min={0} />
      <NumberInput label="Temps (min)" value={craftMinutes} onChange={setCraftMinutes} min={0} />
      <NumberInput label="XP gagnée" value={experienceOnCraft} onChange={setExperienceOnCraft} min={0} />

      <button type="button" onClick={handleGenerate} className="btn-generate">
        Générer le code
      </button>
    </form>
  );
}
