// Générateur pour une table de craft (WorldObject + WorldObjectItem + Recipe de craft).
// Pattern validé sur CaravanCart.cs, confirmé identique en 13.x via Pond.cs
// (régénéré le 09/04/2026 par l'auteur de FishingReloaded).

export type TableFormValues = {
  className: string; // ex: "ProspectingTable" -> ProspectingTableObject
  displayName: string;
  description: string;
  ecopediaCategory: string; // ex: "Work Stations"
  ecopediaSubCategory: string; // ex: "Craft Tables"
  dimensionsX: number;
  dimensionsY: number;
  dimensionsZ: number;
  minimapCategory: string; // ex: "Crafting"
  // Recette de fabrication de la table elle-même
  buildRequiredSkill: string;
  buildRequiredLevel: number;
  ingredient1Name: string; // accepte un nom d'item entre guillemets (ex: "HewnLog") ou typeof
  ingredient1Qty: number;
  ingredient2Name: string;
  ingredient2Qty: number;
  buildLaborCalories: number;
  buildCraftMinutes: number;
  builtAtTable: string; // table où l'on fabrique CETTE table, ex: CarpentryTableObject
};

function blockOccupancyList(x: number, y: number, z: number): string {
  const lines: string[] = [];
  for (let yy = 0; yy < y; yy++) {
    for (let xx = 0; xx < x; xx++) {
      for (let zz = 0; zz < z; zz++) {
        lines.push(`            new BlockOccupancy(new Vector3i(${xx}, ${yy}, ${zz})),`);
      }
    }
  }
  return lines.join("\n");
}

export function generateTableCode(v: TableFormValues): string {
  const objectClass = `${v.className}Object`;
  const itemClass = `${v.className}Item`;
  const recipeClass = `${v.className}Recipe`;

  return `namespace Eco.Mods.TechTree
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using Eco.Core.Items;
    using Eco.Gameplay.Blocks;
    using Eco.Gameplay.Components;
    using Eco.Gameplay.Components.Auth;
    using Eco.Gameplay.DynamicValues;
    using Eco.Gameplay.Economy;
    using Eco.Gameplay.Housing;
    using Eco.Gameplay.Interactions;
    using Eco.Gameplay.Items;
    using Eco.Gameplay.Modules;
    using Eco.Gameplay.Minimap;
    using Eco.Gameplay.Objects;
    using Eco.Gameplay.Occupancy;
    using Eco.Gameplay.Players;
    using Eco.Gameplay.Property;
    using Eco.Gameplay.Skills;
    using Eco.Gameplay.Systems;
    using Eco.Gameplay.Systems.TextLinks;
    using Eco.Gameplay.Pipes.LiquidComponents;
    using Eco.Gameplay.Pipes.Gases;
    using Eco.Gameplay.Systems.NewTooltip;
    using Eco.Shared;
    using Eco.Shared.Math;
    using Eco.Shared.Localization;
    using Eco.Shared.Serialization;
    using Eco.Shared.Utils;
    using Eco.Gameplay.Components.Storage;
    using Eco.Shared.View;
    using Eco.Shared.Networking;
    using Eco.Shared.Items;
    using Eco.World.Blocks;
    using Eco.Gameplay.Housing.PropertyValues;
    using Eco.Gameplay.Civics.Objects;
    using Eco.Gameplay.Settlements;
    using static Eco.Gameplay.Housing.PropertyValues.HomeFurnishingValue;
    using Eco.Core.Controller;
    using Eco.Core.Utils;
    using Eco.Gameplay.Items.Recipes;

    [Serialized]
    [RequireComponent(typeof(OnOffComponent))]
    [RequireComponent(typeof(PropertyAuthComponent))]
    [RequireComponent(typeof(MinimapComponent))]
    [RequireComponent(typeof(LinkComponent))]
    [RequireComponent(typeof(CraftingComponent))]
    [RequireComponent(typeof(HousingComponent))]
    [RequireComponent(typeof(OccupancyRequirementComponent))]
    [RequireComponent(typeof(ForSaleComponent))]
    [Tag("Usable")]
    [Ecopedia("${v.ecopediaCategory}", "${v.ecopediaSubCategory}", subPageName: "${v.displayName}")]
    public partial class ${objectClass} : WorldObject, IRepresentsItem
    {
       public virtual Type RepresentedItemType => typeof(${itemClass});
       public override LocString DisplayName => Localizer.DoStr("${v.displayName}");
	   
       static ${objectClass}()
        {
            var BlockOccupancyList = new List<BlockOccupancy>
            {
${blockOccupancyList(v.dimensionsX, v.dimensionsY, v.dimensionsZ)}
            };

            AddOccupancy<${objectClass}>(BlockOccupancyList);
        }
		
        protected override void Initialize()
        {
            this.ModsPreInitialize();
            this.GetComponent<MinimapComponent>().SetCategory(Localizer.DoStr("${v.minimapCategory}"));
            this.ModsPostInitialize();
        }    
        
		partial void ModsPreInitialize();
        partial void ModsPostInitialize();
    }

    [Serialized]
    [LocDisplayName("${v.displayName}")]
    [LocDescription("${v.description}")]
    [IconGroup("World Object Minimap")]
    [Tag("Crafting Table")]
    [Ecopedia("${v.ecopediaCategory}", "${v.ecopediaSubCategory}", createAsSubPage: true)]
    public partial class ${itemClass} : WorldObjectItem<${objectClass}>, IPersistentData
    {
        protected override OccupancyContext GetOccupancyContext => new SideAttachedContext( 0  | DirectionAxisFlags.Down , WorldObject.GetOccupancyInfo(this.WorldObjectType));



        [Serialized, SyncToView, NewTooltipChildren(CacheAs.Instance, flags: TTFlags.AllowNonControllerTypeForChildren)] public object PersistentData { get; set; }
    }
	
    [RequiresSkill(typeof(${v.buildRequiredSkill}), ${v.buildRequiredLevel})]
    public partial class ${recipeClass} : RecipeFamily
    {
        public ${recipeClass}()
        {
            var recipe = new Recipe();
            recipe.Init(
                name: "${v.className}", 
                displayName: Localizer.DoStr("${v.displayName}"),

                ingredients: new List<IngredientElement>
                {
                    new IngredientElement("${v.ingredient1Name}", ${v.ingredient1Qty}, typeof(${v.buildRequiredSkill})),
                    new IngredientElement("${v.ingredient2Name}", ${v.ingredient2Qty}, typeof(${v.buildRequiredSkill})), //noloc
                },

                items: new List<CraftingElement>
                {
                    new CraftingElement<${itemClass}>(1)
                });
            this.Recipes = new List<Recipe> { recipe };
            this.ExperienceOnCraft = 2; 
            
            this.LaborInCalories = CreateLaborInCaloriesValue(${v.buildLaborCalories}, typeof(${v.buildRequiredSkill}));

            this.CraftMinutes = CreateCraftTimeValue(beneficiary: typeof(${recipeClass}), start: ${v.buildCraftMinutes}, skillType: typeof(${v.buildRequiredSkill}));

            this.ModsPreInitialize();
            this.Initialize(displayText: Localizer.DoStr("${v.displayName}"), recipeType: typeof(${recipeClass}));
            this.ModsPostInitialize();

            CraftingComponent.AddRecipe(tableType: typeof(${v.builtAtTable}), recipeFamily: this);
        }
        partial void ModsPreInitialize();
        partial void ModsPostInitialize();

    }

}
`;
}
