import { Button } from '@chakra-ui/react'
import { layerRegister, layerEdit, layerRemove } from '../../utils/services/geotechnics'

function CamadaAcoes({ projectInputs, investigationInputs, layerInputs, setUpdateGeotechnics }) {
    function onLayerActions(ev) {
        const action = ev.target.name
        const options = {
            "register": () => {
                layerRegister([projectInputs, investigationInputs, layerInputs])
                    .then(() => {
                        setUpdateGeotechnics(prev => prev + 1)
                    })
            },
            "edit": () => {
                if (layerInputs['Cota'] !== "") {
                    layerEdit([projectInputs, investigationInputs, layerInputs])
                        .then(() => {
                            setUpdateGeotechnics(prev => prev + 1)
                        })
                }
            },
            "remove": () => {
                if (layerInputs['Cota'] !== "") {
                    layerRemove([projectInputs, investigationInputs, layerInputs])
                        .then(() => {
                            setUpdateGeotechnics(prev => prev + 1)
                        })
                }
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
        
    }

    return (
        <>
            <Button
                name="register"
                width="100px"
                onClick={onLayerActions}
                colorScheme='blue'
                size='sm'
                fontSize='md'
            >
                Cadastrar
            </Button>
            <Button
                name="edit"
                width="70px"
                onClick={onLayerActions}
                colorScheme='blue'
                size='sm'
                fontSize='md'
            >
                Editar
            </Button>
            <Button
                name="remove"
                width="100px"
                onClick={onLayerActions}
                colorScheme='blue'
                size='sm'
                fontSize='md'
            >
                Remover
            </Button>
        </>
    )
}

export default CamadaAcoes