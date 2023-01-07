import { useState, useEffect } from 'react'

import Geotecnia from '../containers/Geotecnia'
import Estrutura from '../containers/Estrutura'

import fundacaoTipos from "../data/fundacaoTipos.json"
import fundacaoGeometrias from "../data/fundacaoGeometrias.json"

import styles from './FundArs.module.css'

const inicialEntradasGeotecnia = {
    "id_sondagem": "1",
    "metodo": "aoki-velloso",
    "tipo": "Franki",
    "dimensao_1": 0,
    "dimensao_2": 0,
    "z": 0
}

function FundArs() {
    const [classeFundacao, setClasseFundacao] = useState("estacas")
    const [tiposFundacao, setTiposFundacao] = useState(fundacaoTipos["estacas"])
    const [geometriaFundacao, setGeometriaFundacao] = useState("estaca circular")
    const [entradasGeotecnia, setEntradasGeotecnia] = useState(inicialEntradasGeotecnia)

    function mudarEntradasGeotecnia(name, value) {
        setEntradasGeotecnia({ ...entradasGeotecnia, [name]: value })
        console.log(entradasGeotecnia)
    }

    function mudarGeometriaFundacao(tipo) {
        for (const [key, value] of Object.entries(fundacaoGeometrias)) {
            for (const element of value) {
                if (tipo === element) {
                    setGeometriaFundacao(key)
                    break
                }
            }
        }
    }

    useEffect(() => {mudarGeometriaFundacao(entradasGeotecnia["tipo"])}, [entradasGeotecnia])

    return (
        <div className={styles.page}>
            <Geotecnia
                classeFundacao={classeFundacao}
                tiposFundacao={tiposFundacao}
                geometriaFundacao={geometriaFundacao}
                entradasGeotecnia={entradasGeotecnia}
                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
            />
            <Estrutura
                classeFundacao={classeFundacao}
                setClasseFundacao={setClasseFundacao}
                setTiposFundacao={setTiposFundacao}
                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
            />
        </div>
    )
}

export default FundArs