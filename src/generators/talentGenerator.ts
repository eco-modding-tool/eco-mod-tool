// Générateur pour un Talent en 13.x, basé sur le nouveau système de Bonus.
//
// IMPORTANT : ce générateur a été réécrit après avoir confirmé, par décompilation
// directe de Eco_Gameplay.dll (13.x fourni par l'utilisateur) et lecture des
// commentaires XML d'origine, que les 4 classes 12.x (FocusedWorkflowTalent,
// FrugalWorkspaceTalent, LavishWorkspaceTalent, ParallelProcessingTalent)
// N'EXISTENT PLUS en 13.x. Elles sont remplacées par un système composable :
//   Talent.Bonuses : List<Bonus>, peuplée au constructeur.
//   Bonus = Causes (List<BonusCause>, conditions à remplir) + Effects (List<BonusEffect>).
//
// Causes confirmées (Eco.Gameplay.Bonuses) : ActionCause, SkillLevelCause,
//   ResourceTagCause, ToolBonusCause, CraftBonusCause, HarvestBonusCause.
// Effects confirmés : BonusEffectAdditive, BonusEffectMultiplicative,
//   BonusEffectCappedMultiplicative, BonusEffectChance, BonusEffectOverride,
//   BonusEffectDiminishing, BonusEffectSkillMultiplier.
//
// TalentGroup garde Talents/OwningSkill/Level identiques à la 12.x (confirmé:
// OwningSkill est un champ public, Talents et Level restent des propriétés
// settable). TalentGroup gagne StarCost (override, défaut 1) et MaxTalentLevel
// (auto-calculé à 5 si un effet a ScalesWithTalentLevel=true, sinon reste à 1).
//
// NUANCE NON VÉRIFIÉE : la "cause" exacte utilisée par les talents vanilla pour
// reproduire des effets comme "seul dans la pièce" (Focused Workflow) ou "table
// jumelle dans la même pièce" (Parallel Processing) n'a pas pu être confirmée
// avec certitude (pas de classe de cause dédiée trouvée pour ça spécifiquement).
// Le code généré utilise SkillLevelCause comme cause par défaut (le talent
// s'applique dès que le joueur a la compétence), ce qui est sûr mais peut ne
// pas reproduire le comportement social exact de l'ancien système. À vérifier
// contre un talent vanilla réel du jeu si tu veux ce comportement précis.

export type BonusEffectKind =
  | "additive"
  | "multiplicative"
  | "cappedMultiplicative"
  | "chance"
  | "override";

export type TalentFormValues = {
  className: string; // ex: "ProspectingFocusedSpeed" -> ProspectingFocusedSpeedTalent
  groupClassName: string; // ex: "ProspectingFocusedWorkflow" -> ...TalentGroup
  displayName: string; // nom du bonus, ex: "Focused Workflow: Prospecting"
  ownerSkill: string; // ex: "ProspectingSkill"
  level: number; // niveau de spécialité auquel ce groupe de talents est proposé
  starCost: number; // coût en étoiles pour apprendre ce groupe (défaut vanilla = 1)
  effectKind: BonusEffectKind;
  // Paramètres d'effet (selon le type choisi)
  effectValue: number; // Additive/Multiplicative/CappedMultiplicative.Value, ou Chance.Chance (0-1)
  effectCap?: number; // CappedMultiplicative.Cap uniquement
  effectSuccessValue?: number; // Chance.SuccessValue uniquement
  // Cause : a minima le niveau de compétence minimum requis pour que le bonus s'applique
  causeMinLevel: number;
};

const EFFECT_DESCRIPTIONS: Record<BonusEffectKind, string> = {
  additive: "Ajoute une valeur fixe (ex: +1 dégât).",
  multiplicative: "Multiplie la valeur par un facteur fixe (ex: ×0.8 = -20%).",
  cappedMultiplicative: "Multiplicateur par niveau de talent, plafonné (le seul type qui rend le talent répétable jusqu'à 5 niveaux).",
  chance: "Tire une probabilité à chaque application ; en cas de succès remplace la valeur.",
  override: "Remplace entièrement la valeur (ex: débloque une recette).",
};

function generateEffectBlock(v: TalentFormValues): string {
  switch (v.effectKind) {
    case "additive":
      return `new BonusEffectAdditive { Value = ${v.effectValue}f }`;
    case "multiplicative":
      return `new BonusEffectMultiplicative { Value = ${v.effectValue}f }`;
    case "cappedMultiplicative":
      return `new BonusEffectCappedMultiplicative { Value = ${v.effectValue}f, Cap = ${v.effectCap ?? 1}f }`;
    case "chance":
      return `new BonusEffectChance { Chance = ${v.effectValue}f, SuccessValue = ${v.effectSuccessValue ?? 1}f }`;
    case "override":
      return `new BonusEffectOverride { Value = ${v.effectValue}f }`;
  }
}

export function generateTalentCode(v: TalentFormValues): string {
  const talentClass = `${v.className}Talent`;
  const groupClass = `${v.groupClassName}TalentGroup`;
  const effectBlock = generateEffectBlock(v);

  return `// ATTENTION : généré sur la base du système de Bonus confirmé en 13.x
// (décompilation de Eco_Gameplay.dll + doc XML officielle). La cause utilisée
// ici (SkillLevelCause) garantit la compilation mais peut ne pas reproduire
// un comportement social spécifique (ex: "seul dans la pièce"). Vérifie contre
// un talent vanilla équivalent si le comportement exact compte pour toi.
// Effet choisi : ${v.effectKind} — ${EFFECT_DESCRIPTIONS[v.effectKind]}

namespace Eco.Mods.TechTree
{
    using System;
    using System.Collections.Generic;
    using Eco.Gameplay.Bonuses;
    using Eco.Gameplay.Skills;
    using Eco.Shared.Localization;
    using Eco.Shared.Serialization;

    [Serialized]
    [LocDisplayName("${v.displayName}")]
    public partial class ${groupClass} : TalentGroup
    {
        public override int StarCost => ${v.starCost};

        public ${groupClass}()
        {
            this.Talents = new Type[]
            {
                typeof(${talentClass}),
            };
            this.OwningSkill = typeof(${v.ownerSkill});
            this.Level = ${v.level};
        }
    }

    [Serialized]
    public partial class ${talentClass} : Talent
    {
        public override bool Base => false;
        public override Type TalentGroupType => typeof(${groupClass});

        public ${talentClass}()
        {
            this.Bonuses.Add(new Bonus
            {
                Name = "${v.displayName}",
                Causes = new List<BonusCause>
                {
                    new SkillLevelCause { SkillType = typeof(${v.ownerSkill}), MinLevel = ${v.causeMinLevel} },
                },
                Effects = new List<BonusEffect>
                {
                    ${effectBlock},
                },
            });
        }
    }
}
`;
}
