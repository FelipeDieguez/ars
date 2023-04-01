import Label from '../form/Label'
import Loader from '../form/Loader'

import FundacaoDefinir from './Estrutura/FundacaoDefinir'
import FundacaoAcoes from './Estrutura/FundacaoAcoes'

import styles from './Estrutura.module.css'

function Estrutura({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, entradasGeotecnia, entradasEstrutura, dadosGeotecnia, mudarEntradasGeotecnia, mudarEntradasEstrutura }) {
    return (
        <div className={styles.grid}>
            <nav>
                <FundacaoDefinir
                    classeFundacao={classeFundacao}
                    setClasseFundacao={setClasseFundacao}
                    setMetodoGeotecnia={setMetodoGeotecnia}
                    setEsforcoGeotecnia={setEsforcoGeotecnia}
                    mudarEntradasGeotecnia={mudarEntradasGeotecnia} 
                />
            </nav>
            <header>
                <div className={styles.stepsContainer}>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <FundacaoAcoes
                                dadosGeotecnia={dadosGeotecnia}
                                entradasGeotecnia={entradasGeotecnia}
                                entradasEstrutura={entradasEstrutura}
                                mudarEntradasEstrutura={mudarEntradasEstrutura}
                            />
                        </div>
                    </div>
                </div>
                <strong> <Label text="ORIENTAÇÕES:" /> </strong>
            </header>
        </div>
    )
}

export default Estrutura