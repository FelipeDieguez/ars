import { Select, Stack, Text } from "@chakra-ui/react"

function CalculoEntradas2({ foundationClass, updateGeotechnicsInputs, geotechnicsData }) {      
    function onGeotechnicsInputsChange(ev) {
        const { name, value } = ev.target
        updateGeotechnicsInputs(name, value)
    }
    
    if (foundationClass === "sapatas") {
        return (
            <>
                <Stack direction='row'>
                    <Text fontSize='md'>Prof.+</Text>
                    <Select
                        name="dimensao_3"
                        onChange={onGeotechnicsInputsChange}
                        width="65px"
                        size='xs'
                        fontSize='md'
                    >
                        {[0.0, 0.1 , 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((element) => (
                            <option key={element}>{element}</option>
                        ))}
                    </Select>
                </Stack>
                <Stack direction='row'>
                    <Text fontSize='md'>N.A.(m)=</Text>
                    <Select
                        name="dimensao_4"
                        onChange={onGeotechnicsInputsChange}
                        width="55px"
                        size='xs'
                        fontSize='md'
                    >
                        {[...Array(geotechnicsData.length+2).keys()].map((element) => (
                            <option key={element}>{element}</option>
                        ))}
                    </Select>
                </Stack>
            </>
        )
    }
    else {
        return (
            <>
                <Stack direction='row'>
                    <Text fontSize='md'>C.A.(m)=</Text>
                    <Select
                        name="dimensao_3"
                        onChange={onGeotechnicsInputsChange}
                        width="55px"
                        size='xs'
                        fontSize='md'
                    >
                        {[...Array(geotechnicsData.length).keys()].map((element) => (
                            <option key={element}>{element}</option>
                        ))}
                    </Select>
                </Stack>
            </>
        )
    }
}

export default CalculoEntradas2