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

function Main({ projectInputs, updateProjectInputs }) {
    const [foundationClass, setFoundationClass] = useState("estacas")
    const [geotechnicsInputs, setGeotechnicsInputs] = useState(initialGeotechnicsInputs)
    const [structureInputs, setStructureInputs] = useState(initialStructureInputs)
    const [geotechnicsData, setGeotechnicsData] = useState([{}])
    const [updateGeotechnics, setUpdateGeotechnics] = useState(0)
    const [layerInputs, setLayerInputs] = useState({"projeto": projectInputs["selected_name"], "sondagem": "", "ordem": "", "solo": "Areia", "nspt": "0"})
    const [parameters, setParameters] = useState(parametersMethods)

    const { isOpen, onOpen, onClose } = useDisclosure()

    function updateGeotechnicsInputs(name, value) {
        setGeotechnicsInputs({ ...geotechnicsInputs, [name]: value })
        setUpdateGeotechnics(1)
    }

    function updateStructureInputs(ev) {
        const { name, value } = ev.target
        setStructureInputs({ ...structureInputs, [name]: value })
    }

    function updateLayerInputs(name, value) {
        setLayerInputs({ ...layerInputs, [name]: value })
    }

    useEffect(() => {
        if (layerInputs['projeto'] !== '') {
            api.post('/layer', layerInputs)
                .then((response) => {
                    const data = []
                    response["data"].map((layer, _) => {
                        data.push(Object.assign(layer, dataGeotechnics[foundationClass][0]))
                    })
                    setGeotechnicsData(data)
                    setUpdateGeotechnics(0)
            })
        }
    }, [ foundationClass, updateGeotechnics, layerInputs['projeto'] ])

    useEffect(() => {
        api.get('/parameters')
            .then((response) => {
                const custom_methods = response['data']
                const new_methods_list = {"estacas": {...parametersMethods["estacas"], ...custom_methods["estacas"]}, "sapatas": {...parametersMethods["sapatas"], ...custom_methods["sapatas"]}}
                setParameters(new_methods_list)
                setUpdateGeotechnics(0)
            })
        return
    }, [updateGeotechnics])

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <>
            <ProjectManager
                projectInputs={projectInputs}
                updateProjectInputs={updateProjectInputs}
                updateLayerInputs={updateLayerInputs}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
            <div className={styles.page}>
                <Geotechnics
                    foundationClass={foundationClass}
                    geotechnicsInputs={geotechnicsInputs} updateGeotechnicsInputs={updateGeotechnicsInputs}
                    structureInputs={structureInputs}
                    geotechnicsData={geotechnicsData} setGeotechnicsData={setGeotechnicsData}
                    updateGeotechnics={updateGeotechnics} setUpdateGeotechnics={setUpdateGeotechnics}
                    layerInputs={layerInputs} updateLayerInputs={updateLayerInputs}
                    parameters={parameters}
                    onOpen={onOpen}
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