import { useState, useEffect } from 'react'
import { useTable } from'react-table'
import axios from 'axios'

import Geotechnics from './main/containers/Geotechnics'
import Structure from './main/containers/Structure'

import styles from './Main.module.css'

import geotechnicsDatas from "./main/utils/data/geotechnicsDatas.json"
import { api } from '../utils/services/api'

const inicialEntradasGeotecnia = {
    "tipo": "Franki",
    "dimensao_1": "0",
    "dimensao_2": "0",
    "dimensao_3": "0",
    "dimensao_4": "0"
}

const inicialEntradasEstrutura = {
    "profundidade": "0"
}

function Main() {
    const [classeFundacao, setClasseFundacao] = useState("estacas")
    const [metodoGeotecnia, setMetodoGeotecnia] = useState("metodo-1")
    const [esforcoGeotecnia, setEsforcoGeotecnia] = useState("compressao")
    const [entradasGeotecnia, setEntradasGeotecnia] = useState(inicialEntradasGeotecnia)
    const [entradasEstrutura, setEntradasEstrutura] = useState(inicialEntradasEstrutura)
    const [dadosGeotecnia, setDadosGeotecnia] = useState({"compressao": {"metodo-1": [{}], "metodo-2": [{}]}})
    const [atualizarGeotecnia, setAtualizarGeotecnia] = useState(0)

    function mudarEntradasGeotecnia(name, value) {
        setEntradasGeotecnia({ ...entradasGeotecnia, [name]: value })
        setAtualizarGeotecnia(1)
    }

    function mudarEntradasEstrutura(ev) {
        const { name, value } = ev.target
        setEntradasEstrutura({ ...entradasEstrutura, [name]: value })
    }

    useEffect(() => {
        api.get('/investigation')
            .then((response) => {
                const esforcos = {}
                Object.entries(geotechnicsDatas[classeFundacao]).map(([esforco, valor]) => {
                    const metodos = {}
                    Object.entries(valor).map(([metodo, resultados]) => {
                        metodos[metodo] = []
                        response["data"].map((camada, i) => {
                            metodos[metodo].push(Object.assign(camada, geotechnicsDatas[classeFundacao][esforco][metodo][0]))
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
            <Geotechnics
                classeFundacao={classeFundacao}
                metodoGeotecnia={metodoGeotecnia} setMetodoGeotecnia={setMetodoGeotecnia}
                esforcoGeotecnia={esforcoGeotecnia} setEsforcoGeotecnia={setEsforcoGeotecnia}
                entradasGeotecnia={entradasGeotecnia} mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                entradasEstrutura={entradasEstrutura}
                dadosGeotecnia={dadosGeotecnia} setDadosGeotecnia={setDadosGeotecnia}
                setAtualizarGeotecnia={setAtualizarGeotecnia}
            />
            <Structure
                classeFundacao={classeFundacao}
                setClasseFundacao={setClasseFundacao}
                setMetodoGeotecnia={setMetodoGeotecnia}
                setEsforcoGeotecnia={setEsforcoGeotecnia}
                entradasGeotecnia={entradasGeotecnia}
                entradasEstrutura={entradasEstrutura}
                dadosGeotecnia={dadosGeotecnia}
                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
                mudarEntradasEstrutura={mudarEntradasEstrutura}
            />
        </div>
    )
}

export default Main