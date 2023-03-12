import { useState } from 'react'

import Geotecnia from '../containers/Geotecnia'
import Estrutura from '../containers/Estrutura'

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
    const [entradasGeotecnia, setEntradasGeotecnia] = useState(inicialEntradasGeotecnia)

    function mudarEntradasGeotecnia(name, value) {
        setEntradasGeotecnia({ ...entradasGeotecnia, [name]: value })
        console.log(entradasGeotecnia)
    }

    return (
        <div className={styles.page}>
            <Geotecnia
                classeFundacao={classeFundacao}
                entradasGeotecnia={entradasGeotecnia}
                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
            />
            <Estrutura
                classeFundacao={classeFundacao}
                setClasseFundacao={setClasseFundacao}
                mudarEntradasGeotecnia={mudarEntradasGeotecnia}
            />
        </div>
    )
}

export default FundArs