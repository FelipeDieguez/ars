import LineEdit from '../../components/LineEdit'
import Select from '../../components/Select'

import soilTypes from "../../utils/data/soilTypes.json"

function CamadaEntradas({ classeSolo, mudarCamadaDados }) {
    function mudancasCamadaEntradas(ev) {
        const { name, value } = ev.target
        mudarCamadaDados(name, value)
    }

    return (
        <>
            <Select
                text="Solo:"
                name="solo"
                list={soilTypes[classeSolo]}
                width="160px"
                onChange={mudancasCamadaEntradas}
            />
            <LineEdit
                text="Nspt="
                type="text"
                name="nspt"
                width="45px"
                onChange={mudancasCamadaEntradas}
            />
        </>
    )
}

export default CamadaEntradas