import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Main from './pages/Main'
import ParametersManager from './pages/ParametersManager'

function App() {
  const [projectInputs, setProjectInputs] = useState({'selected_name': '', 'name': ''})

  function updateProjectInputs(key, value) {
    setProjectInputs(prevInputs => ({ ...prevInputs, [key]: value }))
  }

  return (
    <Router>
        <Routes>
          <Route path='/' element={
            <Main
              projectInputs={projectInputs}
              updateProjectInputs={updateProjectInputs}
            />
          }/>
          <Route path='/parameters' element={
            <ParametersManager/>
          }/>
        </Routes>
    </Router>
  )
}

export default App