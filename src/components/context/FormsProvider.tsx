import { useState, type ReactElement } from "react";
import { FormsContext } from "./FormsContext";

type ContextProps = {
    children: ReactElement | ReactElement[];
}

export default function Context({children}:ContextProps){
    const [onglet, setOnglet] = useState<'item' | 'recipe' | 'object'>('item');

    return(
        <FormsContext.Provider value={{
            onglet,
            setOnglet,
            }}>
            {children}
        </FormsContext.Provider>
    )
}