import FundacaoDefinir from './Structure/FundacaoDefinir'
import FundacaoAcoes from './Structure/FundacaoAcoes'

import styles from './Structure.module.css'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Structure({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, entradasGeotecnia, entradasEstrutura, dadosGeotecnia, mudarEntradasGeotecnia, mudarEntradasEstrutura }) {
    const navigate = useNavigate()
    
    function onProjectManager() {
        navigate('/')
    }

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
                <FundacaoAcoes
                        dadosGeotecnia={dadosGeotecnia}
                        entradasGeotecnia={entradasGeotecnia}
                        entradasEstrutura={entradasEstrutura}
                        mudarEntradasEstrutura={mudarEntradasEstrutura}
                />
            </header>
            <Button onClick={onProjectManager}>GERENCIADOR DE PROJETOS</Button>
        </div>
    )
}

export default Structure