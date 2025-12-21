import { useState } from "react";
import StringInput from "./fields/StringInput";

export default function ItemForm(){
    const [id, setId] = useState("");
    const [name, setName] = useState("BasicGeologyResearchPaper");
    const [displayedName, setDisplayedName] = useState("Basic Geology Research Paper Recipe");
    const [description, setDescription] = useState("Basic Geology Research Paper Recipe");
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
            <StringInput 
                label="Description" 
                value={description}
                onChange={setDescription}
            />
        </form>
    )
}