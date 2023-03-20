import Label from '../form/Label'

import DefinirClasseFundacao from './Estrutura/DefinirClasseFundacao'

import styles from './Estrutura.module.css'

function Estrutura({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, mudarEntradasGeotecnia }) {
    return (
        <div className={styles.grid}>
            <nav>
                <DefinirClasseFundacao
                    classeFundacao={classeFundacao}
                    setClasseFundacao={setClasseFundacao}
                    setMetodoGeotecnia={setMetodoGeotecnia}
                    setEsforcoGeotecnia={setEsforcoGeotecnia}
                    mudarEntradasGeotecnia={mudarEntradasGeotecnia} 
                />
            </nav>
        </div>
    )
}

export default Estrutura