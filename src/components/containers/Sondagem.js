import { useState, useEffect } from 'react'
import axios from 'axios'

import Label from '../form/Label'

import soloTipos from "../data/soloTipos.json"

import SoloTypeSet from './Sondagem/SoloTypeSet'
import SoloNsptSet from './Sondagem/SoloNsptSet'
import CamadaAction from './Sondagem/CamadaAction'
import MetodoSet from './Sondagem/MetodoSet'
import TipoSet from './Sondagem/TipoSet'
import DimensaoSet from './Sondagem/DimensaoSet'
import CalcularAction from './Sondagem/CalcularAction'
import EsforcoSet from './Sondagem/EsforcoSet'
import TableModify from './Sondagem/TableModify'

import styles from './Sondagem.module.css'

const initialCamada = {
    "#": "",
    "solo": "Areia",
    "nspt": 0
}

function Sondagem({ fundacao, tipos, fundacaoGeometry, sondagemInput, changeSondagemInput, changeFundacaoGeometry }) {
    const [solo, setSolo] = useState("areia")
    const [solos, setSolos] = useState(soloTipos["areia"])
    const [camada, setCamada] = useState(initialCamada)

    // Manipulação da tabela (CADATRAR/EDITAR/REMOVER)
    const [selectedRow, setSelectedRow] = useState()
    const [data, setData] = useState([{}])
    const [updateTable, setUpdateTable] = useState(0)
    const [calculo, setCalculo] = useState(0)

    // Configuração dos Radios e Selects
    const [metodo, setMetodo] = useState("aoki-velloso")

    const [esforco, setEsforco] = useState("compressao")

    useEffect(() => {
        axios.get('/sondagem')
            .then((response) => {
                if (calculo === 1) {
                    response.data["sondagens"].forEach((element, index) => {
                        element["lateral"] = response.data["resultados"]["aoki-velloso"][index]["lateral"]
                        element["ponta"] = response.data["resultados"]["aoki-velloso"][index]["ponta"]
                        element["c. rup. (kN)"] = response.data["resultados"]["aoki-velloso"][index]["c. rup. (kN)"]
                        element["c. adm. (kN)"] = response.data["resultados"]["aoki-velloso"][index]["c. adm. (kN)"]
                    })
                }
                else {
                    response.data["sondagens"].forEach((element, index) => {
                        element["lateral"] = ""
                        element["ponta"] = ""
                        element["c. rup. (kN)"] = ""
                        element["c. adm. (kN)"] = ""
                    })
                }
                
                setData(response.data["sondagens"])
                setUpdateTable(0)
                // changeFundacao(fundacao["fundacao"])
            })
    }, [updateTable, calculo, fundacao])

    return (
        <div className={styles.grid}>
            <header>
                <Label text="SONDAGEM" />
                <div className={styles.stepsContainer}>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <SoloTypeSet solo={solo} setSolo={setSolo} solos={solos} setSolos={setSolos} camada={camada} setCamada={setCamada} />
                        </div>
                        <div className={styles.step}>
                            <SoloNsptSet solos={solos} camada={camada} setCamada={setCamada} />
                        </div>
                        <div className={styles.step}>
                            <CamadaAction camada={camada} selectedRow={selectedRow} data={data} setUpdateTable={setUpdateTable} setCalculo={setCalculo} />
                        </div>
                    </div>
                    <div className={styles.steps}>
                        <MetodoSet setCalculo={setCalculo} metodo={metodo} setMetodo={setMetodo} />
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <TipoSet tipos={tipos} changeSondagemInput={changeSondagemInput} changeFundacaoGeometry={changeFundacaoGeometry} />
                        </div>
                        <div className={styles.step}>
                            <DimensaoSet fundacaoGeometry={fundacaoGeometry} changeSondagemInput={changeSondagemInput} />
                        </div>
                        <div className={styles.step}>
                            <CalcularAction setUpdateTable={setUpdateTable} setCalculo={setCalculo} sondagemInput={sondagemInput} />
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <EsforcoSet esforco={esforco} setEsforco={setEsforco} />
            </nav>
            <section>
                <TableModify setSelectedRow={setSelectedRow} data={data} />
            </section>
        </div>
    )
}

export default Sondagem