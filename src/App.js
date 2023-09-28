import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'

import GerenciadorProjetos from './components/pages/GerenciadorProjetos'

function App() {
  const [dadosProjetos, setDadosProjetos] = useState({"nome": ""})

  return (
    <Router>
        <Routes>
          <Route path='/' element={
            <GerenciadorProjetos
              dadosProjetos={dadosProjetos}
            />} />
        </Routes>
    </Router>
  )
}

export default App
