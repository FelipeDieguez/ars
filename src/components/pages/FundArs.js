import { useState } from 'react'

import Sondagem from '../containers/Sondagem'
import Fundacao from '../containers/Fundacao'

import fundacaoTipos from "../data/fundacaoTipos.json"
import fundacaoGeometrias from "../data/fundacaoGeometrias.json"

import styles from './FundArs.module.css'

const initialSondagemInput = {
    "tipo": "Franki",
    "dimensao_1": 0,
    "dimensao_2": 0
}

function FundArs() {
    const [fundacao, setFundacao] = useState("estacas")
    const [tipos, setTipos] = useState(fundacaoTipos["estacas"])
    const [fundacaoGeometry, setFundacaoGeometry] = useState("estaca circular")
    const [sondagemInput, setSondagemInput] = useState(initialSondagemInput)

    function changeSondagemInput(name, value) {
        setSondagemInput({ ...sondagemInput, [name]: value })
        console.log(sondagemInput)
    }

    function changeFundacaoGeometry() {
        for (const [key, value] of Object.entries(fundacaoGeometrias)) {
            for (const element of value) {
                if (sondagemInput["tipo"] === element) {
                    setFundacaoGeometry(key)
                    break
                }
            }
        }
    }

    return (
        <div className={styles.page}>
            <Sondagem fundacao={fundacao} tipos={tipos} fundacaoGeometry={fundacaoGeometry} sondagemInput={sondagemInput} changeSondagemInput={changeSondagemInput} changeFundacaoGeometry={changeFundacaoGeometry} />
            <Fundacao fundacao={fundacao} setFundacao={setFundacao} setTipos={setTipos} changeSondagemInput={changeSondagemInput} changeFundacaoGeometry={changeFundacaoGeometry} />
        </div>
    )
}

export default FundArs