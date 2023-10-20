import { Button } from '@chakra-ui/react'
import { layerRegister, layerEdit, layerRemove } from '../../utils/services/geotechnics'

function CamadaAcoes({ layerInputs, setUpdateGeotechnics }) {
    function onLayerActions(ev) {
        const action = ev.target.name
        console.log(action, ev)
        const options = {
            "register": () => {
                layerRegister(layerInputs)
            },
            "edit": () => {
                if (layerInputs["ordem"] !== "") {
                    layerEdit(layerInputs)
                }
            },
            "remove": () => {
                if (layerInputs["ordem"] !== "") {
                    layerRemove(layerInputs)
                }
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (action === key) {
                value()
            }
        }
        setUpdateGeotechnics(1)
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