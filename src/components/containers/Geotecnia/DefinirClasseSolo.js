import Radio from '../../form/Radio'

import soloTipos from "../../data/soloTipos.json"

function DefinirClasseSolo({ classeSolo, setClasseSolo, mudarEntradasSondagem }) {
    function mudarClasseSolo(ev) {
        const classe_solo = ev.target.id
        setClasseSolo(classe_solo)
        mudarEntradasSondagem("solo", soloTipos[classe_solo][0])
    }
    
    return (
        <>
            <Radio
                text="Areia"
                id="areia"
                name="solos"
                checked={classeSolo === "areia"}
                onChange={mudarClasseSolo}
            />
            <Radio
                text="Argila"
                id="argila"
                name="solos"
                checked={classeSolo === "argila"}
                onChange={mudarClasseSolo}
            />
            <Radio
                text="Silte"
                id="silte"
                name="solos"
                checked={classeSolo === "silte"}
                onChange={mudarClasseSolo}
            />
        </>
    )
}

export default DefinirClasseSolo

