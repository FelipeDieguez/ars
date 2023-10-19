import { useState, useEffect } from 'react'

import Geotechnics from './main/containers/Geotechnics'
import Structure from './main/containers/Structure'

import styles from './Main.module.css'

import dataGeotechnics from "./main/utils/data/dataGeotechnics.json"
import { api } from '../utils/services/api'

const initialGeotechnicsInputs = {
    "tipo": "Franki",
    "dimensao_1": "0",
    "dimensao_2": "0",
    "dimensao_3": "0",
    "dimensao_4": "0"
}

const initialStructureInputs = {
    "profundidade": "0"
}

function Main({ projectInputs }) {
    const [foundationClass, setFoundationClass] = useState("estacas")
    const [geotechnicsMethod, setGeotechnicsMethod] = useState("metodo-1")
    const [geotechnicsStress, setGeotechnicsStress] = useState("compressao")
    const [geotechnicsInputs, setGeotechnicsInputs] = useState(initialGeotechnicsInputs)
    const [structureInputs, setStructureInputs] = useState(initialStructureInputs)
    const [geotechnicsData, setGeotechnicsData] = useState({"compressao": {"metodo-1": [{}], "metodo-2": [{}]}})
    const [updateGeotechnics, setUpdateGeotechnics] = useState(0)
    const [layerInputs, setLayerInputs] = useState({"projeto": projectInputs["selected_name"], "sondagem": "", "ordem": "", "solo": "Areia", "nspt": "0"})

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
        api.post('/layer', layerInputs)
            .then((response) => {
                const stress_types = {}
                Object.entries(dataGeotechnics[foundationClass]).map(([stress, value]) => {
                    const methods = {}
                    Object.entries(value).map(([method, _]) => {
                        methods[method] = []
                        response["data"].map((layer, _) => {
                            methods[method].push(Object.assign(layer, dataGeotechnics[foundationClass][stress][method][0]))
                        })
                    })
                    stress_types[stress] = methods
                })
                setGeotechnicsData(stress_types)
                setUpdateGeotechnics(0)
            })
    }, [ foundationClass, updateGeotechnics ])

    return (
        <div className={styles.page}>
            <Geotechnics
                foundationClass={foundationClass}
                geotechnicsMethod={geotechnicsMethod} setGeotechnicsMethod={setGeotechnicsMethod}
                geotechnicsStress={geotechnicsStress} setGeotechnicsStress={setGeotechnicsStress}
                geotechnicsInputs={geotechnicsInputs} updateGeotechnicsInputs={updateGeotechnicsInputs}
                structureInputs={structureInputs}
                geotechnicsData={geotechnicsData} setGeotechnicsData={setGeotechnicsData}
                updateGeotechnics={updateGeotechnics} setUpdateGeotechnics={setUpdateGeotechnics}
                layerInputs={layerInputs} updateLayerInputs={updateLayerInputs}
            />
            <Structure
                foundationClass={foundationClass}
                setFoundationClass={setFoundationClass}
                setGeotechnicsMethod={setGeotechnicsMethod}
                setGeotechnicsStress={setGeotechnicsStress}
                geotechnicsInputs={geotechnicsInputs}
                structureInputs={structureInputs}
                geotechnicsData={geotechnicsData}
                updateGeotechnicsInputs={updateGeotechnicsInputs}
                updateStructureInputs={updateStructureInputs}
            />
        </div>
    )
}

export default Main