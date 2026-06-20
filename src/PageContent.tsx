import { useState } from "react";
import "./PageContent.css";
import { useFormsContext } from "./components/context/FormsContext";
import CodeBlock from "./components/display/ShowCode";
import ItemForm from "./components/forms/ItemForm";
import TableForm from "./components/forms/TableForm";
import RecipeForm from "./components/forms/RecipeForm";
import SkillForm from "./components/forms/SkillForm";
import TalentForm from "./components/forms/TalentForm";
import UpgradeForm from "./components/forms/UpgradeForm";
import RegistryView from "./components/forms/RegistryView";

export default function PageContent() {
  const { onglet } = useFormsContext();
  const [code, setCode] = useState("// Remplis le formulaire à gauche puis clique sur \"Générer le code\".");
  const [filename, setFilename] = useState("");

  const handleCodeChange = (newCode: string, newFilename: string) => {
    setCode(newCode);
    setFilename(newFilename);
  };

  let FormComponent;
  switch (onglet) {
    case "item":
      FormComponent = <ItemForm onCodeChange={handleCodeChange} />;
      break;
    case "recipe":
      FormComponent = <RecipeForm onCodeChange={handleCodeChange} />;
      break;
    case "table":
      FormComponent = <TableForm onCodeChange={handleCodeChange} />;
      break;
    case "skill":
      FormComponent = <SkillForm onCodeChange={handleCodeChange} />;
      break;
    case "talent":
      FormComponent = <TalentForm onCodeChange={handleCodeChange} />;
      break;
    case "upgrade":
      FormComponent = <UpgradeForm onCodeChange={handleCodeChange} />;
      break;
    case "registry":
      FormComponent = <RegistryView />;
      break;
  }

  return (
    <div className="page-content">
      <div className="left-content">{FormComponent}</div>
      <div className="right-content">
        <CodeBlock code={code} filename={filename || "preview.cs"} />
      </div>
    </div>
  );
}
