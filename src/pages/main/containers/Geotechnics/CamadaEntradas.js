import LineEdit from '../../components/LineEdit'
import Select from '../../components/Select'

import soilTypes from "../../utils/data/soilTypes.json"

function CamadaEntradas({ soilClass, updateLayerInputs }) {
    function onLayerInputsChange(ev) {
        const { name, value } = ev.target
        updateLayerInputs(name, value)
    }

    return (
        <>
            <Select
                text="Solo:"
                name="solo"
                list={soilTypes[soilClass]}
                width="160px"
                onChange={onLayerInputsChange}
            />
            <LineEdit
                text="Nspt="
                type="text"
                name="nspt"
                width="45px"
                onChange={onLayerInputsChange}
            />
        </>
    )
}

export default CamadaEntradas