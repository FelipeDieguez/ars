import { Button } from '@chakra-ui/react'

import { calculate } from '../../utils/services/geotechnics'

function CalculoAcoes({ geotechnicsInputs, geotechnicsData, setGeotechnicsData }) {
    function onCalculate() {
        calculate([geotechnicsData, geotechnicsInputs]).then((response) => {
            setGeotechnicsData(response["data"])
        })
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