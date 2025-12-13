import { useState } from "react";
import SelectInput from "./fields/SelectInput";
import StringInput from "./fields/StringInput";

export default function RecipeForm(){
    const [skill, setSkill] = useState("Mining");

    return(
        <>
            <StringInput 
                label="id" 
                value="BasicGeologyResearchPaperRecipe"
            />
            <StringInput 
                label="Name" 
                value="BasicGeologyResearchPaper"
            />
            <StringInput 
                label="Displayed Name" 
                value="Basic Geology Research Paper Recipe"
            />
            <SelectInput
                label="Skill"
                value={skill}
                options={["Mining", "Cooking", "Carpentry"]}
                onChange={setSkill}
            />
        </>
    )
}