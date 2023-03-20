import Radio from '../../form/Radio'

import soloTipos from "../../data/soloTipos.json"

function CamadaDefinir({ classeSolo, setClasseSolo, mudarCamadaDados }) {
    function mudancasCamadaDefinir(ev) {
        const classe_solo = ev.target.id
        setClasseSolo(classe_solo)
        mudarCamadaDados("solo", soloTipos[classe_solo][0])
    }
    
    return (
        <>
            <Radio
                text="Areia"
                id="areia"
                name="solos"
                checked={classeSolo === "areia"}
                onChange={mudancasCamadaDefinir}
            />
            <Radio
                text="Argila"
                id="argila"
                name="solos"
                checked={classeSolo === "argila"}
                onChange={mudancasCamadaDefinir}
            />
            <Radio
                text="Silte"
                id="silte"
                name="solos"
                checked={classeSolo === "silte"}
                onChange={mudancasCamadaDefinir}
            />
        </>
    )
}

export default CamadaDefinir

