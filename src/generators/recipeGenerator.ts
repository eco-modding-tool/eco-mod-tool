import type { IngredientLine, OutputLine } from "../models/types";

export type RecipeFormValues = {
  className: string; // ex: "TradeBasicGeologyPaper" -> TradeBasicGeologyPaperRecipe
  recipeName: string; // identifiant interne passé à recipe.Init (ex: "TradeGeologyBasicPaper")
  displayName: string;
  requiredSkill: string;
  requiredLevel: number;
  ingredients: IngredientLine[];
  outputs: OutputLine[];
  experienceOnCraft: number;
  laborCalories: number;
  craftMinutes: number;
  craftMinutesTalents: string[]; // ex: ["TradingFocusedSpeedTalent", "TradingParallelSpeedTalent"]
  craftingTable: string;
};

function formatIngredient(ing: IngredientLine): string {
  // Si la chaîne contient des espaces ou ressemble à un libellé ("Basic Research"),
  // on la traite comme un identifiant générique (string), sinon comme typeof(Item).
  const itemExpr = ing.item.includes(" ") ? `"${ing.item}"` : `typeof(${ing.item})`;
  if (ing.isStatic) {
    return `                    new IngredientElement(${itemExpr}, ${ing.quantity}, true),`;
  }
  return `                    new IngredientElement(${itemExpr}, ${ing.quantity}, typeof(${ing.skill ?? "SelfImprovementSkill"})),`;
}

function formatOutput(out: OutputLine): string {
  return `                    new CraftingElement<${out.item}>(${out.quantity}),`;
}

export function generateRecipeCode(v: RecipeFormValues): string {
  const recipeClass = `${v.className}Recipe`;
  const talentsParams = v.craftMinutesTalents.length > 0 ? `, ${v.craftMinutesTalents.map((t) => `typeof(${t})`).join(", ")}` : "";

  return `namespace Eco.Mods.TechTree
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using Eco.Gameplay.Blocks;
    using Eco.Gameplay.Components;
    using Eco.Gameplay.DynamicValues;
    using Eco.Gameplay.Items;
    using Eco.Gameplay.Objects;
    using Eco.Gameplay.Players;
    using Eco.Gameplay.Skills;
    using Eco.Gameplay.Settlements;
    using Eco.Gameplay.Systems;
    using Eco.Gameplay.Systems.TextLinks;
    using Eco.Shared.Localization;
    using Eco.Shared.Serialization;
    using Eco.Shared.Utils;
    using Eco.Core.Items;
    using Eco.World;
    using Eco.World.Blocks;
    using Eco.Gameplay.Pipes;
    using Eco.Core.Controller;
    using Eco.Gameplay.Items.Recipes;

    [RequiresSkill(typeof(${v.requiredSkill}), ${v.requiredLevel})]
    public partial class ${recipeClass} : RecipeFamily
    {
        public ${recipeClass}()
        {
            var recipe = new Recipe();
            recipe.Init(
                name: "${v.recipeName}", 
                displayName: Localizer.DoStr("${v.displayName}"),

                ingredients: new List<IngredientElement>
                {
${v.ingredients.map(formatIngredient).join("\n")}
                },

                items: new List<CraftingElement>
                {
${v.outputs.map(formatOutput).join("\n")}
                });
            this.Recipes = new List<Recipe> { recipe };
            this.ExperienceOnCraft = ${v.experienceOnCraft}; 
            
            this.LaborInCalories = CreateLaborInCaloriesValue(${v.laborCalories}, typeof(${v.requiredSkill}));

            this.CraftMinutes = CreateCraftTimeValue(beneficiary: typeof(${recipeClass}), start: ${v.craftMinutes}f, skillType: typeof(${v.requiredSkill})${talentsParams});

            this.ModsPreInitialize();
            this.Initialize(displayText: Localizer.DoStr("${v.displayName}"), recipeType: typeof(${recipeClass}));
            this.ModsPostInitialize();

            CraftingComponent.AddRecipe(tableType: typeof(${v.craftingTable}), recipeFamily: this);
        }
        partial void ModsPreInitialize();
        partial void ModsPostInitialize();
    }
}
`;
}
