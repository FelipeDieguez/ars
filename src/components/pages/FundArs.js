import { useState, useEffect } from 'react'
import { useTable } from'react-table'
import axios from 'axios'

import Geotecnia from '../containers/Geotecnia'
import Estrutura from '../containers/Estrutura'

import styles from './FundArs.module.css'

import geotecniaDados from "../data/geotecniaDados.json"

const inicialEntradasGeotecnia = {
    "tipo": "Franki",
    "dimensao_1": 0,
    "dimensao_2": 0,
    "z": 0,
    "na": 0
}

function FundArs() {
    const [classeFundacao, setClasseFundacao] = useState("estacas")
    const [metodoGeotecnia, setMetodoGeotecnia] = useState("metodo-1")
    const [esforcoGeotecnia, setEsforcoGeotecnia] = useState("compressao")
    const [entradasGeotecnia, setEntradasGeotecnia] = useState(inicialEntradasGeotecnia)
    const [dadosGeotecnia, setDadosGeotecnia] = useState({"compressao": {"metodo-1": [{}], "metodo-2": [{}]}})
    const [atualizarGeotecnia, setAtualizarGeotecnia] = useState(0)

    function mudarEntradasGeotecnia(name, value) {
        setEntradasGeotecnia({ ...entradasGeotecnia, [name]: value })
        setAtualizarGeotecnia(1)
    }

    useEffect(() => {
        axios.get('/sondagem')
            .then((response) => {
                const esforcos = {}
                Object.entries(geotecniaDados[classeFundacao]).map(([esforco, valor]) => {
                    const metodos = {}
                    Object.entries(valor).map(([metodo, resultados]) => {
                        metodos[metodo] = []
                        response["data"].map((camada, i) => {
                            metodos[metodo].push(Object.assign(camada, geotecniaDados[classeFundacao][esforco][metodo][0]))
                        })
                    })
                    esforcos[esforco] = metodos
                })
                setDadosGeotecnia(esforcos)
                setAtualizarGeotecnia(0)
            })
    }, [classeFundacao, atualizarGeotecnia])

    return (
        <div className={styles.page}>
            <Geotecnia
                classeFundacao={classeFundacao}
                metodoGeotecnia={metodoGeotecnia} setMetodoGeotecnia={setMetodoGeotecnia}
                esforcoGeotecnia={esforcoGeotecnia} setEsforcoGeotecnia={setEsforcoGeotecnia}
                entradasGeotecnia={entradasGeotecnia} mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                dadosGeotecnia={dadosGeotecnia} setDadosGeotecnia={setDadosGeotecnia}
                setAtualizarGeotecnia={setAtualizarGeotecnia}
            />
            <Estrutura
                classeFundacao={classeFundacao}
                setClasseFundacao={setClasseFundacao}
                setMetodoGeotecnia={setMetodoGeotecnia}
                setEsforcoGeotecnia={setEsforcoGeotecnia}
                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
            />
        </div>
    )
}

export default FundArs