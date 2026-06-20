// Générateur pour un item simple (non-WorldObject), ex: une recherche, une matière
// première custom. Pattern simplifié, suffisant pour un item sans logique spéciale.

export type ItemFormValues = {
  className: string; // ex: "FishOil" -> FishOilItem
  displayName: string;
  description: string;
  weight: number;
  ecopediaCategory: string;
  ecopediaSubCategory: string;
};

export function generateItemCode(v: ItemFormValues): string {
  const itemClass = `${v.className}Item`;
  return `namespace Eco.Mods.TechTree
{
    using System;
    using Eco.Gameplay.Items;
    using Eco.Shared.Localization;
    using Eco.Shared.Serialization;
    using Eco.Gameplay.Systems.TextLinks;

    [Serialized]
    [LocDisplayName("${v.displayName}")]
    [LocDescription("${v.description}")]
    [Weight(${v.weight})]
    [Ecopedia("${v.ecopediaCategory}", "${v.ecopediaSubCategory}", createAsSubPage: true)]
    public partial class ${itemClass} : Item
    {
    }
}
`;
}
