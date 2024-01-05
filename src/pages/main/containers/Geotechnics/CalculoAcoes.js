import { Button } from '@chakra-ui/react'

import { calculate } from '../../utils/services/geotechnics'

function CalculoAcoes({ foundationClass, geotechnicsInputs, geotechnicsData, setGeotechnicsData, parameters }) {
    function onCalculate() {
        if (foundationClass === 'tubuloes') {
            calculate([geotechnicsData, geotechnicsInputs, parameters['estacas'][geotechnicsInputs['metodo']]]).then((response) => {
                setGeotechnicsData(response["data"])
            })
        }
        else {
            calculate([geotechnicsData, geotechnicsInputs, parameters[foundationClass][geotechnicsInputs['metodo']]]).then((response) => {
                setGeotechnicsData(response["data"])
            })
        }
        
    }
    return (
        <>
            <Button
                name="calculate"
                width="240px"
                onClick={onCalculate}
                colorScheme='blue'
                size='sm'
                fontSize='md'
            >
                Calcular
            </Button>
        </>
    )
}

export default CalculoAcoes