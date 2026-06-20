// Générateur pour le module d'upgrade (EfficiencyModule) + sa recette.
// Pattern validé sur ProspectingUpgrade.cs / TradingUpgrade.cs (12.x),
// confirmé identique en 13.x via FishingReloadedUpgrade.cs.

export type UpgradeFormValues = {
  prefix: string; // ex: "Prospecting" -> ProspectingUpgradeItem / ProspectingUpgradeRecipe
  ownerSkill: string; // ex: "ProspectingSkill"
  requiredLevel: number;
  focusedTalent: string; // ex: "ProspectingFocusedSpeedTalent" (pour CraftMinutes)
  parallelTalent: string; // ex: "ProspectingParallelSpeedTalent"
  baseUpgradeTier: string; // ex: "BasicUpgradeLvl4Item"
  efficiencyValue: number; // ex: 0.55 (0.5 base + 0.05 bonus, déjà calculé)
  weight: number;
  laborCalories: number;
  craftMinutes: number;
  experienceOnCraft: number;
};

export function generateUpgradeCode(v: UpgradeFormValues): string {
  const recipeClass = `${v.prefix}UpgradeRecipe`;
  const itemClass = `${v.prefix}UpgradeItem`;

  return `namespace Eco.Mods.TechTree
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using Eco.Gameplay.Blocks;
    using Eco.Gameplay.Components;
    using Eco.Gameplay.DynamicValues;
    using Eco.Gameplay.Items;
    using Eco.Gameplay.Modules;
    using Eco.Gameplay.Objects;
    using Eco.Gameplay.Players;
    using Eco.Gameplay.Skills;
    using Eco.Gameplay.Systems;
    using Eco.Gameplay.Systems.TextLinks;
    using Eco.Shared.Localization;
    using Eco.Shared.Serialization;
    using Eco.Shared.Utils;
    using Eco.Core.Items;
    using Eco.World;
    using Eco.World.Blocks;
    using Eco.Gameplay.Pipes;
    using Eco.Gameplay.Items.Recipes;
	
	[RequiresSkill(typeof(${v.ownerSkill}), ${v.requiredLevel})]
	public partial class ${recipeClass} : RecipeFamily
	{
		public ${recipeClass}()
		{
			this.Recipes = new List<Recipe>
			{
				new Recipe(
					"${v.prefix} Upgrade",
					Localizer.DoStr("${v.prefix} Upgrade"),
					new IngredientElement[]
                    {
					new IngredientElement(typeof(${v.baseUpgradeTier}), 1, true),  
                    },
                    new CraftingElement[]
                    {
                        new CraftingElement<${itemClass}>(), 
                    }
					)
			};


            this.ExperienceOnCraft = ${v.experienceOnCraft};  

            this.LaborInCalories = CreateLaborInCaloriesValue(${v.laborCalories}, typeof(${v.ownerSkill})); 
            this.CraftMinutes = CreateCraftTimeValue(typeof(${recipeClass}), ${v.craftMinutes}, typeof(${v.ownerSkill}), typeof(${v.focusedTalent}), typeof(${v.parallelTalent}));     
            this.ModsPreInitialize();
            this.Initialize(Localizer.DoStr("${v.prefix} Upgrade"), typeof(${recipeClass}));
            this.ModsPostInitialize();

            CraftingComponent.AddRecipe(typeof(WorkbenchObject), this);
        }

        partial void ModsPreInitialize();
        partial void ModsPostInitialize();
    }

    [Serialized]
    [LocDisplayName("${v.prefix} Upgrade")]
    [Weight(${v.weight})]      
    [Ecopedia("Upgrade Modules", "Specialty Upgrades", createAsSubPage: true)]                                                                           
    [Tag("Upgrade")]
    public partial class ${itemClass} :
        EfficiencyModule 
    {
        public LocString DisplayDescription { get { return Localizer.DoStr("Basic Upgrade that greatly increases efficiency when crafting ${v.prefix} recipes."); } }

        public ${itemClass}() : base(
            ModuleTypes.ResourceEfficiency | ModuleTypes.SpeedEfficiency,
            ${v.efficiencyValue}f, 
            typeof(${v.ownerSkill}),   
            0.5f          
        ) { }
    }
}
`;
}
