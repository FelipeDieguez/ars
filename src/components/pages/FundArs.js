import { useState } from 'react'

import Sondagem from '../containers/Sondagem'
import Fundacao from '../containers/Fundacao'

import styles from './FundArs.module.css'

function FundArs() {
    const [fundacao, setFundacao] = useState("estacas")

    function getFundacao(fundacao) {
        setFundacao(fundacao)
    }
    return (
        <div className={styles.page}>
        <Sondagem fundacao={fundacao}></Sondagem>
        <Fundacao onSubmit={getFundacao}></Fundacao>
        </div>
    )
}

export default FundArs