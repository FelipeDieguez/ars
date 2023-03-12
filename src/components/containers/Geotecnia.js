import { useState, useEffect } from 'react'
import axios from 'axios'

import Label from '../form/Label'

import DefinirClasseSolo from './Geotecnia/DefinirClasseSolo'
import DefinirEntradasSondagem from './Geotecnia/DefinirEntradasSondagem'
import DefinirSondagemGeotecnia from './Geotecnia/DefinirSondagemGeotecnia'
import DefinirMetodoGeotecnia from './Geotecnia/DefinirMetodoGeotecnia'
import DefinirTipoEntradasGeotecnia from './Geotecnia/DefinirTipoEntradasGeotecnia'
import DefinirDimensoesEntradasGeotecnia from './Geotecnia/DefinirDimensoesEntradasGeotecnia'
import AcaoCalcularGeotecnia from './Geotecnia/AcaoCalcularGeotecnia'
import DefinirEsforcoGeotecnia from './Geotecnia/DefinirEsforcoGeotecnia'
import DefinirCamadaSondagem from './Geotecnia/DefinirCamadaSondagem'

import styles from './Geotecnia.module.css'

const inicialEntradasSondagem = {
    "id_sondagem": "1",
    "ordem": "",
    "solo": "Areia",
    "nspt": "0"
}

function Geotecnia({ classeFundacao, entradasGeotecnia, mudarEntradasGeotecnia}) {
    const [classeSolo, setClasseSolo] = useState("areia")

    const [entradasSondagem, setEntradasSondagem] = useState(inicialEntradasSondagem)
    const [sondagemGeotecnia, setSondagemGeotecnia] = useState([])
    const [atualizarSondagem, setAtualizarSondagem] = useState(0)
    const [camadaSondagem, setCamadaSondagem] = useState()

    const [metodoGeotecnia, setMetodoGeotecnia] = useState("aoki-velloso")
    const [esforcoGeotecnia, setEsforcoGeotecnia] = useState("compressao")
    
    const [resultados, setResultados] = useState([])

    function mudarEntradasSondagem(name, value) {
        setEntradasSondagem({ ...entradasSondagem, [name]: value })
        setAtualizarSondagem(1)
    }

    useEffect(() => {
        axios.get('/sondagem')
            .then((response) => {
                setSondagemGeotecnia(response["data"])
                setAtualizarSondagem(0)
            })
    }, [classeFundacao, atualizarSondagem, metodoGeotecnia, resultados])

    return (
        <div className={styles.grid}>
            <header>
                <Label text="SONDAGEM" />
                <div className={styles.stepsContainer}>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <DefinirClasseSolo
                                classeSolo={classeSolo}
                                setClasseSolo={setClasseSolo}
                                mudarEntradasSondagem={mudarEntradasSondagem} 
                            />
                        </div>
                        <div className={styles.step}>
                            <DefinirEntradasSondagem
                                classeSolo={classeSolo}
                                mudarEntradasSondagem={mudarEntradasSondagem}
                            />
                        </div>
                        <div className={styles.step}>
                            <DefinirSondagemGeotecnia
                                entradasSondagem={entradasSondagem}
                                setAtualizarSondagem={setAtualizarSondagem}
                                camadaSondagem={camadaSondagem}
                                setResultados={setResultados}
                            />
                        </div>
                    </div>
                    <div className={styles.steps}>
                        <DefinirMetodoGeotecnia
                            classeFundacao={classeFundacao}
                            mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                            metodoGeotecnia={metodoGeotecnia}
                            setMetodoGeotecnia={setMetodoGeotecnia}
                            setResultados={setResultados}
                        />
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <DefinirTipoEntradasGeotecnia
                                classeFundacao={classeFundacao}
                                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                            />
                        </div>
                        <div className={styles.step}>
                            <DefinirDimensoesEntradasGeotecnia
                                entradasGeotecnia={entradasGeotecnia}
                                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                            />
                        </div>
                        <div className={styles.step}>
                            <AcaoCalcularGeotecnia
                                entradasGeotecnia={entradasGeotecnia}
                                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                                setAtualizarSondagem={setAtualizarSondagem}
                                setResultados={setResultados}
                            />
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <DefinirEsforcoGeotecnia
                    esforcoGeotecnia={esforcoGeotecnia}
                    setEsforcoGeotecnia={setEsforcoGeotecnia}
                />
            </nav>
            <section>
                <DefinirCamadaSondagem
                    sondagemGeotecnia={sondagemGeotecnia}
                    setCamadaSondagem={setCamadaSondagem}
                    resultados={resultados}
                />
            </section>
        </div>
    )
}

export default Geotecnia