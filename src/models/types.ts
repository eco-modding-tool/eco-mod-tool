// Types partagés par tous les générateurs de l'outil.

export type EntityKind = "skill" | "item" | "table" | "talent" | "upgrade";

// Une entrée de référence pour les dropdowns : soit vanilla (figée),
// soit custom (ajoutée par l'utilisateur via un générateur ou un import).
export type Reference = {
  className: string; // ex: "GoldBarItem", "CarpentryTableObject", "MiningSkill"
  label: string; // libellé humain affiché dans le menu déroulant
  source: "vanilla" | "custom";
};

export type SkillRef = Reference;
export type TableRef = Reference; // tables de craft (WorldObject types)
export type ItemRef = Reference;
export type TalentRef = Reference; // ex: typeof(XFocusedSpeedTalent)

export type IngredientLine = {
  id: string; // clé react locale
  item: string; // className de l'item, vanilla ou custom, ou texte libre ("Basic Research")
  quantity: number;
  isStatic: boolean; // true => 4ème paramètre `true` (ne scale pas avec talents), false => skillType requis
  skill?: string; // requis si !isStatic — className du skill qui scale la quantité
}

export type OutputLine = {
  id: string;
  item: string; // className de l'item produit
  quantity: number;
}
