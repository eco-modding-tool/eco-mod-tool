import { useState } from "react";
import SelectInput from "./fields/SelectInput";
import StringInput from "./fields/StringInput";
import NumberInput from "./fields/NumberInput";

export default function RecipeForm(){
    const [id, setId] = useState("");
    const [name, setName] = useState("BasicGeologyResearchPaper");
    const [displayedName, setDisplayedName] = useState("Basic Geology Research Paper Recipe");
    const [skill, setSkill] = useState("Mining");
    const [skillLevel, setSkillLevel] = useState(0);
    const [experience, setExperience] = useState(0.5);
    const [calories, setCalories] = useState(75);
    const [craftingTime, setCraftingTime] = useState(5);
    const [craftingTable, setCraftingTable] = useState("Workbench");
    if(id)
        return
    return(
        <form>
            <StringInput 
                label="id" 
                value={name+"Recipe"}
                readonly
                onChange={setId}
            />
            <StringInput 
                label="Name" 
                value={name}
                onChange={setName}
            />
            <StringInput 
                label="Displayed Name" 
                value={displayedName}
                onChange={setDisplayedName}
            />
            <SelectInput
                label="Skill"
                value={skill}
                options={["Mining", "Cooking", "Carpentry"]}
                onChange={setSkill}
            />
            <NumberInput
                label="Skill Level"
                value={skillLevel}
                onChange={setSkillLevel}
                min={0}
                max={7}
            />
            <>Liste Input</>
            <>Liste Output</>
            <NumberInput
                label="Experience gained"
                value={experience}
                onChange={setExperience}
                min={0}
                step={0.1}
            />
            <NumberInput
                label="Calories"
                value={calories}
                onChange={setCalories}
                min={0}
            />
            <NumberInput
                label="Crafting Time"
                value={craftingTime}
                onChange={setCraftingTime}
                min={0}
            />
            <SelectInput
                label="Crafting Table"
                value={craftingTable}
                options={["Workbench", "Carpentry Table", "Masonry Table"]}
                onChange={setCraftingTable}
            />
        </form>
    )
}