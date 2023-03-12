import Label from '../form/Label'

import DefinirClasseFundacao from './Estrutura/DefinirClasseFundacao'

import styles from './Estrutura.module.css'

function Estrutura({ classeFundacao, setClasseFundacao, mudarEntradasGeotecnia }) {
    return (
        <div className={styles.grid}>
            <nav>
                <DefinirClasseFundacao
                    classeFundacao={classeFundacao}
                    setClasseFundacao={setClasseFundacao} 
                    mudarEntradasGeotecnia={mudarEntradasGeotecnia} 
                />
            </nav>
        </div>
    )
}

export default Estrutura