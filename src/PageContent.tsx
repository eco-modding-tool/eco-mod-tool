import "./PageContent.css"
import RecipeForm from "./components/forms/RecipeForm";

export default function PageContent(){
    return(
        <div className="page-content">
            <div className="left-content">
                <RecipeForm/>
            </div>
            <div className="right-content">

            </div>
        </div>
    )
}