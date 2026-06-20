import { useState } from "react";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";
import SelectInput from "./fields/SelectInput";
import ReferenceSelect from "./fields/ReferenceSelect";
import { useRegistry } from "../context/RegistryContext";
import { VANILLA_SKILLS } from "../../data/vanillaData";
import { generateTalentCode, type BonusEffectKind } from "../../generators/talentGenerator";

type TalentFormProps = {
  onCodeChange: (code: string, filename: string) => void;
};

const EFFECT_LABELS: Record<BonusEffectKind, string> = {
  additive: "Additive (+valeur fixe)",
  multiplicative: "Multiplicative (×facteur fixe)",
  cappedMultiplicative: "Multiplicative plafonnée (répétable jusqu'à 5 niveaux)",
  chance: "À chance (probabilité de remplacer la valeur)",
  override: "Override (remplace entièrement la valeur)",
};

export default function TalentForm({ onCodeChange }: TalentFormProps) {
  const registry = useRegistry();

  const [className, setClassName] = useState("ProspectingFocusedSpeed");
  const [groupClassName, setGroupClassName] = useState("ProspectingFocusedWorkflow");
  const [displayName, setDisplayName] = useState("Focused Workflow: Prospecting");
  const [ownerSkill, setOwnerSkill] = useState("ProspectingSkill");
  const [level, setLevel] = useState(3);
  const [starCost, setStarCost] = useState(1);
  const [effectKind, setEffectKind] = useState<BonusEffectKind>("cappedMultiplicative");
  const [effectValue, setEffectValue] = useState(0.9);
  const [effectCap, setEffectCap] = useState(0.5);
  const [effectSuccessValue, setEffectSuccessValue] = useState(1);
  const [causeMinLevel, setCauseMinLevel] = useState(0);

  const allSkills = [...VANILLA_SKILLS, ...registry.customSkills];

  const handleGenerate = () => {
    const code = generateTalentCode({
      className,
      groupClassName,
      displayName,
      ownerSkill,
      level,
      starCost,
      effectKind,
      effectValue,
      effectCap,
      effectSuccessValue,
      causeMinLevel,
    });
    onCodeChange(code, `${className}Talent.cs`);
    registry.addTalent({ className: `${className}Talent`, label: displayName, source: "custom" });
  };

  return (
    <form className="entity-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Nouveau Talent (système 13.x)</h3>
      <p className="form-note">
        Le système de talents a été refondu en Update 13 : les anciens types (Focused Workflow, Frugal/Lavish
        Workspace, Parallel Processing) n'existent plus en tant que classes. À la place, un talent ajoute un{" "}
        <code>Bonus</code> (cause + effet) à sa liste <code>Bonuses</code>. Ce générateur a été vérifié par
        décompilation directe de <code>Eco_Gameplay.dll</code> (13.x).
      </p>

      <StringInput
        label="Nom de classe du talent"
        value={className}
        onChange={setClassName}
        hint="-> génère {Nom}Talent"
      />
      <StringInput
        label="Nom de classe du groupe"
        value={groupClassName}
        onChange={setGroupClassName}
        hint="-> génère {Nom}TalentGroup"
      />
      <StringInput label="Nom affiché" value={displayName} onChange={setDisplayName} />

      <ReferenceSelect
        label="Skill propriétaire"
        value={ownerSkill}
        vanillaOptions={allSkills}
        customOptions={registry.customSkills}
        onChange={setOwnerSkill}
      />
      <NumberInput label="Niveau de spécialité requis" value={level} onChange={setLevel} min={1} max={7} />
      <NumberInput label="Coût en étoiles" value={starCost} onChange={setStarCost} min={1} />

      <h4>Cause (condition d'application)</h4>
      <p className="form-note">
        Cause par défaut : actif dès que le joueur a la compétence au niveau minimum. D'autres causes existent
        (outil utilisé, tag de ressource...) mais ne sont pas encore couvertes par ce formulaire.
      </p>
      <NumberInput label="Niveau de compétence minimum" value={causeMinLevel} onChange={setCauseMinLevel} min={0} max={7} />

      <h4>Effet</h4>
      <SelectInput
        label="Type d'effet"
        value={effectKind}
        options={Object.keys(EFFECT_LABELS)}
        onChange={(v) => setEffectKind(v as BonusEffectKind)}
      />
      <p className="form-note">{EFFECT_LABELS[effectKind]}</p>

      {(effectKind === "additive" || effectKind === "multiplicative" || effectKind === "cappedMultiplicative" || effectKind === "override") && (
        <NumberInput label="Valeur" value={effectValue} onChange={setEffectValue} step={0.05} />
      )}
      {effectKind === "cappedMultiplicative" && (
        <NumberInput label="Plafond cumulé (Cap)" value={effectCap} onChange={setEffectCap} step={0.05} />
      )}
      {effectKind === "chance" && (
        <>
          <NumberInput label="Probabilité (0-1)" value={effectValue} onChange={setEffectValue} min={0} max={1} step={0.05} />
          <NumberInput label="Valeur si succès" value={effectSuccessValue} onChange={setEffectSuccessValue} step={0.1} />
        </>
      )}

      <button type="button" onClick={handleGenerate} className="btn-generate">
        Générer le code
      </button>
    </form>
  );
}
