import { Select, Stack, Text } from "@chakra-ui/react"
import foundationTypes from "../../utils/data/foundationTypes.json"

function CalculoDefinir({ foundationClass, updateGeotechnicsInputs }) {
    function onGeotechnicsInputsChange(ev) {
        const { name, value } = ev.target
        updateGeotechnicsInputs(name, value)
    }

    return (
        <>
            <Stack direction='row'>
                <Text fontSize='md'>Tipo:</Text>
                <Select
                    name="tipo"
                    onChange={onGeotechnicsInputsChange}
                    width="200px"
                    size='xs'
                    fontSize='md'
                >
                    {foundationTypes[foundationClass].map((element) => (
                        <option key={element}>{element}</option>
                    ))}
                </Select>
            </Stack>
        </>
    )
}

export default CalculoDefinir