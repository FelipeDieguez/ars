import { Button, IconButton, Tooltip } from '@chakra-ui/react'

import { geotechnicsCalculate, geotechnicsMemorial } from '../../utils/services/geotechnics'
import { CalendarIcon } from '@chakra-ui/icons'

function CalculoAcoes({ foundationClass, layerInputs, geotechnicsInputs, geotechnicsData, setGeotechnicsData, methodsData }) {
    function onCalculate() {
        if (foundationClass === 'tubuloes') {
            geotechnicsCalculate([geotechnicsData, geotechnicsInputs, methodsData['estacas'][geotechnicsInputs['metodo']]]).then((response) => {
                setGeotechnicsData(response["data"])
            })
        }
        else {
            console.log(foundationClass, geotechnicsInputs['metodo'], methodsData)
            geotechnicsCalculate([geotechnicsData, geotechnicsInputs, methodsData[foundationClass][geotechnicsInputs['metodo']]]).then((response) => {
                setGeotechnicsData(response["data"])
            })
        }
    }

    function onMemorial() {
        geotechnicsMemorial([geotechnicsData, geotechnicsInputs, methodsData['estacas'][geotechnicsInputs['metodo']], layerInputs]).then((response) => {
            window.open(response["data"])
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
            <IconButton
                icon={<Tooltip hasArrow label='Gerar Memorial' bg='gray' color='black' fontSize='md'><CalendarIcon /></Tooltip>}
                borderWidth='sm'
                borderColor='border'
                variant='solid'
                colorScheme='blue'
                size='sm'
                onClick={onMemorial}
            />
        </>
    )
}

export default CalculoAcoes