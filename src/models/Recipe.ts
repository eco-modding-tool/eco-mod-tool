import type { Item } from "./Item";
import type { Skill } from "./Skill";

export type RecipeInput = {
    item: Item;
    quantity: number;
    fixed?: boolean;
}

export type RecipeOutput = {
    item: Item;
    quantity: number;
}


export class Recipe {
    id: string;
    name: string;
    displayName : string;

    skill: Skill;
    skillLevel: number;

    inputs: RecipeInput[];
    outputs: RecipeOutput[];

    experience: number;
    calories: number;
    craftMinutes: number;

    craftingTable: string;

    constructor({
        id, 
        name, 
        displayName, 
        skill, 
        skillLevel, 
        inputs, 
        outputs, 
        experience, 
        calories, 
        craftMinutes, 
        craftingTable
    }:{
        id: string;
        name: string;
        displayName: string;
        skill: Skill;
        skillLevel: number;
        inputs: RecipeInput[];
        outputs: RecipeOutput[];
        experience: number;
        calories: number;
        craftMinutes: number;
        craftingTable: string;
    }){
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.skill = skill;
        this.skillLevel = skillLevel;
        this.inputs = inputs;
        this.outputs = outputs;
        this.experience = experience;
        this.calories = calories;
        this.craftMinutes = craftMinutes;
        this.craftingTable = craftingTable;
    }
}