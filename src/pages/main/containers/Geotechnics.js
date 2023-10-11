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

const inicialCamadaDados = {
    "ordem": "",
    "solo": "Areia",
    "nspt": "0"
}
// criando contexto para compartilhar dados entre componentes
export const CamadaContext = createContext({})

function Geotechnics({ classeFundacao, metodoGeotecnia, setMetodoGeotecnia, esforcoGeotecnia, setEsforcoGeotecnia, entradasGeotecnia, mudarEntradasGeotecnia, entradasEstrutura, dadosGeotecnia, setDadosGeotecnia, setAtualizarGeotecnia}) {
    const [classeSolo, setClasseSolo] = useState("areia")
    const [camadaDados, setCamadaDados] = useState(inicialCamadaDados)

    function mudarCamadaDados(name, value) {
        setCamadaDados({ ...camadaDados, [name]: value })
    }

    return (
        <CamadaContext.Provider value={{ 
            classeSolo,
            camadaDados,
            setCamadaDados,
            setClasseSolo,
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
                                    classeSolo={classeSolo}
                                    setClasseSolo={setClasseSolo}
                                    mudarCamadaDados={mudarCamadaDados} 
                                />
                            </div>
                            <div className={styles.step}>
                                <CamadaEntradas
                                    classeSolo={classeSolo}
                                    mudarCamadaDados={mudarCamadaDados}
                                />
                            </div>
                            <div className={styles.step}>
                                <CamadaAcoes
                                    camadaDados={camadaDados}
                                    setAtualizarGeotecnia={setAtualizarGeotecnia}
                                />
                            </div>
                        </div>
                        <div className={styles.steps}>
                            <MetodoDefinir
                                classeFundacao={classeFundacao}
                                metodoGeotecnia={metodoGeotecnia}
                                setMetodoGeotecnia={setMetodoGeotecnia}
                            />
                        </div>
                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <CalculoDefinir
                                    classeFundacao={classeFundacao}
                                    mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoEntradas1
                                    entradasGeotecnia={entradasGeotecnia}
                                    mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoEntradas2
                                    classeFundacao={classeFundacao}
                                    metodoGeotecnia={metodoGeotecnia}
                                    esforcoGeotecnia={esforcoGeotecnia}
                                    mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                                    dadosGeotecnia={dadosGeotecnia}
                                />
                            </div>
                            <div className={styles.step}>
                                <CalculoAcoes
                                    entradasGeotecnia={entradasGeotecnia}
                                    dadosGeotecnia={dadosGeotecnia}
                                    setDadosGeotecnia={setDadosGeotecnia}
                                />
                            </div>
                        </div>
                    </div>
                </header>
                <nav>
                    <EsforcoDefinir
                        esforcoGeotecnia={esforcoGeotecnia}
                        setEsforcoGeotecnia={setEsforcoGeotecnia}
                    />
                </nav>
                <section>
                    <ResultadoTabela
                        metodoGeotecnia={metodoGeotecnia}
                        esforcoGeotecnia={esforcoGeotecnia}
                        dadosGeotecnia={dadosGeotecnia}
                        entradasEstrutura={entradasEstrutura}
                        mudarCamadaDados={mudarCamadaDados}
                    />
                </section>
            </div>
        </CamadaContext.Provider>
    )
}

export default Geotechnics