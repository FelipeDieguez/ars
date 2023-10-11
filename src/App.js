import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

import Main from './pages/Main'
import ProjectManager from './pages/ProjectManager'
import ParametersManager from './pages/ParametersManager'

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
          <Route path='/main' element={
            <Main/>
          }/>
          <Route path='/parameters' element={
            <ParametersManager/>
          }/>
        </Routes>
    </Router>
  )
}

export default App