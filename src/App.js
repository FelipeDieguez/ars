import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

import FundArs from './components/pages/FundArs'
import ProjectManager from './components/pages/ProjectManager'
import ParametersManager from './components/pages/ParametersManager'

function App() {
  const [projectInputs, setProjectInputs] = useState({'selected_name': '', 'name': ''})

  function updateProjectInputs(key, value) {
    setProjectInputs({ ...projectInputs, [key]: value })
  }

  return (
    <Router>
        <Routes>
          <Route path='/' element={
            <ProjectManager
              projectInputs={projectInputs}
              updateProjectInputs={updateProjectInputs}
            />
          }/>
          <Route path='/fundars' element={
            <FundArs/>
          }/>
          <Route path='/parametros' element={
            <ParametersManager/>
          }/>
        </Routes>
    </Router>
  )
}

export default App