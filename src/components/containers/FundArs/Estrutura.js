import Label from '../../form/Label'
import Loader from '../../form/Loader'

import FundacaoDefinir from './Estrutura/FundacaoDefinir'
import FundacaoAcoes from './Estrutura/FundacaoAcoes'

import styles from './Estrutura.module.css'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Estrutura({ classeFundacao, setClasseFundacao, setMetodoGeotecnia, setEsforcoGeotecnia, entradasGeotecnia, entradasEstrutura, dadosGeotecnia, mudarEntradasGeotecnia, mudarEntradasEstrutura }) {
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

export default Estrutura