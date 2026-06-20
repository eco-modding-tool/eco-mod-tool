import FormsProvider from "./components/context/FormsProvider";
import RegistryProvider from "./components/context/RegistryProvider";
import NavBar from "./components/layout/NavBar";
import Title from "./components/layout/Title";
import PageContent from "./PageContent";

function App() {
  return (
    <RegistryProvider>
      <FormsProvider>
        <Title />
        <NavBar />
        <PageContent />
      </FormsProvider>
    </RegistryProvider>
  );
}

export default App;
