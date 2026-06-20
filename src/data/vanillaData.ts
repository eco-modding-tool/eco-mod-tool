import type { Reference } from "../models/types";

// Liste des skills vanilla rencontrés dans les mods de référence (Trading.cs,
// Prospecting.cs, FishingReloaded.cs) + skills de base connues d'ECO.
// Source : noms de classes réellement utilisés dans les RequiresSkill/IngredientElement
// des fichiers fournis. Cette liste est volontairement éditable : complète-la au
// besoin depuis le ModKit (Eco.Gameplay.Skills namespace) si une skill manque.
export const VANILLA_SKILLS: Reference[] = [
  { className: "MiningSkill", label: "Mining", source: "vanilla" },
  { className: "MasonSkill", label: "Mason", source: "vanilla" },
  { className: "TailorSkill", label: "Tailor", source: "vanilla" },
  { className: "HunterSkill", label: "Hunter", source: "vanilla" },
  { className: "HuntingSkill", label: "Hunting", source: "vanilla" },
  { className: "LoggingSkill", label: "Logging", source: "vanilla" },
  { className: "SelfImprovementSkill", label: "Self Improvement", source: "vanilla" },
  { className: "CarpentrySkill", label: "Carpentry", source: "vanilla" },
  { className: "SmithingSkill", label: "Smithing", source: "vanilla" },
  { className: "CookingSkill", label: "Cooking", source: "vanilla" },
  { className: "FarmingSkill", label: "Farming", source: "vanilla" },
  { className: "ChemistrySkill", label: "Chemistry", source: "vanilla" },
  { className: "EngineeringSkill", label: "Engineering", source: "vanilla" },
  { className: "ElectricalEngineeringSkill", label: "Electrical Engineering", source: "vanilla" },
];

// Tables de craft vanilla utilisées comme cible de CraftingComponent.AddRecipe.
export const VANILLA_TABLES: Reference[] = [
  { className: "ResearchTableObject", label: "Research Table", source: "vanilla" },
  { className: "WorkbenchObject", label: "Workbench", source: "vanilla" },
  { className: "CarpentryTableObject", label: "Carpentry Table", source: "vanilla" },
  { className: "MasonryTableObject", label: "Masonry Table", source: "vanilla" },
  { className: "CampfireObject", label: "Campfire", source: "vanilla" },
  { className: "BlastFurnaceObject", label: "Blast Furnace", source: "vanilla" },
  { className: "MetalworkingTableObject", label: "Metalworking Table", source: "vanilla" },
];

// Items vanilla fréquemment utilisés en ingrédient (vus dans les fichiers fournis).
export const VANILLA_ITEMS: Reference[] = [
  { className: "MetallurgyResearchPaperBasicItem", label: "Metallurgy Research Paper (Basic)", source: "vanilla" },
  { className: "GeologyResearchPaperBasicItem", label: "Geology Research Paper (Basic)", source: "vanilla" },
  { className: "CulinaryResearchPaperBasicItem", label: "Culinary Research Paper (Basic)", source: "vanilla" },
  { className: "GatheringResearchPaperBasicItem", label: "Gathering Research Paper (Basic)", source: "vanilla" },
  { className: "GoldBarItem", label: "Gold Bar", source: "vanilla" },
  { className: "BasicUpgradeLvl4Item", label: "Basic Upgrade Lvl 4", source: "vanilla" },
  { className: "HewnLogItem", label: "Hewn Log", source: "vanilla" },
  { className: "WoodBoardItem", label: "Wood Board", source: "vanilla" },
];

// Talents génériques de base (non liés à une spécialité) — servent de modèle
// pour la génération de talents custom, pas de dropdown direct ici.
export const TALENT_BASE_TYPES = [
  "FocusedWorkflowTalent",
  "FrugalWorkspaceTalent",
  "LavishWorkspaceTalent",
  "ParallelProcessingTalent",
] as const;
