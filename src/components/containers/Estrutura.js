import Label from '../form/Label'
import Loader from '../form/Loader'

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
            <nav>
            </nav>
        </div>
    )
}

export default Estrutura