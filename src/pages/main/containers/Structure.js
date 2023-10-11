import FundacaoDefinir from './Structure/FundacaoDefinir'
import FundacaoAcoes from './Structure/FundacaoAcoes'

import styles from './Structure.module.css'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Structure({ foundationClass, setFoundationClass, setGeotechnicsMethod, setGeotechnicsStress, geotechnicsInputs, structureInputs, geotechnicsData, updateGeotechnicsInputs, updateStructureInputs }) {
    const navigate = useNavigate()
    
    function onOpenProjectManager() {
        navigate('/')
    }

    return (
        <div className={styles.grid}>
            <nav>
                <FundacaoDefinir
                    foundationClass={foundationClass}
                    setFoundationClass={setFoundationClass}
                    setGeotechnicsMethod={setGeotechnicsMethod}
                    setGeotechnicsStress={setGeotechnicsStress}
                    updateGeotechnicsInputs={updateGeotechnicsInputs} 
                />
            </nav>
            <header>
                <FundacaoAcoes
                        geotechnicsData={geotechnicsData}
                        geotechnicsInputs={geotechnicsInputs}
                        structureInputs={structureInputs}
                        updateStructureInputs={updateStructureInputs}
                />
            </header>
            <Button onClick={onOpenProjectManager}>GERENCIADOR DE PROJETOS</Button>
        </div>
    )
}

export default Structure