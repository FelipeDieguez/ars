import LineEdit from '../../form/LineEdit'
import Select from '../../form/Select'

import soloTipos from "../../data/soloTipos.json"

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
                list={soloTipos[classeSolo]}
                width="160px"
                onChange={mudancasCamadaEntradas}
            />
            <LineEdit
                text="Nspt="
                type="number"
                name="nspt"
                width="45px"
                onChange={mudancasCamadaEntradas}
            />
        </>
    )
}

export default CamadaEntradas