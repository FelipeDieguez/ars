import { layerRegister, layerEdit, layerRemove } from '../../utils/services/investigation'

import Button from '../../components/Button'

function CamadaAcoes({ layerInputs, setUpdateGeotechnics }) {
    function onLayerActions(ev) {
        const action = ev.target.name
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
                text="Cadastrar"
                name="register"
                width="100px"
                onClick={onLayerActions}
            />
            <Button
                text="Editar"
                name="edit"
                width="70px"
                onClick={onLayerActions}
            />
            <Button
                text="Remover"
                name="remove"
                width="100px"
                onClick={onLayerActions}
            />
        </>
    )
}

export default CamadaAcoes