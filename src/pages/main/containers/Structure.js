import styles from './Structure.module.css'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ColumnsManager from './Structure/ColumnsManager'
import SolutionsManager from './Structure/SolutionsManager'
import FoundationsSolution from './Structure/FoundationsSolution'
import FoundationsManager from './Structure/FoundationsManager'

function Structure({ projectInputs, foundationClass, setFoundationClass, geotechnicsInputs, structureInputs, geotechnicsData, updateGeotechnicsInputs, updateStructureInputs }) {
    const navigate = useNavigate()
    
    function onOpenProjectManager() {
        navigate('/')
    }

    return (
        <div className={styles.grid}>
            <div className={styles.firstTitle}>
                <strong>ESTRUTURAS</strong>
            </div>
            <div className={styles.containerColumn}>
                <ColumnsManager
                    projectInputs={projectInputs}
                />
            </div>
            <div className={styles.containerColumn} style={{ height: '60%' }}>
                <FoundationsSolution
                    foundationClass={foundationClass}
                    setFoundationClass={setFoundationClass}
                    updateGeotechnicsInputs={updateGeotechnicsInputs} 
                />
            </div>
            <div className={styles.containerColumn}>
                <SolutionsManager/>
            </div>
            <div className={styles.containerColumn} style={{ height: '25%' }}>
                <FoundationsManager/>
            </div>
        </div>
    )
}

export default Structure