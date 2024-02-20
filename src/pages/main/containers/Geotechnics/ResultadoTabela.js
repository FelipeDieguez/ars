import Table from '../../components/Table'
import geotechnicsHeaders from "../../utils/data/geotechnicsHeaders.json"
import loader from '../../../../utils/img/drill.gif'

import styles from '../Geotechnics.module.css'
import { Spinner } from '@chakra-ui/react'

function ResultadoTabela({ geotechnicsData, structureInputs, layerInputs, updateLayerInputs, isLoading }) {
    return (
        <>
            {isLoading ? (
                // Adicione um componente de loader aqui
                // Por exemplo, você pode usar um spinner ou uma mensagem de carregamento
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray'
                    color='blue'
                    size='xl'
                />
                // <img src={loader} alt='Loader' />
            ) : (
                <Table 
                    layerInputs={layerInputs} updateLayerInputs={updateLayerInputs}
                    dados={geotechnicsData}
                    cabecalho={geotechnicsHeaders["cabecalhos"]}
                    structureInputs={structureInputs}
                />
            )}
        </>
    )
}

export default ResultadoTabela