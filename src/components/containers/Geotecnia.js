import { useState } from 'react'

import Label from '../form/Label'

import CamadaDefinir from './Geotecnia/CamadaDefinir'
import CamadaEntradas from './Geotecnia/CamadaEntradas'
import CamadaAcoes from './Geotecnia/CamadaAcoes'
import MetodoDefinir from './Geotecnia/MetodoDefinir'
import CalculoDefinir from './Geotecnia/CalculoDefinir'
import CalculoEntradas1 from './Geotecnia/CalculoEntradas1'
import CalculoEntradas2 from './Geotecnia/CalculoEntradas2'
import CalculoAcoes from './Geotecnia/CalculoAcoes'
import EsforcoDefinir from './Geotecnia/EsforcoDefinir'
import ResultadoTabela from './Geotecnia/ResultadoTabela'

import styles from './Geotecnia.module.css'

const inicialCamadaDados = {
    "id_sondagem": "1",
    "ordem": "",
    "solo": "Areia",
    "nspt": "0"
}

function Geotecnia({ classeFundacao, metodoGeotecnia, setMetodoGeotecnia, esforcoGeotecnia, setEsforcoGeotecnia, entradasGeotecnia, mudarEntradasGeotecnia, dadosGeotecnia, setDadosGeotecnia, atualizarGeotecnia, setAtualizarGeotecnia}) {
    const [classeSolo, setClasseSolo] = useState("areia")
    const [camadaDados, setCamadaDados] = useState(inicialCamadaDados)

    function mudarCamadaDados(name, value) {
        setCamadaDados({ ...camadaDados, [name]: value })
        setAtualizarGeotecnia(1)
        console.log(camadaDados)
    }

    return (
        <div className={styles.grid}>
            <header>
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
                            mudarEntradasGeotecnia={mudarEntradasGeotecnia}
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
                                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                            />
                        </div>
                        <div className={styles.step}>
                            <CalculoAcoes
                                entradasGeotecnia={entradasGeotecnia}
                                dadosGeotecnia={dadosGeotecnia}
                                setAtualizarGeotecnia={setAtualizarGeotecnia}
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
                    dadosGeotecnia={dadosGeotecnia}
                    mudarCamadaDados={mudarCamadaDados}
                />
            </section>
        </div>
    )
}

export default Geotecnia