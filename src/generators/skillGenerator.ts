// Générateur pour Skill + SkillBook + SkillScroll + SkillBookRecipe.
// Pattern validé sur Trading.cs / Prospecting.cs (12.x) et confirmé identique
// en 13.x via FishingReloaded.cs (régénéré le 09/04/2026, lendemain de l'Update 13).

export type SkillFormValues = {
  className: string; // ex: "Prospecting" -> génère ProspectingSkill
  displayName: string;
  description: string;
  parentSkill: string; // ex: "MasonSkill"
  tag: string; // ex: "Mason Specialty"
  tier: number;
  maxLevel: number;
  bookRequiredSkill: string; // ex: "MiningSkill"
  bookRequiredLevel: number;
  bookIngredient1Item: string;
  bookIngredient1Qty: number;
  bookIngredient2Item: string;
  bookIngredient2Qty: number;
  bookCraftMinutes: number;
  bookLaborCalories: number;
  craftingTable: string; // table où se craft le skill book, typiquement ResearchTableObject
};

export function generateSkillCode(v: SkillFormValues): string {
  const skill = `${v.className}Skill`;
  const book = `${v.className}SkillBook`;
  const scroll = `${v.className}SkillScroll`;
  const bookRecipe = `${v.className}SkillBookRecipe`;

  return `namespace Eco.Mods.TechTree
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using Eco.Core.Items;
    using Eco.Core.Utils;
    using Eco.Core.Utils.AtomicAction;
    using Eco.Gameplay.Blocks;
    using Eco.Gameplay.Components;
    using Eco.Gameplay.DynamicValues;
    using Eco.Gameplay.Items;
    using Eco.Gameplay.Players;
    using Eco.Gameplay.Property;
    using Eco.Gameplay.Skills;
    using Eco.Gameplay.Systems;
    using Eco.Gameplay.Systems.TextLinks;
    using Eco.Shared.Localization;
    using Eco.Shared.Serialization;
    using Eco.Shared.Services;
    using Eco.Shared.Utils;
    using Gameplay.Systems.NewTooltip;
    using Eco.Gameplay.Items.Recipes;

\t[Serialized]
\t[LocDisplayName("${v.displayName}")]
\t[LocDescription("${v.description}")]
\t[Ecopedia("Professions", "${v.parentSkill.replace(/Skill$/, "")}", createAsSubPage: true)]
\t[RequiresSkill(typeof(${v.parentSkill}), 0), Tag("${v.tag}"), Tier(${v.tier})]
    [Tag("Specialty")]
    [Tag("Teachable")]
\tpublic partial class ${skill} : Skill
\t{

        public override void OnLevelUp(User user)
        {
            user.Skillset.AddExperience(typeof(SelfImprovementSkill), 20, Localizer.DoStr("for leveling up another specialization."));
        }


        public static MultiplicativeStrategy MultiplicativeStrategy =
            new MultiplicativeStrategy(new float[] { 
                1,
                1 - 0.2f,
                1 - 0.35f,
                1 - 0.3f,
                1 - 0.35f,
                1 - 0.4f,
                1 - 0.45f,
                1 - 0.5f,
            });
        public override MultiplicativeStrategy MultiStrategy => MultiplicativeStrategy;

        public static AdditiveStrategy AdditiveStrategy =
            new AdditiveStrategy(new float[] { 
                0,
                0.5f,
                0.55f,
                0.6f,
                0.65f,
                0.7f,
                0.75f,
                0.8f,
            });
        public override AdditiveStrategy AddStrategy => AdditiveStrategy;
        public override int MaxLevel { get { return ${v.maxLevel}; } }
        public override int Tier { get { return ${v.tier}; } }
    }
\t
\t[Serialized]
\t[LocDisplayName("${v.displayName} Skill Book")]
\t[Ecopedia("Items", "Skill Books", createAsSubPage: true)]
\tpublic partial class ${book} : SkillBook<${skill}, ${scroll}> {}
\t
\t[Serialized]
\t[LocDisplayName("${v.displayName} Skill Scroll")]
\tpublic partial class ${scroll} : SkillScroll<${skill}, ${book}> {}
\t
\t[RequiresSkill(typeof(${v.bookRequiredSkill}), ${v.bookRequiredLevel})]
\tpublic partial class ${bookRecipe} : RecipeFamily
\t{
\t\tpublic ${bookRecipe}()
\t\t{
\t\t\tvar recipe = new Recipe();
\t\t\trecipe.Init(
\t\t\t\t"${v.className}",
\t\t\t\tLocalizer.DoStr("${v.displayName} Skill Book"),
\t\t\t\tnew List<IngredientElement>
\t\t\t\t{
                    new IngredientElement(typeof(${v.bookIngredient1Item}), ${v.bookIngredient1Qty}, typeof(${v.bookRequiredSkill})),
                    new IngredientElement(typeof(${v.bookIngredient2Item}), ${v.bookIngredient2Qty}, typeof(${v.bookRequiredSkill})),
\t\t\t\t},
\t\t\t\tnew List<CraftingElement>
                {
                    new CraftingElement<${book}>()
                });
\t\t\tthis.Recipes = new List<Recipe> { recipe };
            this.LaborInCalories = CreateLaborInCaloriesValue(${v.bookLaborCalories}, typeof(${v.bookRequiredSkill}));
            this.CraftMinutes = CreateCraftTimeValue(typeof(${bookRecipe}), ${v.bookCraftMinutes}, typeof(${v.bookRequiredSkill}));
            this.ModsPreInitialize();
            this.Initialize(Localizer.DoStr("${v.displayName} Skill Book"), typeof(${bookRecipe}));
            this.ModsPostInitialize();
            CraftingComponent.AddRecipe(typeof(${v.craftingTable}), this);
        }

        partial void ModsPreInitialize();
        partial void ModsPostInitialize();
    }
\t\t\t\t\t
}
`;
}
