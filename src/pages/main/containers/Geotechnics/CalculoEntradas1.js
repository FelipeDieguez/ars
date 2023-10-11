import LineEdit from '../../components/LineEdit'

import foundationGeometries from "../../utils/data/foundationGeometries.json"

function CalculoEntradas1({ geotechnicsInputs, updateGeotechnicsInputs }) {      
    function onGeotechnicsInputsChange(ev) {
        const { name, value } = ev.target
        updateGeotechnicsInputs(name, value)
    }
    
    if (foundationGeometries[geotechnicsInputs["tipo"]] === "estaca circular" || foundationGeometries[geotechnicsInputs["tipo"]] === "sapata circular") {
        return (
            <LineEdit
                text="Diâmetro(m)="
                type="number"
                name="dimensao_1"
                width="45px"
                onChange={onGeotechnicsInputsChange}
            />
        )
    }
    else if (foundationGeometries[geotechnicsInputs["tipo"]] === "estaca retangular" || foundationGeometries[geotechnicsInputs["tipo"]] === "sapata retangular") {
        return (
            <>
                <LineEdit
                    text="L(m)="
                    type="number"
                    name="dimensao_1"
                    width="45px"
                    onChange={onGeotechnicsInputsChange}
                />
                <LineEdit
                    text="B(m)="
                    type="number"
                    name="dimensao_2"
                    width="45px"
                    onChange={onGeotechnicsInputsChange}
                />
            </>
        )
    }
    else {
        return (
            <>
                <LineEdit
                    text="Df(m)="
                    type="number"
                    name="dimensao_1"
                    width="45px"
                    onChange={onGeotechnicsInputsChange}
                />
                <LineEdit
                    text="Db(m)="
                    type="number"
                    name="dimensao_2"
                    width="45px"
                    onChange={onGeotechnicsInputsChange}
                />
            </>
        )
    }
}

export default CalculoEntradas1