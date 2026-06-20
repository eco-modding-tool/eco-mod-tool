# ECO Mod Tool

Générateur de code C# pour mods ECO (Eco.Mods.TechTree), basé sur les patterns
validés en 13.x (cross-checké avec Fishing Reloaded, mis à jour le 09/04/2026).

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (par défaut http://localhost:5173).

## Build de production

```bash
npm run build
```

Le résultat est dans `dist/`, un site statique que tu peux ouvrir directement
ou héberger n'importe où (pas besoin de backend).

## Fonctionnement général

- Chaque onglet (SKILL, TALENT, UPGRADE, TABLE, ITEM, RECIPE) correspond à un
  générateur dans `src/generators/`.
- Le code généré apparaît à droite, avec boutons Copier / Télécharger .cs.
- Les skills, tables, items et talents que tu crées sont automatiquement
  ajoutés au **registre** (onglet REGISTRE) et réapparaissent ensuite dans les
  menus déroulants des autres formulaires.
- Le registre est sauvegardé dans le `localStorage` du navigateur, donc il
  persiste entre les sessions sur le même poste/navigateur.
- Tu peux **exporter** le registre en `.json` pour le sauvegarder ou le
  transmettre, et **importer** un registre existant (le tien, ou celui
  fourni par quelqu'un d'autre travaillant sur le même mod ou un mod tiers
  dont tu veux référencer les classes).

## Étendre l'outil

### Ajouter des entrées vanilla aux dropdowns

Modifie `src/data/vanillaData.ts`. Les listes `VANILLA_SKILLS`,
`VANILLA_TABLES`, `VANILLA_ITEMS` sont de simples tableaux à compléter avec
les noms de classes réels trouvés dans le ModKit (`Eco.Gameplay.Skills`,
etc.).

### Ajouter un nouveau type de générateur

1. Crée `src/generators/xxxGenerator.ts` avec une fonction
   `generateXxxCode(values) => string` qui retourne le code C#.
2. Crée le formulaire correspondant dans `src/components/forms/XxxForm.tsx`
   (copie un formulaire existant comme modèle, ex. `ItemForm.tsx`).
3. Ajoute l'onglet dans `src/components/context/FormsContext.ts` (type
   `Onglet`) et dans `src/components/layout/NavBar.tsx`.
4. Branche le formulaire dans `src/PageContent.tsx`.

### Limitations connues

- Le formulaire Skill ne propose que 2 ingrédients pour le Skill Book (les
  recettes vanilla en ont parfois 3, voir `Prospecting.cs` original avec son
  "Basic Research" en plus). Ajoute une liste dynamique similaire à celle de
  `RecipeForm.tsx` si besoin.
- `TableForm` ne gère que des pavés pleins (X×Y×Z). Si ta table a une forme
  irrégulière, génère le code puis édite manuellement la liste
  `BlockOccupancy`.
- Le générateur de recette suppose un seul `Recipe` par `RecipeFamily`
  (comme dans tous les fichiers de référence fournis). Les familles à recettes
  alternatives multiples ne sont pas couvertes.

## Vérifications effectuées

Les générateurs Skill, Recipe, Table et Upgrade ont été testés en comparant
leur sortie caractère pour caractère avec `Prospecting.cs`, `TradeGeologyBasic.cs`,
`CaravanCart.cs` et `ProspectingUpgrade.cs` (fichiers originaux 12.x, confirmés
compatibles 13.x via comparaison avec un mod tiers régénéré le 09/04/2026).

Le générateur **Talent** a été entièrement réécrit après décompilation directe
de `Eco_Gameplay.dll` (13.x) et lecture des commentaires XML d'origine. Les 4
anciennes classes (`FocusedWorkflowTalent`, `FrugalWorkspaceTalent`,
`LavishWorkspaceTalent`, `ParallelProcessingTalent`) n'existent plus en 13.x.
Le nouveau système repose sur `Talent.Bonuses` (liste de `Bonus`, chacun
combinant des `Causes` et des `Effects`). Voir le commentaire en tête de
`src/generators/talentGenerator.ts` pour le détail des classes confirmées
(`SkillLevelCause`, `BonusEffectCappedMultiplicative`, etc.) et la nuance non
vérifiée (la cause exacte utilisée par les talents vanilla pour des
comportements sociaux comme "seul dans la pièce" n'a pas pu être confirmée
avec certitude — le générateur utilise `SkillLevelCause` par défaut, qui
compile et fonctionne mais peut différer du comportement vanilla exact).

`TalentGroup` garde `Talents`/`OwningSkill`/`Level` à l'identique de la 12.x
(confirmé : `OwningSkill` est un champ public, les deux autres restent des
propriétés settable). Il gagne `StarCost` (override, défaut 1 si omis) et
`MaxTalentLevel` (auto-calculé à 5 si un effet a `ScalesWithTalentLevel=true`,
sinon reste à 1 — non configurable manuellement dans ce générateur pour
l'instant, le jeu le déduit automatiquement).

`CreateCraftTimeValue`/`CreateLaborInCaloriesValue` (utilisés par Recipe et
Upgrade) ont une signature inchangée en 13.x (confirmé par décompilation) :
ils acceptent toujours un tableau de `Type` de talents, donc les noms de
classes de talents générés par le nouveau `TalentForm` s'y branchent sans
adaptation.
