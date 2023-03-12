import LineEdit from '../../form/LineEdit'
import Select from '../../form/Select'

import soloTipos from "../../data/soloTipos.json"

function DefinirEntradasSondagem({ classeSolo, mudarEntradasSondagem }) {
    function alterarEntradasSondagem(ev) {
        const { name, value } = ev.target
        mudarEntradasSondagem(name, value)
    }

    return (
        <>
            <Select
                text="Solo:"
                name="solo"
                list={soloTipos[classeSolo]}
                width="160px"
                onChange={alterarEntradasSondagem}
            />
            <LineEdit
                text="Nspt="
                type="number"
                name="nspt"
                width="45px"
                onChange={alterarEntradasSondagem}
            />
        </>
    )
}

export default DefinirEntradasSondagem