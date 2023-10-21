import { Stack, Text, Input } from '@chakra-ui/react'

import foundationGeometries from "../../utils/data/foundationGeometries.json"

function CalculoEntradas1({ geotechnicsInputs, updateGeotechnicsInputs }) {      
    function onGeotechnicsInputsChange(ev) {
        const { name, value } = ev.target
        updateGeotechnicsInputs(name, value)
    }
    
    if (foundationGeometries[geotechnicsInputs["tipo"]] === "estaca circular" || foundationGeometries[geotechnicsInputs["tipo"]] === "sapata circular") {
        return (
            <Stack direction='row'>
                <Text fontSize='md'>Diâmetro(m)=</Text>
                <Input
                    name='dimensao_1'
                    onKeyPress={(event) => {
                        if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault()}
                        }
                    }
                    onChange={onGeotechnicsInputsChange}
                    width='50px'
                    size='xs'
                    fontSize='md'
                />
            </Stack>
        )
    }
    else if (foundationGeometries[geotechnicsInputs["tipo"]] === "estaca retangular" || foundationGeometries[geotechnicsInputs["tipo"]] === "sapata retangular") {
        return (
            <>
                <Stack direction='row'>
                    <Text fontSize='md'>L(m)=</Text>
                    <Input
                        name='dimensao_1'
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault()}
                            }
                        }
                        onChange={onGeotechnicsInputsChange}
                        width='50px'
                        size='xs'
                        fontSize='md'
                    />
                </Stack>
                <Stack direction='row'>
                    <Text fontSize='md'>B(m)=</Text>
                    <Input
                        name='dimensao_2'
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault()}
                            }
                        }
                        onChange={onGeotechnicsInputsChange}
                        width='50px'
                        size='xs'
                        fontSize='md'
                    />
                </Stack>
            </>
        )
    }
    else {
        return (
            <>
                <Stack direction='row'>
                    <Text fontSize='md'>Df(m)=</Text>
                    <Input
                        name='dimensao_2'
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault()}
                            }
                        }
                        onChange={onGeotechnicsInputsChange}
                        width='50px'
                        size='xs'
                        fontSize='md'
                    />
                </Stack>
                <Stack direction='row'>
                    <Text fontSize='md'>Db(m)=</Text>
                    <Input
                        name='dimensao_2'
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault()}
                            }
                        }
                        onChange={onGeotechnicsInputsChange}
                        width='50px'
                        size='xs'
                        fontSize='md'
                    />
                </Stack>
            </>
        )
    }
}

export default CalculoEntradas1