import Radio from '../../components/Radio'

import soilTypes from "../../utils/data/soilTypes.json"

function CamadaDefinir({ soilClass, setSoilClass, updateLayerInputs }) {
    function onSoilClassChange(ev) {
        const soil_class = ev.target.id
        setSoilClass(soil_class)
        updateLayerInputs("solo", soilTypes[soil_class][0])
    }
    
    return (
        <>
            <Radio
                text="Areia"
                id="areia"
                name="solos"
                checked={soilClass === "areia"}
                onChange={onSoilClassChange}
            />
            <Radio
                text="Argila"
                id="argila"
                name="solos"
                checked={soilClass === "argila"}
                onChange={onSoilClassChange}
            />
            <Radio
                text="Silte"
                id="silte"
                name="solos"
                checked={soilClass === "silte"}
                onChange={onSoilClassChange}
            />
        </>
    )
}

export default CamadaDefinir

