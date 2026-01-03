
import Context from './components/context/FormsProvider'
import NavBar from './components/layout/NavBar'
import Title from './components/layout/Title'
import PageContent from './PageContent'

function App() {

  return (
    <Context>
      <Title />
      <NavBar />
      <PageContent />
    </Context>
  )
}

export default App
