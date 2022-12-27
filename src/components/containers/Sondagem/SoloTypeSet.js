import Radio from '../../form/Radio'

import soloTipos from "../../data/soloTipos.json"

function SoloTypeSet({ solo, setSolo, solos, setSolos, camada, setCamada }) {
    function changeSolos(ev) {
        const id = ev.target.id
        setSolo(id)
        setSolos(soloTipos[id])
        setCamada({ ...camada, solo: solos[0] })
    }
    
    return (
        <>
            <Radio
                text="Areia"
                id="areia"
                name="solos"
                checked={solo === "areia"}
                onChange={changeSolos}
            />
            <Radio
                text="Argila"
                id="argila"
                name="solos"
                checked={solo === "argila"}
                onChange={changeSolos}
            />
            <Radio
                text="Silte"
                id="silte"
                name="solos"
                checked={solo === "silte"}
                onChange={changeSolos}
            />
        </>
    )
}

export default SoloTypeSet

