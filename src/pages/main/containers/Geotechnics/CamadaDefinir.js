import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

import soilTypes from '../../utils/data/soilTypes.json'

function CamadaDefinir({ soilClass, setSoilClass, updateLayerInputs }) {
    function onSoilClassChange(ev) {
        setSoilClass(ev)
        updateLayerInputs('solo', soilTypes[ev][0])
    }
    
    return (
        <>
            <RadioGroup onChange={onSoilClassChange} value={soilClass}>
                <Stack direction='row' spacing='65px'>
                    <Radio
                        value='areia'
                        color='black'
                        colorScheme='blue'
                        fontSize='md'
                    >
                        Areia
                    </Radio>
                    <Radio
                        value='argila'
                        color='black'
                        colorScheme='blue'
                        fontSize='md'
                    >
                        Argila
                    </Radio>
                    <Radio
                        value='silte'
                        color='black'
                        colorScheme='blue'
                        fontSize='md'
                    >
                        Silte
                    </Radio>
                </Stack>
            </RadioGroup>
        </>
    )
}

export default CamadaDefinir