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
import SondagemAcoes from './Geotechnics/SondagemAcoes'

import styles from './Geotechnics.module.css'
import { IconButton } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'

// criando contexto para compartilhar dados entre componentes
export const LayerContext = createContext({})

function Geotechnics({ foundationClass, geotechnicsInputs, updateGeotechnicsInputs, structureInputs, geotechnicsData, setGeotechnicsData, updateGeotechnics, setUpdateGeotechnics, layerInputs, updateLayerInputs, parameters, onOpen }) {
    const [soilClass, setSoilClass] = useState("areia")

    function onProjectManagerOpen() {
        updateLayerInputs('sondagem', '')
        onOpen()
    }

    return (
        <LayerContext.Provider value={{ 
            layerInputs,
            updateLayerInputs
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
                                geotechnicsInputs={geotechnicsInputs}
                                updateGeotechnicsInputs={updateGeotechnicsInputs}
                                parameters={parameters}
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
                                    updateGeotechnicsInputs={updateGeotechnicsInputs}
                                    geotechnicsData={geotechnicsData}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoAcoes
                                    foundationClass={foundationClass}
                                    geotechnicsInputs={geotechnicsInputs}
                                    geotechnicsData={geotechnicsData}
                                    setGeotechnicsData={setGeotechnicsData}
                                    parameters={parameters}
                                />
                            </div>
                        </div>
                    </div>
                </header>
                <nav>
                    <EsforcoDefinir
                        updateGeotechnicsInputs={updateGeotechnicsInputs}
                    />
                </nav>
                <section>
                    <ResultadoTabela
                        geotechnicsData={geotechnicsData}
                        structureInputs={structureInputs}
                        updateLayerInputs={updateLayerInputs}
                    />
                </section>
                <footer className={styles.footer}>
                    <div className={styles.leftFooter}>
                        <IconButton
                            colorScheme='blue'
                            aria-label='Abrir Gerenciador de Projetos'
                            icon={<ArrowRightIcon />}
                            onClick={onProjectManagerOpen}
                        />
                    </div>
                    <div className={styles.rightFooter}>
                        <SondagemAcoes
                            updateGeotechnics={updateGeotechnics}
                            setUpdateGeotechnics={setUpdateGeotechnics}
                            layerInputs={layerInputs}
                            updateLayerInputs={updateLayerInputs}
                        />
                    </div>
                </footer>
            </div>
        </LayerContext.Provider>
    )
}

export default Geotechnics