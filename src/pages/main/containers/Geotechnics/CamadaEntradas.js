import { Select, Stack, Text, Input } from '@chakra-ui/react'

import soilTypes from "../../utils/data/soilTypes.json"

function CamadaEntradas({ soilClass, updateLayerInputs }) {
    function onLayerInputsChange(ev) {
        const { name, value } = ev.target
        updateLayerInputs(name, value)
    }

    return (
        <>
            <Stack direction='row'>
                <Text fontSize='md'>Solo:</Text>
                <Select
                    name="solo"
                    onChange={onLayerInputsChange}
                    width="180px"
                    size='xs'
                    fontSize='md'
                >
                    {soilTypes[soilClass].map((element) => (
                        <option key={element}>{element}</option>
                    ))}
                </Select>
            </Stack>
            <Stack direction='row'>
                <Text fontSize='md'>Nspt=</Text>
                <Input 
                    name='nspt'
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()}
                        if (event.target.value.toString().length > 1) {
                            event.preventDefault()
                        }
                    }}
                    onChange={onLayerInputsChange}
                    width='45px'
                    size='xs'
                    fontSize='md'
                />
            </Stack>
        </>
    )
}

export default CamadaEntradas