import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from './utils/services/api'

import Main from './pages/Main'
import ParametersManager from './pages/ParametersManager'

import parametersMethods from './pages/parameters-manager/utils/data/parametersMethods.json'

function App() {
  const [projectInputs, setProjectInputs] = useState({'selected_name': '', 'name_input': ''})
  const [projectsData, setProjectsData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [updateProjects, setUpdateProjects] = useState(0)

  function updateProjectInputs(key, value) {
    setProjectInputs(prevInputs => ({ ...prevInputs, [key]: value }))
  }

  useEffect(() => {
      api.get('/project')
          .then((response) => {
              setProjectsData(response['data'])
              const filter = response['data'].filter(name =>
                  name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              setFilteredProjects(filter)
          })
  }, [updateProjects])

  const [methodInputs, setMethodInputs] = useState({'foundation_class': 'estacas', 'selected_name': 'Aoki-Velloso', 'name_input': '', 'parameters': parametersMethods['estacas']['Aoki-Velloso']})
  const [methodsData, setMethodsData] = useState(parametersMethods)
  const [updateMethods, setUpdateMethods] = useState(0)

  function updateMethodInputs(name, value) {
    setMethodInputs(prevInputs => ({ ...prevInputs, [name]: value }))
  }

  useEffect(() => {
    api.get('/method')
        .then((response) => {
          setMethodsData((prevMethodsData) => {
            const updatedMethodsData = { ...parametersMethods }

            response['data'].map((foundationClass) => {
              const { estacas, sapatas } = foundationClass

              if (estacas) {
                updatedMethodsData.estacas = {
                  ...updatedMethodsData.estacas,
                  ...estacas
                }
              }

              if (sapatas) {
                updatedMethodsData.sapatas = {
                  ...updatedMethodsData.sapatas,
                  ...sapatas
                }
              }
            })

            return updatedMethodsData
          })
        })
    return
  }, [updateMethods])

  useEffect(() => {
    api.get('/')
        .then((response) => {
          console.log(response['data'])
        })
    return
  }, [])

  return (
    <Router>
        <Routes>
          <Route path='/' element={
            <Main
              projectInputs={projectInputs} updateProjectInputs={updateProjectInputs}
              projectsData={projectsData}
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              filteredProjects={filteredProjects}
              setUpdateProjects={setUpdateProjects}
              methodsData={methodsData}
            />
          }/>
          <Route path='/parameters' element={
            <ParametersManager
              methodInputs={methodInputs} setMethodInputs={setMethodInputs} updateMethodInputs={updateMethodInputs}
              methodsData={methodsData}
              setUpdateMethods={setUpdateMethods}
            />
          }/>
        </Routes>
    </Router>
  )
}

export default App