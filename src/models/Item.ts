export class Item {
    id: string;
    name: string;
    displayedName: string;
    description: string;

    constructor(id: string, name:string, displayedName:string, description:string){
        this.id = id;
        this.name = name;
        this.displayedName = displayedName;
        this.description = description;
    }
}