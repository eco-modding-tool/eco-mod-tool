import "./PageContent.css"
import { useFormsContext } from "./components/context/FormsContext";
import CodeBlock from "./components/display/ShowCode";
import ItemForm from "./components/forms/ItemForm";
import ObjectForm from "./components/forms/ObjectForm";
import RecipeForm from "./components/forms/RecipeForm";

export default function PageContent() {
    const { onglet } = useFormsContext();
    let codeContent = '';
    let FormComponent;

    switch (onglet) {
        case "item":
            FormComponent = <ItemForm />;
            codeContent = "Code lié à ITEM";
            break;
        case "recipe":
            FormComponent = <RecipeForm />;
            codeContent = "Code lié à RECIPE";
            break;
        case "object":
            FormComponent = <ObjectForm />;
            codeContent = "Code lié à OBJECT";
            break;
    }

    return (
        <div className="page-content">
            <div className="left-content">
                {FormComponent}
            </div>
            <div className="right-content">
                <CodeBlock code={codeContent} />
            </div>
        </div>
    )
}