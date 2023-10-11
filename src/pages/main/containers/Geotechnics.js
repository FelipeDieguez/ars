import { useState, createContext } from 'react'

import Label from '../components/Label'

import CamadaDefinir from './Geotechnics/CamadaDefinir'
import CamadaEntradas from './Geotechnics/CamadaEntradas'
import CamadaAcoes from './Geotechnics/CamadaAcoes'
import MetodoDefinir from './Geotechnics/MetodoDefinir'
import CalculoDefinir from './Geotechnics/CalculoDefinir'
import CalculoEntradas1 from './Geotechnics/CalculoEntradas1'
import CalculoEntradas2 from './Geotechnics/CalculoEntradas2'
import CalculoAcoes from './Geotechnics/CalculoAcoes'
import EsforcoDefinir from './Geotechnics/EsforcoDefinir'
import ResultadoTabela from './Geotechnics/ResultadoTabela'

import styles from './Geotechnics.module.css'

const initialLayerInputs = {
    "ordem": "",
    "solo": "Areia",
    "nspt": "0"
}
// criando contexto para compartilhar dados entre componentes
export const CamadaContext = createContext({})

function Geotechnics({ foundationClass, geotechnicsMethod, setGeotechnicsMethod, geotechnicsStress, setGeotechnicsStress, geotechnicsInputs, updateGeotechnicsInputs, structureInputs, geotechnicsData, setGeotechnicsData, setUpdateGeotechnics}) {
    const [soilClass, setSoilClass] = useState("areia")
    const [layerInputs, setLayerInputs] = useState(initialLayerInputs)

    function updateLayerInputs(name, value) {
        setLayerInputs({ ...layerInputs, [name]: value })
    }

    return (
        <CamadaContext.Provider value={{ 
            soilClass,
            layerInputs,
            setLayerInputs,
            setSoilClass,
        }}>
            <div className={styles.grid}>
                <header className={styles.header}>
                    <strong> <Label text="GEOTECNIA" /> </strong>
                    <div className={styles.stepsContainer}>
                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <Label text="SONDAGEM:" />
                            </div>
                            <div className={styles.step}>
                                <CamadaDefinir
                                    soilClass={soilClass}
                                    setSoilClass={setSoilClass}
                                    updateLayerInputs={updateLayerInputs} 
                                />
                            </div>
                            <div className={styles.step}>
                                <CamadaEntradas
                                    soilClass={soilClass}
                                    updateLayerInputs={updateLayerInputs}
                                />
                            </div>
                            <div className={styles.step}>
                                <CamadaAcoes
                                    layerInputs={layerInputs}
                                    setUpdateGeotechnics={setUpdateGeotechnics}
                                />
                            </div>
                        </div>
                        <div className={styles.steps}>
                            <MetodoDefinir
                                foundationClass={foundationClass}
                                geotechnicsMethod={geotechnicsMethod}
                                setGeotechnicsMethod={setGeotechnicsMethod}
                            />
                        </div>
                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <CalculoDefinir
                                    foundationClass={foundationClass}
                                    updateGeotechnicsInputs={updateGeotechnicsInputs}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoEntradas1
                                    geotechnicsInputs={geotechnicsInputs}
                                    updateGeotechnicsInputs={updateGeotechnicsInputs}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoEntradas2
                                    foundationClass={foundationClass}
                                    geotechnicsMethod={geotechnicsMethod}
                                    geotechnicsStress={geotechnicsStress}
                                    updateGeotechnicsInputs={updateGeotechnicsInputs}
                                    geotechnicsData={geotechnicsData}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoAcoes
                                    geotechnicsInputs={geotechnicsInputs}
                                    geotechnicsData={geotechnicsData}
                                    setGeotechnicsData={setGeotechnicsData}
                                />
                            </div>
                        </div>
                    </div>
                </header>
                <nav>
                    <EsforcoDefinir
                        geotechnicsStress={geotechnicsStress}
                        setGeotechnicsStress={setGeotechnicsStress}
                    />
                </nav>
                <section>
                    <ResultadoTabela
                        geotechnicsMethod={geotechnicsMethod}
                        geotechnicsStress={geotechnicsStress}
                        geotechnicsData={geotechnicsData}
                        structureInputs={structureInputs}
                        updateLayerInputs={updateLayerInputs}
                    />
                </section>
            </div>
        </CamadaContext.Provider>
    )
}

export default Geotechnics