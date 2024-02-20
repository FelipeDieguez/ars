import { useState, useEffect } from 'react'

import Geotechnics from './main/containers/Geotechnics'
import Structure from './main/containers/Structure'
import ProjectManager from './main/containers/ProjectManager'

import styles from './Main.module.css'

import dataGeotechnics from "./main/utils/data/dataGeotechnics.json"
import parametersMethods from './parameters-manager/utils/data/parametersMethods.json'
import { api } from '../utils/services/api'
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, IconButton, useDisclosure, Button, DrawerFooter } from '@chakra-ui/react'

const initialGeotechnicsInputs = {
    "metodo": "Aoki-Velloso",
    "tipo": "Escavada",
    "esforco": "compressao", 
    "dimensao_1": "0",
    "dimensao_2": "0",
    "dimensao_3": "0",
    "dimensao_4": "0"
}

const initialStructureInputs = {
    "profundidade": "0"
}

function Main({ projectInputs, updateProjectInputs, projectsData, searchTerm, setSearchTerm, filteredProjects, setUpdateProjects, methodsData }) {
    const [foundationClass, setFoundationClass] = useState('estacas')

    const [investigationInputs, setInvestigationInputs] = useState({'selected_name': '', 'name_input': ''})
    const [investigationsData, setInvestigationsData] = useState([])

    const [layerInputs, setLayerInputs] = useState({'Cota': '', 'Solo': 'Areia', 'Nspt': 0})
    const [geotechnicsData, setGeotechnicsData] = useState([{}])

    const [geotechnicsInputs, setGeotechnicsInputs] = useState(initialGeotechnicsInputs)
    const [structureInputs, setStructureInputs] = useState(initialStructureInputs)

    const [updateGeotechnics, setUpdateGeotechnics] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    function updateInvestigationInputs(key, value) {
        setInvestigationInputs(prevInputs => ({ ...prevInputs, [key]: value }))
    }

    function updateGeotechnicsInputs(name, value) {
        setGeotechnicsInputs(prevInputs => ({ ...prevInputs, [name]: value }))
        setUpdateGeotechnics(prev => prev + 1)
    }

    function updateStructureInputs(ev) {
        const { name, value } = ev.target
        setStructureInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    function updateLayerInputs(name, value) {
        setLayerInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    useEffect(() => {
        if (projectInputs['selected_name'] !== '' && investigationInputs['selected_name'] && investigationInputs['selected_name'] !== '') {
            setIsLoading(true)
            api.post('/layer', [projectInputs, investigationInputs])
                .then((response) => {
                    const data = []
                    response["data"].map((layer, _) => {
                        data.push(Object.assign(layer, dataGeotechnics[foundationClass][0]))
                    })
                    setGeotechnicsData(data)   
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [ foundationClass, updateGeotechnics, projectInputs['selected_name'], investigationInputs['selected_name'] ])

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <>
            <ProjectManager
                projectInputs={projectInputs} updateProjectInputs={updateProjectInputs}
                projectsData={projectsData}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                filteredProjects={filteredProjects}
                setUpdateProjects={setUpdateProjects}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
            <div className={styles.page}>
                <Geotechnics
                    projectInputs={projectInputs}
                    foundationClass={foundationClass}
                    investigationInputs={investigationInputs} updateInvestigationInputs={updateInvestigationInputs}
                    investigationsData={investigationsData} setInvestigationsData={setInvestigationsData}
                    geotechnicsInputs={geotechnicsInputs} updateGeotechnicsInputs={updateGeotechnicsInputs}
                    structureInputs={structureInputs}
                    geotechnicsData={geotechnicsData} setGeotechnicsData={setGeotechnicsData}
                    updateGeotechnics={updateGeotechnics} setUpdateGeotechnics={setUpdateGeotechnics}
                    layerInputs={layerInputs} updateLayerInputs={updateLayerInputs}
                    methodsData={methodsData}
                    onOpen={onOpen}
                    isLoading={isLoading}
                />
                <Structure
                    foundationClass={foundationClass}
                    setFoundationClass={setFoundationClass}
                    geotechnicsInputs={geotechnicsInputs}
                    structureInputs={structureInputs}
                    geotechnicsData={geotechnicsData}
                    updateGeotechnicsInputs={updateGeotechnicsInputs}
                    updateStructureInputs={updateStructureInputs}
                />
            </div>
        </>
    )
}

export default Main